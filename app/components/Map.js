import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { setActive, setCenter } from '../actions/MapActions';
import logo from '../assets/logo.svg';
import Triangle from '../assets/Triangle.svg';

const Mapbox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWFrb2hvbmRvIiwiYSI6ImNpaGY5cW03YzA0ODV0aGo3Z21sd3VvbDgifQ.VpvOmpodQ47duuB_jzVFTQ'
});

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
            geojson: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/land`)
            .then(response => response.json())
            .then(data => {
                console.log(data[0].geojson);
                this.setState({
                    geojson: data[0].geojson
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { center, active } = this.props;
        return (
            <div className="container">
                <div className="row flex-1">
                    <div className="col flex-1 pt-2 pl-2 pr-2">
                        <Mapbox
                            style={active ? 'mapbox://styles/mapbox/satellite-streets-v10' : 'mapbox://styles/mapbox/dark-v9'}
                            center={center}
                            className="map"
                            onStyleLoad={map => {
                                this.setState({
                                    map
                                });
                                map.easeTo({
                                    zoom: 8.75,
                                    easing: function easing(t) {
                                        return t * (2 - t);
                                    }
                                });

                                const Draw = new MapboxDraw();

                                map.addControl(Draw, 'top-left');
                            }}
                        >
                            <GeoJSONLayer
                                data={this.state.geojson}
                                fillPaint={{
                                    'fill-color': '#5AB6A2'
                                }}
                                fillOnMouseEnter={() => {
                                    this.state.map.getCanvas().style.cursor = 'pointer';
                                }}
                                fillOnMouseLeave={() => {
                                    this.state.map.getCanvas().style.cursor = '';
                                }}
                                fillOnClick={event => {
                                    console.log(event.features[0].properties);
                                    new mapboxgl.Popup()
                                        .setLngLat(event.lngLat)
                                        .setHTML('hola')
                                        .addTo(this.state.map);
                                }}
                            />
                            <button
                                type="button"
                                style={{
                                    position: 'absolute',
                                    zIndex: 999,
                                    top: 10,
                                    right: 10
                                }}
                                className="button"
                                onClick={() => {
                                    this.props.setActive();
                                }}
                            >
                                Edit
                            </button>
                            <div
                                className="sidebar"
                                style={{
                                    position: 'absolute',
                                    zIndex: 999,
                                    top: '50%',
                                    right: 0,
                                    transform: 'translate(0, -50%)'
                                }}
                            >
                                <div className="button bg-green txt-white bold">
                                    <div>
                                        <img src={Triangle} alt="Áreas Protegidas" height={20} />
                                    </div>
                                    <div className="ml-2">Áreas Protegidas</div>
                                </div>
                                <div className="button bg-pink txt-white bold">
                                    <div>
                                        <img src={Triangle} alt="Áreas Protegidas" height={20} />
                                    </div>
                                    <div className="ml-2">Áreas Protegidas</div>
                                </div>
                                <div className="button bg-orange txt-white bold">
                                    <div>
                                        <img src={Triangle} alt="Áreas Protegidas" height={20} />
                                    </div>
                                    <div className="ml-2">Áreas Protegidas</div>
                                </div>
                            </div>
                            <div
                                className="row"
                                style={{
                                    position: 'absolute',
                                    zIndex: 999,
                                    bottom: 40,
                                    left: 10
                                }}
                            >
                                <button
                                    type="button"
                                    className="circular-button col middle center mr-1"
                                    style={{ height: 60, width: 60 }}
                                    onClick={() => {
                                        const current = this.state.map.getZoom();
                                        this.state.map.easeTo({
                                            zoom: current + 1,
                                            easing: function easing(t) {
                                                return t * (2 - t);
                                            }
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button
                                    style={{ height: 60, width: 60 }}
                                    type="button"
                                    className="circular-button col middle center"
                                    onClick={() => {
                                        const current = this.state.map.getZoom();
                                        this.state.map.easeTo({
                                            zoom: current - 1,
                                            easing: function easing(t) {
                                                return t * (2 - t);
                                            }
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                        </Mapbox>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col border-right ml-2">
                        <div className="border-bottom" style={{ height: 40 }} />
                        <span className="bold title txt-uppercase p-1">Mapa 33</span>
                    </div>
                    <div className="col flex-2 border-right">
                        <div className="border-bottom" style={{ height: 40 }} />
                        <div className="row flex-1 p-1 center">
                            Para la Naturaleza agrupa a todas las personas que buscamos un futuro sustentable para Puerto Rico, donde nuestros hijos puedan crecer en ciudades habitables, nadar en ríos de agua cristalina y alimentarse de los frutos de nuestra tierra.
                        </div>
                    </div>
                    <div className="col mr-2">
                        <div className="border-bottom" style={{ height: 40 }} />
                        <div className="row flex-1 center p-1">
                            <img src={logo} alt="Logo de Para La Naturaleza" height={80} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col bg-green txt-white middle flex-1" style={{ height: 60 }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        center: state.map.center,
        style: state.map.style,
        active: state.map.active
    };
};

export default connect(
    mapStateToProps,
    {
        setActive,
        setCenter
    }
)(Map);
