import React, { Component } from 'react';
import { Modal } from 'antd';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Intructions from '../intro/instructions';

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9jYWlndWluYSIsImEiOiJjazJsc3oxdWkwYW56M25sazQ0cWZnMG5pIn0.WAKi9fHre9kF116zG1mjXg';
let map = null;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -66.45,
      lat: 18.2,
      zoom: 8,
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      mostrar: true,
    };
  }

  componentDidMount() {
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/rocaiguina/ck81mam531w901ippbvie6wrv',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    this.popup = new mapboxgl.Popup();

    map.on('load', () => {
      map.addSource('protected_areas', {
        type: 'vector',
        url: 'mapbox://rocaiguina.5e4ohel1',
      });

      map.addSource('lots', {
        type: 'geojson',
        data: this.state.data,
      });

      map.addLayer(
        {
          id: 'protected_areas',
          type: 'fill',
          source: 'protected_areas',
          'source-layer': 'protected_areas-2os65p',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': {
              property: 'user_id',
              stops: [
                [2, '#369ac1'],
                [3, '#084e7a'],
                [4, '#2e84c6'],
                [5, '#3cabef'],
                [6, '#ff5e43'],
                [7, '#b72200'],
                [8, '#f9ad9b'],
                [9, '#f48767'],
                [10, '#e8512e'],
                [11, '#00c3ff'],
                [12, '#02c6a1'],
                [13, '#85e0d0'],
                [14, '#3e9687'],
                [15, '#00c3ff'],
                [16, '#369ac1'],
                [17, '#084e7a'],
              ],
            },
          },
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'lots',
          type: 'fill',
          source: 'lots',
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
          map.getSource('lots').setData(data[0].geojson);
        })
        .catch(error => {
          console.log(error);
        });

      map.on('click', 'protected_areas', e => {
        const img = `https://api.mapbox.com/v4/mapbox.satellite/${e.lngLat.lng},${e.lngLat.lat},16/250x150@2x.png?access_token=${mapboxgl.accessToken}`;
        let html = '<div>';
        html += `<div style="text-align: center"><a href="/land/1"><strong>${e.features[0].properties.NAME}</strong></a></div>`;
        html += `<a href="/land/1"><img src='${img}' alt='Imágen de Satélite' style='width: 100%'/></a>`;
        html += `<div><strong>Dueño: </strong>${e.features[0].properties.OWNERSHIP}</div>`;
        html += `<div><strong>Manejado: </strong>${e.features[0].properties.MGMT}</div>`;
        html += `<div><strong>Establecido: </strong>${
          e.features[0].properties.YEAR_ESTAB
        } | ${e.features[0].properties.ACRES.toLocaleString()} acres</div>`;
        html += '</div>';

        this.popup
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
      });

      map.on('click', 'lots', e => {
        const img = `https://api.mapbox.com/v4/mapbox.satellite/${e.lngLat.lng},${e.lngLat.lat},16/250x150@2x.png?access_token=${mapboxgl.accessToken}`;
        let html = '<div>';
        html += `<div style="text-align: center"><a href="/land/${e.features[0].properties.id}"><strong>${e.features[0].properties.name}</strong></a></div>`;
        html += `<a href="/land/${e.features[0].properties.id}"><img src='${img}' alt='Imágen de Satélite' style='width: 100%'/></a>`;
        html += `<div><strong>Municipio: </strong>${e.features[0].properties.location}</div>`;
        html += `<div><strong>Entidad: </strong>${e.features[0].properties.entity}</div>`;
        html += `<div><strong>Establecido: </strong>${e.features[0].properties.year_acquisition}</div>`;
        html += `<div><strong>Estado: </strong>${e.features[0].properties.status}</div>`;
        html += '</div>';

        this.popup
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
      });

      map.on('mousemove', e => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['lots', 'protected_areas'],
        });
        if (features.length) {
          map.getCanvas().style.cursor = 'pointer';
        } else {
          map.getCanvas().style.cursor = '';
        }
      });
    });
  }

  componentWillUnmount() {
    map.remove();
  }

  componentDidUpdate(prevProps) {
    if (this.props.areaView !== prevProps.areaView) {
      map.setLayoutProperty(
        'protected_areas',
        'visibility',
        this.props.areaView == 'conserved' ? 'visible' : 'none'
      );
      map.setLayoutProperty(
        'lots',
        'visibility',
        this.props.areaView == 'proposed' ? 'visible' : 'none'
      );
    }
  }

  handleOnZoomIn = event => {
    //if(map.getZoom()<= 8){
    map.setZoom(map.getZoom() + 0.5);
    //}
  };

  handleOnZoomOut = event => {
    if (map.getZoom() > 8) {
      map.setZoom(map.getZoom() - 0.5);
    }
  };

  closeOverlay = event => {
    this.setState({
      mostrar: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.mostrar ? (
          <div className={'overlay'}>
            <Intructions
              onClose={this.closeOverlay}
              onExploreMap={this.closeOverlay}
            />
          </div>
        ) : null}
        <div
          ref={el => (this.mapContainer = el)}
          style={{ height: '50vh', width: '100%', marginBottom: '20px' }}
        />
        <div className="toolbar hidden-sm hidden-xs">
          <ul>
            <li>
              <Button size="large" ghost onClick={this.handleOnZoomIn}>
                <Icon type="plus" />
              </Button>
            </li>
            <li>
              <Button size="large" ghost onClick={this.handleOnZoomOut}>
                <Icon type="less" />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Map;
