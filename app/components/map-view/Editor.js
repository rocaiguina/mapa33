import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import _ from 'lodash';
import bbox from '@turf/bbox';
import union from '@turf/union';
import clone from '@turf/clone';
import area from '@turf/area';
import centroid from '@turf/centroid';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jYWlndWluYSIsImEiOiJjazJsc3oxdWkwYW56M25sazQ0cWZnMG5pIn0.WAKi9fHre9kF116zG1mjXg';
let map = null;
let miniMap = null;
let hoveredStateId = null;
const Draw = new MapboxDraw({
    displayControlsDefault: false
});
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    countries: 'us',
    placeholder: 'Municipio o dirección...',
    bbox: [-67.34555313044709, 17.881642210059354, -65.18374625920308, 18.54815194116351],
    mapboxgl
});
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});
const marker = new mapboxgl.Marker({
    color: '#4668F2'
});

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: [],
            geojson: {
                type: 'FeatureCollection',
                features: []
            },
            area: 0.0,
            address: '',
            error: '',
            activeLoc: false,
            activeSel: true,
            activeDra: false,
            latitude: 0.0,
            longitude: 0.0
        };
    }

    componentDidMount() {
        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/satellite-streets-v10',
            center: [-66.45, 18.2],
            zoom: 8.5
        });

        miniMap = new mapboxgl.Map({
            container: this.miniMapContainer,
            style: 'mapbox://styles/mapbox/satellite-streets-v10',
            center: [-66.45, 18.2],
            zoom: 6.5,
            attributionControl: false,
            interactive: false,
            preserveDrawingBuffer: true
        });

        map.on('load', () => {
            map.addSource('source', {
                type: 'vector',
                url: 'mapbox://rocaiguina.0uzatatd'
            });

            map.addSource('geojson', {
                type: 'geojson',
                data: this.state.geojson
            });

            map.addLayer(
                {
                    id: 'lots',
                    type: 'fill',
                    source: 'source',
                    'source-layer': 'lots',
                    minzoom: 14,
                    paint: {
                        'fill-color': '#000000',
                        'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0.35]
                    }
                },
                'waterway-label'
            );

            map.addLayer(
                {
                    id: 'selection',
                    type: 'fill',
                    source: 'geojson',
                    paint: {
                        'fill-color': '#E36D9D',
                        'fill-opacity': 1
                    }
                },
                'waterway-label'
            );

            map.addLayer(
                {
                    id: 'lots-borders',
                    type: 'line',
                    source: 'source',
                    'source-layer': 'lots',
                    minzoom: 14,
                    paint: {
                        'line-color': '#E36D9D',
                        'line-width': 0.35
                    }
                },
                'waterway-label'
            );

            map.addLayer(
                {
                    id: 'selection-border',
                    type: 'line',
                    source: 'geojson',
                    layout: {
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#E36D9D',
                        'line-opacity': 1,
                        'line-width': 2,
                        'line-offset': -10,
                        'line-dasharray': [0.5, 2]
                    }
                },
                'waterway-label'
            );

            map.addControl(Draw);
            map.on('draw.create', this.updateArea);
            map.on('draw.delete', this.updateArea);
            map.on('draw.update', this.updateArea);
        });

        miniMap.on('load', () => {
            miniMap.addSource('geojson', {
                type: 'geojson',
                data: this.state.geojson
            });

            miniMap.addLayer(
                {
                    id: 'selection',
                    type: 'fill',
                    source: 'geojson',
                    paint: {
                        'fill-color': '#E36D9D',
                        'fill-opacity': 1
                    }
                },
                'waterway-label'
            );

            miniMap.addLayer(
                {
                    id: 'selection-border',
                    type: 'line',
                    source: 'geojson',
                    layout: {
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#E36D9D',
                        'line-opacity': 1,
                        'line-width': 2,
                        'line-offset': -10,
                        'line-dasharray': [0.5, 2]
                    }
                },
                'waterway-label'
            );
        });

        map.on('mousemove', 'lots', e => {
            if (e.features.length > 0 && this.state.activeSel) {
                map.getCanvas().style.cursor = 'pointer';

                let html = `<span><b>Catastro:</b> ${e.features[0].properties.catastro || 'No hay número'}</span><br>`;
                html += `<span><b>Municipio:</b> ${e.features[0].properties.muni_norml}</span><br>`;
                html += `<span>${this.toProperCase(e.features[0].properties.dir_fisica)}</span>`;

                popup
                    .setLngLat(e.lngLat)
                    .setHTML(html)
                    .addTo(map);

                if (hoveredStateId) {
                    map.setFeatureState({ source: 'source', id: hoveredStateId, sourceLayer: 'lots' }, { hover: false });
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState({ source: 'source', id: hoveredStateId, sourceLayer: 'lots' }, { hover: true });
            }
        });

        map.on('mouseleave', 'lots', () => {
            map.getCanvas().style.cursor = '';
            if (hoveredStateId) {
                map.setFeatureState({ source: 'source', id: hoveredStateId, sourceLayer: 'lots' }, { hover: false });
            }
            hoveredStateId = null;
            popup.remove();
        });

        map.on('click', 'lots', e => {
            if (this.state.activeSel) {
                const { id } = e.features[0].properties;
                const exist = this.state.selection.indexOf(id) > -1;
                if (!exist) {
                    this.setState(state => {
                        return {
                            selection: _.concat(state.selection, id)
                        };
                    });

                    this.getPolygons();
                } else {
                    this.setState(state => {
                        return {
                            selection: _.remove(state.selection, n => {
                                return n !== id;
                            })
                        };
                    });
                    if (this.state.selection.length > 0) {
                        this.getPolygons();
                    } else {
                        this.trashPolygons();
                    }
                }
            }
        });

        this.geocoderContainer.append(geocoder.onAdd(map));
    }

    toProperCase = s => {
        if (s) {
            return s.toLowerCase().replace(/^(.)|\s(.)/g, $1 => {
                return $1.toUpperCase();
            });
        }
        return 'No hay dirección física disponible.';
    };

    area = polygon => {
        const meters = area(polygon);
        this.setState({
            area: meters
        });
    };

    merge = polygons => {
        let merged = clone(polygons.features[0]);
        const { features } = polygons;
        for (let i = 0, len = features.length; i < len; i += 1) {
            const poly = features[i];
            if (poly.geometry) merged = union(merged, poly);
        }

        return merged;
    };

    getPolygons = () => {
        fetch(`/select`, {
            method: 'post',
            body: JSON.stringify({
                id: this.state.selection
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                const features = this.merge(data[0].geojson);
                this.area(features);
                this.getAddress(features);
                const bounds = bbox(features);
                // Fields for database
                features.properties.area = this.state.area;
                features.properties.lots = this.state.selection.length;

                miniMap.fitBounds(bounds, { padding: 50 });
                miniMap.getSource('geojson').setData(features);
                map.getSource('geojson').setData(features);

                this.setState({
                    geojson: features
                });
            })
            .catch(error => {
                this.setState({
                    error: error.message
                });
            });
    };

    getAddress = polygon => {
        const center = centroid(polygon);
        const queryURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${center.geometry.coordinates}.json?access_token=${mapboxgl.accessToken}`;

        fetch(queryURL)
            .then(response => response.json())
            .then(data => this.setState({ address: data.features[0].place_name || 'No hay dirección disponible.' }))
            .catch(error => this.setState({ address: error.message }));
    };

    trashPolygons = () => {
        Draw.trash();
        miniMap.getSource('geojson').setData({
            type: 'FeatureCollection',
            features: []
        });
        map.getSource('geojson').setData({
            type: 'FeatureCollection',
            features: []
        });
        miniMap.flyTo({
            center: [-66.45, 18.2],
            zoom: 6.5
        });
    };

    setLoc = () => {
        if (!this.state.activeLoc) {
            this.setState({
                activeLoc: true
            });
            navigator.geolocation.getCurrentPosition(position => {
                if (position) {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });

                    map.flyTo({
                        center: [this.state.longitude, this.state.latitude],
                        zoom: 17,
                        speed: 0.5,
                        curve: 1,
                        easing: t => {
                            return t;
                        }
                    });

                    marker.setLngLat([this.state.longitude, this.state.latitude]).addTo(map);
                }
            });
        } else {
            this.setState({
                activeLoc: false
            });
            marker.remove();
        }
    };

    setSel = () => {
        Draw.trash();
        this.setState({
            activeSel: true,
            activeDra: false
        });
    };

    setDra = () => {
        this.setState({
            activeSel: false,
            activeDra: true
        });
        Draw.changeMode('draw_polygon');
    };

    updateArea = () => {
        const drawings = Draw.getAll();

        if (drawings.features.length > 0) {
            fetch(`/intersect`, {
                method: 'post',
                body: JSON.stringify({
                    geom: drawings.features[0].geometry
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        selection: _.map(data[0].geojson.features, e => {
                            return e.properties.id;
                        })
                    });

                    const selection = this.merge(data[0].geojson);
                    this.area(selection);
                    this.getAddress(selection);
                    const bounds = bbox(selection);
                    // Fields for database
                    selection.properties.area = this.state.area;
                    selection.properties.lots = this.state.selection.length;

                    miniMap.fitBounds(bounds, { padding: 50 });
                    miniMap.getSource('geojson').setData(selection);
                    map.getSource('geojson').setData(selection);

                    this.setState({
                        geojson: selection
                    });

                    Draw.deleteAll();
                    Draw.changeMode('draw_polygon');
                })
                .catch(error => {
                    this.setState({
                        error: error.message
                    });
                });
        }
    };

    render() {
        return (
            <div ref={el => (this.mapContainer = el)} style={{ position: 'relative', height: '100vh', width: '100%' }}>
                <div ref={el => (this.geocoderContainer = el)} style={{ position: 'fixed', zIndex: 2, left: '50%', transform: 'translate(-50%, 0)', WebkitTransform: 'translate(-50%, 0)', marginTop: 10 }} />
                <div style={{ position: 'absolute', zIndex: 2, padding: 10, background: '#FFF', width: 350, margin: 10 }}>
                    <div>Parcelas Seleccionadas: {this.state.selection.length}</div>
                    <div>
                        Área: {this.state.area.toLocaleString(navigator.language, { maximumFractionDigits: 2 })} m<sup>2</sup>
                    </div>
                    <div>Cerca de: {this.state.address}</div>
                    <div ref={el => (this.miniMapContainer = el)} style={{ height: 250 }} />
                    {this.state.error && this.state.error}
                    <button type="button" onClick={this.trashPolygons}>
                        Trash
                    </button>
                    <button type="button" onClick={this.setLoc} style={this.state.activeLoc ? { background: 'orange' } : { background: '#fff' }}>
                        My Location
                    </button>
                    <button type="button" onClick={this.setSel} style={this.state.activeSel ? { background: 'orange' } : { background: '#fff' }}>
                        Select
                    </button>
                    <button type="button" onClick={this.setDra} style={this.state.activeDra ? { background: 'orange' } : { background: '#fff' }}>
                        Polygon
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            const img = miniMap.getCanvas().toDataURL();
                            console.log(img);
                        }}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            map.setZoom(map.getZoom() + 0.5);
                        }}
                    >
                        Zoom In
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            map.setZoom(map.getZoom() - 0.5);
                        }}
                    >
                        Zoom Out
                    </button>
                </div>
            </div>
        );
    }
}

export default Editor;
