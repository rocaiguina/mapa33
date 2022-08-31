(function($) {

  function getAddress(s) {
    if (s) {
      return s.toLowerCase().replace(/^(.)|\s(.)/g, $1 => {
        return $1.toUpperCase();
      });
    }
    return 'No disponible';
  }

  function getPolygonArea(polygon) {
    return turf.area(polygon);
  };

  function mergePolygons(polygons) {
    let merged = turf.clone(polygons.features[0]);
    const { features } = polygons;
    for (let i = 0, len = features.length; i < len; i += 1) {
      const poly = features[i];
      if (poly.geometry) merged = turf.union(merged, poly);
    }
    return merged;
  };

  function buildPolygons(lots) {
    return new Promise((resolve, reject) => {
      if (lots.length > 0) {
        fetch('/api/land/select', {
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
            const geojson = mergePolygons(data[0].geojson);
            const area = getPolygonArea(geojson);
            const bounds = turf.bbox(geojson);
            geojson.features = data[0].geojson.features;
            geojson.properties.area = area;
            resolve({
              geojson,
              area,
            });
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve({
          geojson: {
            type: 'FeatureCollection',
            features: [],
            properties: {
              area: 0,
            },
          },
          area: 0,
        });
      }
    });
  }

  function trashPolygons() {
    const emptyGeoJson = {
      type: 'FeatureCollection',
      features: [],
      properties: {
        area: 0,
      },
    };
    map.getSource('geojson').setData(emptyGeoJson);
  }

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  
  var hoveredStateId = null;
  // var defaultCenter = [-66.45, 18.2];
  var defaultZoom = 14;

  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  var lots = [];
  var EDITABLE = false;

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    center: LAND_CENTER,
    zoom: defaultZoom,
    attributionControl: false,
  });

  map.on('load', () => {
    map.addSource('source', {
      type: 'vector',
      url: 'mapbox://rocaiguina.0uzatatd',
    });

    console.log('LAND_GEOM', LAND_GEOM);

    map.addSource('geojson', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    map.addSource('land', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          "type": "Feature",
          "properties": {},
          "geometry": LAND_GEOM
        }],
      },
    });

    map.addSource('protected_areas', {
      type: 'vector',
      url: 'mapbox://rocaiguina.bzaytugl',
    });

    map.addSource('proposed-lots', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
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
        id: 'land',
        type: 'fill',
        source: 'land',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': '#FF9333',
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
          'fill-color': '#ffff00',
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
          'line-color': '#ffff00',
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
        id: 'protected_areas',
        type: 'fill',
        source: 'protected_areas',
        'source-layer': 'lands',
        layout: {
          visibility: 'visible',
        },
        paint: { 'fill-color': '#5bbcae' },
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

    fetch(`/api/land/geojson?area=proposed&except=${LAND_ID}`)
      .then(response => response.json())
      .then(data => {
        map.getSource('proposed-lots').setData(data[0].geojson);
      })
      .catch(error => {
        console.log(error);
      });
  });

  map.once('idle', () => {
    // Load polygons
    if (lots.length > 0) {
      setTimeout(() => {
        buildPolygons(lots).then(({ geojson }) => {
          var bounds = turf.bbox(geojson);
          map.fitBounds(bounds, {
            animate: false,
          });
        });
      }, 400);
    }
  });

  map.on('mousemove', 'lots', e => {
    map.getCanvas().style.cursor = 'pointer';

    let html = `
      <div class="mapbox-editor-popup">
        <p class="catastro">
          <b>Catastro:</b> ${e.features[0].properties.catastro ||
            'No disponible'}
        </p>
        <p class="municipio">
          <b>Municipio:</b> ${e.features[0].properties.muni_norml ||
            'No disponible'}
        </p>
        <p class="address">
          <b>Dirrección:</b> ${getAddress(
            e.features[0].properties.dir_fisica
          )}
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

  let layerClicked = { id: '', coords: {} };

  map.on('click', 'proposed-lots', e => {
    layerClicked.coords = e.point;
    layerClicked.id =  'proposed_areas';
  });
  map.on('click', 'protected_areas', e => {
    layerClicked.coords = e.point;
    layerClicked.id = 'protected_areas';
  });

  map.on('click', 'lots', e => {
    if (
      layerClicked.coords.x === e.point.x &&
      layerClicked.coords.y === e.point.y
    ) {
      if (['protected_areas', 'proposed_areas'].includes(layerClicked.id)) {
        alert('Este terreno se encuentra propuesto ó protegido');
      }
      return;
    }

    if (EDITABLE === false) {
      swal({
        title: "¿Estas seguro de editar el terreno?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function(isConfirm) {
        if (isConfirm) {
          EDITABLE = true;
          map.setPaintProperty('land', 'fill-opacity', 0.75);
        }
      });
    } else {
      var { id } = e.features[0].properties;
      var exist = lots.indexOf(id) > -1;

      if (exist) {
        lots = _.remove(lots, n => {
          return n !== id;
        });
      } else {
        lots = _.concat(lots, id);
      }

      if (lots.length > 0) {
        buildPolygons(lots)
        .then(({ geojson }) => {
          map.getSource('geojson').setData(geojson);

          $('input[name=geom]').val(JSON.stringify(geojson.geometry));
          $('input[name=area_size]').val(parseInt(geojson.properties.area, 10));
          $('input[name=plots_count]').val(geojson.features.length);
          $('input[name=coordinates]').val(JSON.stringify(turf.centroid(geojson.geometry).geometry));
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        trashPolygons();
      }
    } 
  });

})(jQuery);