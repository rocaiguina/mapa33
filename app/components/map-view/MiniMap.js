import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from '@turf/bbox';

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9jYWlndWluYSIsImEiOiJjazJsc3oxdWkwYW56M25sazQ0cWZnMG5pIn0.WAKi9fHre9kF116zG1mjXg';
let map = null;

// Cambiar this.props.data por el redux props que tenga el geojson
// Para capturar la imagen: onClick{() => { const img = map.getCanvas().toDataURL();  console.log(img) }

class MiniMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [-66.45, 18.2],
      zoom: 8.5,
      attributionControl: false,
      interactive: false,
      preserveDrawingBuffer: true,
    });

    map.on('load', () => {
      map.addSource('source', {
        type: 'geojson',
        data: this.props.data,
      });

      map.addLayer(
        {
          id: 'fill',
          type: 'fill',
          source: 'source',
          paint: {
            'fill-color': '#E36D9D',
            'fill-opacity': 0.75,
          },
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'line',
          type: 'line',
          source: 'source',
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

      const bounds = bbox(this.props.data);
      map.fitBounds(bounds, { padding: 50 });
    });
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        style={{
          marginBottom: '15px',
          position: 'relative',
          height: '300px',
          width: '100%',
        }}
      />
    );
  }
}

export default MiniMap;
