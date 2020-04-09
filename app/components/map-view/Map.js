import React, { Component } from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Moment from 'moment';
import Numeral from 'numeral';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import ToolBar from './Toolbar';
import LandApi from '../../api/land';

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9jYWlndWluYSIsImEiOiJjazJsc3oxdWkwYW56M25sazQ0cWZnMG5pIn0.WAKi9fHre9kF116zG1mjXg';
let map = null;

function buildPopup(land) {
  const photograph =
    land.photograph || 'https://dummyimage.com/300x200/dddddd/ffffff';
  const date = Moment(land.createdAt, 'YYYY-MM-DD').format('MM.DD.YYYY');
  const url = '/land/' + land.id;
  let html =
    '<div class="mapbox-land-popup">' +
      '<div class="land-photo">' +
        '<a href="' + url + '" style="background-image:url(' + photograph + ')"></a>' +
      '</div>' +
      '<div class="land-details">' +
        '<h4 class="land-title">' +
          '<a href="' + url + '">' + land.name + '</a>' +
        '</h4>' +
        '<div class="separator"></div>' +
        '<p class="land-date">Propuesto: ' + date + '</p>' +
        '<p class="land-likes">' + 
          '<i aria-label="icon: heart" class="anticon anticon-heart"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="heart" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path></svg></i></i>' +
          Numeral(land.likes).format('0,0') +
        '</p>' +
      '</div>' +
    '</div>';
  return html;
}

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
        url: 'mapbox://rocaiguina.bzaytugl',
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
        const land = e.features[0].properties;

        LandApi.get(land.id)
          .then(response => {
            const html = buildPopup(response);
            this.popup
            .setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map);
          })
          .catch(err => {
            notification.error({
              message: 'Error',
              description:
                'No se logró recuperar la información. Por favor intenta nuevamente.',
            });
          });
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
      const areaView = this.props.areaView;
      map.setLayoutProperty(
        'protected_areas',
        'visibility',
        areaView == 'conserved' || areaView == '' ? 'visible' : 'none'
      );
      map.setLayoutProperty(
        'lots',
        'visibility',
        areaView == 'proposed' || areaView == '' ? 'visible' : 'none'
      );
    }
  }

  handleOnZoomIn = () => {
    //if(map.getZoom()<= 8){
    map.setZoom(map.getZoom() + 0.5);
    //}
  };

  handleOnZoomOut = () => {
    if (map.getZoom() > 8) {
      map.setZoom(map.getZoom() - 0.5);
    }
  };

  closeOverlay = () => {
    this.setState({
      mostrar: false,
    });
  };

  render() {
    return (
      <div className="mapbox-wrapper">
        <div ref={el => (this.mapContainer = el)} className="mapbox-view" />
        <div className="toolbar hidden-sm hidden-xs">
          <ul>
            <li>
              <Button
                size="large"
                shape="round"
                className="ant-btn-dark"
                onClick={this.handleOnZoomIn}
              >
                <Icon type="plus" />
              </Button>
            </li>
            <li>
              <Button
                size="large"
                shape="round"
                className="ant-btn-dark"
                onClick={this.handleOnZoomOut}
              >
                <Icon type="less" />
              </Button>
            </li>
          </ul>
        </div>
        <ToolBar
          area={this.props.areaView}
          mode={this.props.modeView}
          onChangeMode={this.props.onChangeMode}
          onChangeArea={this.props.onChangeArea}
        />
      </div>
    );
  }
}

Map.propTypes = {
  areaView: PropTypes.string,
  modeView: PropTypes.string,
  onChangeMode: PropTypes.func,
  onChangeArea: PropTypes.func,
};

export default Map;
