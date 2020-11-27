import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification, Spin } from 'antd';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import _ from 'lodash';
import bbox from '@turf/bbox';
import union from '@turf/union';
import clone from '@turf/clone';
import area from '@turf/area';
import centroid from '@turf/centroid';
import Numeral from 'numeral';
import Button from '../ui/Button';

mapboxgl.accessToken = MAPBOX_TOKEN
let map = null;
let miniMap = null;
let tmpMap = null;
let hoveredStateId = null;
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  countries: 'us',
  placeholder: 'Municipio o dirección...',
  bbox: [
    -67.34555313044709,
    17.881642210059354,
    -65.18374625920308,
    18.54815194116351,
  ],
  mapboxgl,
});
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});
const marker = new mapboxgl.Marker({
  color: '#4668F2',
});

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geojson: {
        // Geojson data source for map.
        type: 'FeatureCollection',
        features: [],
      },
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      area: 0.0, // Geojson area.
      address: '',
      activeLoc: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { center, lots, zoom } = this.props;
    
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    miniMap = new mapboxgl.Map({
      container: this.miniMapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: center,
      zoom: 6.5,
      attributionControl: false,
      interactive: false,
      preserveDrawingBuffer: true,
    });

    tmpMap = new mapboxgl.Map({
      container: this.tmpMapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: center,
      zoom: 6.5,
      attributionControl: false,
      interactive: false,
      preserveDrawingBuffer: true,
    });

    map.on('load', () => {
      map.addSource('source', {
        type: 'vector',
        url: 'mapbox://rocaiguina.0uzatatd',
      });

      map.addSource('geojson', {
        type: 'geojson',
        data: this.state.geojson,
      });

      map.addSource('proposed-lots', {
        type: 'geojson',
        data: this.state.data,
      });

      map.addSource('protected_areas', {
        type: 'vector',
        url: 'mapbox://rocaiguina.bzaytugl',
      });

      map.addLayer(
        {
          id: 'lots',
          type: 'fill',
          source: 'source',
          'source-layer': 'lots',
          minzoom: 14,
          paint: {
            'fill-color': '#FFFFFF',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.5,
              0.25,
            ],
          },
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
            'line-color': '#333333',
            'line-width': 1.5,
          },
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
            'fill-opacity': 0.75,
          },
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'selection-border',
          type: 'line',
          source: 'geojson',
          layout: {
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#E36D9D',
            'line-opacity': 1,
            'line-width': 2,
            'line-offset': -4,
            'line-dasharray': [0.5, 2],
          },
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'proposed-lots',
          type: 'fill',
          source: 'proposed-lots',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': '#E36D9D',
          },
        },
        'waterway-label'
      );

      fetch(`/api/land/geojson?area=proposed`)
        .then(response => response.json())
        .then(data => {
          map.getSource('proposed-lots').setData(data[0].geojson);
        })
        .catch(error => {
          console.log(error);
        });
  
      map.addLayer(
        {
          id: 'protected_areas',
          type: 'fill',
          source: 'protected_areas',
          'source-layer': 'lands',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': {
              property: 'user_id',
              stops: [
                [2, '#3e9687'],
                [3, '#85e0d0'],
                [4, '#02c6a1'],
                [5, '#3e9687'],
                [6, '#02c6a1'],
                [7, '#85e0d0'],
                [8, '#5bbcae'],
                [9, '#02c6a1'],
                [10, '#3e9687'],
                [11, '#85e0d0'],
                [12, '#5bbcae'],
                [13, '#85e0d0'],
                [14, '#02c6a1'],
                [15, '#5bbcae'],
                [16, '#5bbcae'],
                [17, '#3e9687'],
              ],
            },
          },
        },
        'waterway-label'
      );
    });

    map.once('idle', () => {
      // Load polygons
      if (this.props.lots.length > 0) {
        setTimeout(() => {
          this.buildPolygons(lots).then(({ geojson }) => {
            const bounds = bbox(geojson);
            map.fitBounds(bounds, {
              animate: false,
            });
          });
        }, 400);
      }
    });

    miniMap.on('load', () => {
      miniMap.addSource('geojson', {
        type: 'geojson',
        data: this.state.geojson,
      });

      miniMap.addLayer(
        {
          id: 'selection',
          type: 'fill',
          source: 'geojson',
          paint: {
            'fill-color': '#E36D9D',
            'fill-opacity': 0.75,
          },
        },
        'waterway-label'
      );

      miniMap.addLayer(
        {
          id: 'selection-border',
          type: 'line',
          source: 'geojson',
          layout: {
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#E36D9D',
            'line-opacity': 1,
            'line-width': 2,
            'line-offset': -4,
            'line-dasharray': [0.5, 2],
          },
        },
        'waterway-label'
      );
    });

    tmpMap.on('load', () => {
      tmpMap.addSource('geojson', {
        type: 'geojson',
        data: this.state.geojson,
      });

      tmpMap.addLayer(
        {
          id: 'selection',
          type: 'fill',
          source: 'geojson',
          paint: {
            'fill-color': '#E36D9D',
            'fill-opacity': 0.75,
          },
        },
        'waterway-label'
      );

      tmpMap.addLayer(
        {
          id: 'selection-border',
          type: 'line',
          source: 'geojson',
          layout: {
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#E36D9D',
            'line-opacity': 1,
            'line-width': 2,
            'line-offset': -4,
            'line-dasharray': [0.5, 2],
          },
        },
        'waterway-label'
      );
    });

    tmpMap.on('idle', () => {
      if (this.props.onRenderMinimap) {
        var base64Img = tmpMap.getCanvas().toDataURL();
        // RESIZE IMAGE
        //var image = resizeImage(base64Img, 480, 320);
        var image = base64Img;
        this.props.onRenderMinimap(image);
      }
    });

    map.on('mousemove', 'lots', e => {
      map.getCanvas().style.cursor = 'pointer';

      let html = `
        <div class="mapbox-editor-popup">
          <p class="catastro">
            <b>Catastro:</b> ${e.features[0].properties.catastro || 'No disponible'}
          </p>
          <p class="municipio">
            <b>Municipio:</b> ${e.features[0].properties.muni_norml || 'No disponible'}
          </p>
          <p class="address">
            <b>Dirrección:</b> ${this.toProperCase(e.features[0].properties.dir_fisica)}
          </p>
        </div>
      `;

      popup
        .setLngLat(e.lngLat)
        .setHTML(html)
        .addTo(map);

      if (hoveredStateId) {
        map.setFeatureState(
          {
            source: 'source',
            id: hoveredStateId,
            sourceLayer: 'lots',
          },
          {
            hover: false,
          }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        {
          source: 'source',
          id: hoveredStateId,
          sourceLayer: 'lots',
        },
        {
          hover: true,
        }
      );
    });

    map.on('mouseleave', 'lots', () => {
      map.getCanvas().style.cursor = '';
      if (hoveredStateId) {
        map.setFeatureState(
          { source: 'source', id: hoveredStateId, sourceLayer: 'lots' },
          { hover: false }
        );
      }
      hoveredStateId = null;
      popup.remove();
    });

    let layerClicked = {id: '', coords: {}};

    map.on('click', 'proposed-lots', e => {
      layerClicked.coords = e.point;
      layerClicked.id = 'proposed-lots';
    });
    map.on('click', 'protected_areas', e => {
      layerClicked.coords = e.point;
      layerClicked.id = 'protected_areas';
    });

    map.on('click', 'lots', e => {
      const { id } = e.features[0].properties;
      const { lots } = this.props;
      const exist = lots.indexOf(id) > -1;
         
      if (layerClicked.coords.x === e.point.x && layerClicked.coords.y === e.point.y) {
        let errDescription = 
        layerClicked.id === 'proposed-lots' ? 'Este terreno ya esta propuesto.' : 
        layerClicked.id === 'protected_areas' ? 'Este terreno ya esta protegido.' : "";
        
        notification.error({
          message: 'Error',
          description: errDescription,
        });
        return;
      }

      if (!exist) {
        if (lots.length >= 3) {
          notification.error({
            message: 'Error',
            description: 'No puede elegir más de 3 parcelas.',
          });
          return;
        }
        const newLots = _.concat(lots, id);
        this.buildPolygons(newLots).then(({ geojson, area }) => {
          this.handleOnChange(geojson, area, newLots);
        });
      } else {
        const newLots = _.remove(lots, n => {
          return n !== id;
        });
        if (newLots.length > 0) {
          this.buildPolygons(newLots).then(({ geojson, area }) => {
            this.handleOnChange(geojson, area, newLots);
          });
        } else {
          this.trashPolygons();
        }
      }
    });

    map.on('zoomend', data => {
      if (this.props.onZoom) {
        this.props.onZoom(data.target);
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
    return 'No disponible';
  };

  componentWillUnmount() {
    map.remove();
    miniMap.remove();
    tmpMap.remove();
  }

  area = polygon => {
    const meters = area(polygon);
    this.setState({
      area: meters,
    });
  };

  getArea = polygon => {
    return area(polygon);
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

  handleOnLoad() {
    this.setState({
      loading: true,
    });
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  handleOnLoaded() {
    this.setState({
      loading: false,
    });
    if (this.props.onLoaded) {
      this.props.onLoaded();
    }
  }

  buildPolygons = lots => {
    this.handleOnLoad();
    return new Promise((resolve, reject) => {
      if (lots.length > 0) {
        fetch(`/api/land/select`, {
          method: 'post',
          body: JSON.stringify({
            id: lots,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            const geojson = this.merge(data[0].geojson);
            const area = this.getArea(geojson);
            const bounds = bbox(geojson);
            miniMap.fitBounds(bounds, {
              animate: false,
              padding: 30,
            });
            miniMap.getSource('geojson').setData(geojson);
            tmpMap.fitBounds(bounds, {
              animate: false,
              padding: 30,
            });
            tmpMap.getSource('geojson').setData(geojson);
            map.getSource('geojson').setData(geojson);
            geojson.features = data[0].geojson.features;
            geojson.properties.area = area;
            this.setState({
              area,
            });
            resolve({
              geojson,
              area,
            });
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => {
            this.handleOnLoaded();
          });
      } else {
        this.handleOnLoaded();
        resolve({
          geojson: this.getEmptyGeoJson(),
          area: 0,
        });
      }
    });
  };

  getEmptyGeoJson() {
    return {
      type: 'FeatureCollection',
      features: [],
      properties: {
        area: 0,
      },
    };
  }

  handleOnChange = (geojson, area, lots) => {
    if (this.props.onChange) {
      const lands = geojson.features.map(item => {
        return item.properties;
      });
      const coordinates = centroid(geojson);

      var data = {
        lots,
        lands,
        coordinates,
        geojson,
      };
      this.props.onChange(data);
    }
  };

  // getPolygons = (newLots) => {
  //   const { lots } = this.props;
  //   if (lots !== newLots) {
  //     fetch(`/api/land/select`, {
  //       method: 'post',
  //       body: JSON.stringify({
  //         id: newLots,
  //       }),
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         const geojson = data[0].geojson;
  //         const features = this.merge(geojson);
  //         this.area(features);
  //         this.getAddress(features);
  //         const bounds = bbox(features);
  //         const coordinates = centroid(features);
  //         // Fields for database
  //         features.properties.area = this.state.area;
  //         features.properties.lots = this.state.selection.length;

  //         miniMap.fitBounds(bounds, {
  //           animate: false,
  //           padding: 30,
  //         });
  //         miniMap.getSource('geojson').setData(features);
  //         map.getSource('geojson').setData(features);

  //         this.setState({
  //           geojson: features,
  //         });

  //         if (this.props.onChange) {
  //           var lands = geojson.features.map(item => {
  //             return item.properties;
  //           });

  //           var sdata = {
  //             lots: newLots,
  //             lands: lands,
  //             coordinates: coordinates,
  //             address: this.state.address,
  //             geojson: features,
  //           };
  //           this.props.onChange(sdata);
  //         }
  //       })
  //       .catch(error => {
  //         notification.error({
  //           message: 'Error',
  //           description: 'No se encuentra información disponible. Intenta nuevamente.',
  //         });
  //       });
  //   }
  // };

  getAddress = polygon => {
    const center = centroid(polygon);
    const queryURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${center.geometry.coordinates}.json?access_token=${mapboxgl.accessToken}`;

    fetch(queryURL)
      .then(response => response.json())
      .then(data =>
        this.setState({
          address:
            data.features[0].place_name || 'No hay dirección disponible.',
        })
      )
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se encuentra información disponible. Intenta nuevamente.',
        });
      });
  };

  trashPolygons = () => {
    const emptyGeoJson = this.getEmptyGeoJson();
    miniMap.getSource('geojson').setData(emptyGeoJson);
    tmpMap.getSource('geojson').setData(emptyGeoJson);
    map.getSource('geojson').setData(emptyGeoJson);
    miniMap.jumpTo({
      center: [-66.45, 18.2],
      zoom: 6.5,
    });
    tmpMap.jumpTo({
      center: [-66.45, 18.2],
      zoom: 6.5,
    });
    this.handleOnChange(emptyGeoJson, 0, []);
  };

  setLoc = () => {
    if (!this.state.activeLoc) {
      this.setState({
        activeLoc: true,
        loading: true,
      });
      navigator.geolocation.getCurrentPosition(position => {
        if (position) {
          const { longitude, latitude } = position.coords;

          map.jumpTo({
            center: [longitude, latitude],
            zoom: 17,
          });

          marker.setLngLat([longitude, latitude]).addTo(map);
        }
        this.setState({
          loading: false,
        });
      });
    } else {
      this.setState({
        activeLoc: false,
      });
      marker.remove();
    }
  };

  handleZoomIn = event => {
    event.preventDefault();
    map.setZoom(map.getZoom() + 0.5);
  };

  handleZoomOut = event => {
    event.preventDefault();
    map.setZoom(map.getZoom() - 0.5);
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <div className="mapbox-editor" ref={el => (this.mapContainer = el)}>
          <div
            id="mapbox-search"
            className="boxmap-searchinput"
            ref={el => (this.geocoderContainer = el)}
          />

          <div className="toolbar toolbar-mapeditor">
            <ul>
              <li>
                <Button id="zoomInBtn" onClick={this.handleZoomIn}>
                  <i className="fas fa-fw fa-search-plus"></i>
                </Button>
              </li>
              <li>
                <Button id="zoomOutBtn" onClick={this.handleZoomOut}>
                  <i className="fas fa-fw fa-search-minus"></i>
                </Button>
              </li>
              <li>
                <Button id="mapPointerBtn" onClick={this.setSel}>
                  <i className="fas fa-fw fa-hand-pointer"></i>
                </Button>
              </li>
              <li>
                <Button id="trashBtn" onClick={this.trashPolygons}>
                  <i className="fas fa-fw fa-trash-alt"></i>
                </Button>
              </li>
              <li>
                <Button id="myLocationBtn" onClick={this.setLoc}>
                  <i className="fas fa-fw fa-map-marker-alt"></i>
                </Button>
              </li>
            </ul>
          </div>

          <div className="boxmap-preview">
            <div className="boxmap-info">
              Parcelas Seleccionadas: {this.props.lots.length}
            </div>
            <div className="boxmap-info">
              Área: {Numeral(this.state.area).format('0,0.00')} m<sup>2</sup>
            </div>

            <div
              className="m-t-5"
              ref={el => (this.miniMapContainer = el)}
              style={{ height: 200 }}
            />
          </div>

          <div
            className="boxmap-tmp-preview"
            ref={el => (this.tmpMapContainer = el)}
          />
        </div>
      </Spin>
    );
  }
}

Editor.defaultProps = {
  lots: [],
  center: [-66.45, 18.2],
  zoom: 14,
};

Editor.propTypes = {
  lots: PropTypes.array, // Selected lots ID,
  center: PropTypes.array, // Center location,
  zoom: PropTypes.number, // Zoom
  onRenderMinimap: PropTypes.func,
  onZoom: PropTypes.func,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
  onLoaded: PropTypes.func,
};

export default Editor;
