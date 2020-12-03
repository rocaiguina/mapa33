module.exports = {
  geojsonToSvg: function(geojson, pixelDimension) {
    let latArr = [];
    let lngArr = [];

    geojson.forEach((item) => {
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

    let points = geojson
      .map((item) => {
        return `${(item[0] + Math.abs(minLat)) * growFactor},${(item[1] -
          Math.abs(minLng)) *
          growFactor}`;
      })
      .reduce((acc, curr, i) => acc + " " + curr);

    return `<svg width="${pixelDimension}" height="${pixelDimension}">
  <polygon
    fill="#F073A8"
    points="${points}"
    transform="translate(${(pixelDimension - polygonWidth) /
      2},${polygonHeight + (pixelDimension - polygonHeight) / 2}) scale(1,-1)"
  />
</svg>`;
  },
};
