module.exports = {
  polygon: function(geojson, pixelDimension) {
    let latArr = [];
    let lngArr = [];

    geojson[0].forEach(item => {
      latArr.push(item[0]);
      lngArr.push(item[1]);
    });

    let minLat = Math.min(...latArr);
    let minLng = Math.min(...lngArr);
    let maxLat = Math.max(...latArr);
    let maxLng = Math.max(...lngArr);

    let largestSide =
      maxLng - minLng > maxLat - minLat ? maxLng - minLng : maxLat - minLat;
    let growFactor = pixelDimension / largestSide;

    let polygonHeight = (maxLng - minLng) * growFactor;
    let polygonWidth = (maxLat - minLat) * growFactor;

    let points = geojson[0]
      .map(item => {
        return `${(item[0] + Math.abs(minLat)) * growFactor},${(item[1] -
          Math.abs(minLng)) *
          growFactor}`;
      })
      .reduce((acc, curr) => acc + ' ' + curr);

    return `<svg width="${pixelDimension}" height="${pixelDimension}">
  <polygon
    fill="#F073A8"
    points="${points}"
    transform="translate(${(pixelDimension - polygonWidth) /
      2},${polygonHeight + (pixelDimension - polygonHeight) / 2}) scale(1,-1)"
  />
</svg>`;
  },
  multipolygon: function(geojson, pixelDimension) {
    let latArr = [];
    let lngArr = [];

    geojson.forEach(polygon => {
      polygon[0].forEach(coor => {
        latArr.push(coor[0]);
        lngArr.push(coor[1]);
      });
    });

    let minLat = Math.min(...latArr);
    let minLng = Math.min(...lngArr);
    let maxLat = Math.max(...latArr);
    let maxLng = Math.max(...lngArr);

    let largestSide =
      maxLng - minLng > maxLat - minLat ? maxLng - minLng : maxLat - minLat;
    let growFactor = pixelDimension / largestSide;

    const polygons = geojson.map(polygon => {
      let points = polygon[0]
        .map(item => {
          return `${(item[0] + Math.abs(minLat)) * growFactor},${(item[1] -
            Math.abs(minLng)) *
            growFactor}`;
        })
        .reduce((acc, curr) => acc + ' ' + curr);

      return points;
    });

    const polygonsHeight = (maxLng - minLng) * growFactor;
    const polygonsWidth = (maxLat - minLat) * growFactor;
    const svgPolygons = polygons.map(
      polygon => `<polygon
    fill="#F073A8"
    points="${polygon}"
  />`
    );

    const svg =
      `<svg width="${pixelDimension}" height="${pixelDimension}"><g transform="translate(${(pixelDimension -
        polygonsWidth) /
        2},${polygonsHeight +
        (pixelDimension - polygonsHeight) / 2})scale(1,-1)">` +
      svgPolygons +
      `</g></svg>`;

    return svg;
  },
};
