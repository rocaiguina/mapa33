import React from "react";

export default function ComponentName() {
  let pixelDimension = 500;
  let points;
  let latArr = [];
  let lngArr = [];
  let minLat;
  let minLng;
  let maxLat;
  let maxLng;
  let largestSide;
  let growFactor;
  let polygonHeight;
  let polygonWidth;
  let svgDimension;

  data.forEach((item) => {
    latArr.push(item[0]);
    lngArr.push(item[1]);
  });

  minLat = Math.min(...latArr);
  minLng = Math.min(...lngArr);
  maxLat = Math.max(...latArr);
  maxLng = Math.max(...lngArr);

  largestSide =
    maxLng - minLng > maxLat - minLat ? maxLng - minLng : maxLat - minLat;
  growFactor = pixelDimension / largestSide;

  polygonHeight = (maxLng - minLng) * growFactor;
  polygonWidth = (maxLat - minLat) * growFactor;
  svgDimension = polygonHeight > polygonWidth ? polygonHeight : polygonWidth;

  console.log(svgDimension);

  points = data
    .map((item) => {
      return `${(item[0] + Math.abs(minLat)) * growFactor},${(item[1] -
        Math.abs(minLng)) *
        growFactor}`;
    })
    .reduce((acc, curr, i) => acc + " " + curr);

  return (
    <>
      <svg width={`${svgDimension}`} height={`${svgDimension}`}>
        <polygon
          fill="#F073A8"
          points={`${points}`}
          transform={`translate(${(svgDimension - polygonWidth) /
            2},${polygonHeight}) scale(1,-1)`}
        />
      </svg>
    </>
  );
}

const data = [
  [-66.444402091, 18.19420867],
  [-66.444103405, 18.192621986],
  [-66.443028556, 18.192804675],
  [-66.442414432, 18.194756398],
  [-66.442447283, 18.194783599],
  [-66.442485645, 18.194809348],
  [-66.442517747, 18.194828283],
  [-66.442534971, 18.194840399],
  [-66.442543564, 18.194849451],
  [-66.442552167, 18.194856245],
  [-66.442574024, 18.194881894],
  [-66.442581038, 18.194892446],
  [-66.442596552, 18.194927835],
  [-66.442607358, 18.194962429],
  [-66.44261342, 18.195001532],
  [-66.442615596, 18.195034581],
  [-66.4426178, 18.195061632],
  [-66.442623927, 18.195088691],
  [-66.442627794, 18.195099993],
  [-66.442637909, 18.195119572],
  [-66.442644924, 18.195127865],
  [-66.442665193, 18.195156505],
  [-66.44269171, 18.195192698],
  [-66.442706523, 18.195213052],
  [-66.442719787, 18.195229649],
  [-66.442729155, 18.195240202],
  [-66.442751815, 18.19526211],
  [-66.442765088, 18.195278698],
  [-66.442768983, 18.195281724],
  [-66.442774448, 18.195290018],
  [-66.442788514, 18.195304345],
  [-66.442803356, 18.195320211],
  [-66.442822111, 18.195338334],
  [-66.442827548, 18.195349618],
  [-66.442841539, 18.195376732],
  [-66.444294644, 18.195019153],
  [-66.444402091, 18.19420867],
];
