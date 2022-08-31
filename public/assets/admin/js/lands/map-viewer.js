(function($) {
  // Map
  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jYWlndWluYSIsImEiOiJjazJsc3oxdWkwYW56M25sazQ0cWZnMG5pIn0.WAKi9fHre9kF116zG1mjXg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    center: LAND_CENTER,
    zoom: 12,
    attributionControl: false,
  });

  map.on('load', () => {
    map.addSource('protected_areas', {
      type: 'vector',
      url: 'mapbox://rocaiguina.d6j1xz6t',
    });

    map.addSource('proposed-lots', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    map.addSource('lot', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        features: [{
          "type": "Feature",
          "properties": {},
          "geometry": LAND_GEOM
        }],
      }
    });

    map.addLayer(
      {
        id: 'protected_areas',
        type: 'fill',
        source: 'protected_areas',
        'source-layer': 'lands-380u2f',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': '#5bbcae'
        }
      },
      'waterway-label'
    );
    
    map.addLayer(
      {
        id: 'lot',
        type: 'fill',
        source: 'lot',
        paint: {
          'fill-color': '#5bbcae',
          'fill-opacity': 0.75,
        },
      },
      'waterway-label'
    );

    map.addLayer(
      {
        id: 'lot-border',
        type: 'line',
        source: 'lot',
        layout: {
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#5bbcae',
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
      'lot'
    );


    fetch(`/api/land/geojson?area=proposed`)
    .then(response => response.json())
    .then(data => {
      map.getSource('proposed-lots').setData(data[0].geojson);
    })
    .catch(error => {
      console.log(error);
    });

  });
})(jQuery);