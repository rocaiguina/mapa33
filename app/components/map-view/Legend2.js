import React from 'react';

function Legend2() {
  return (
    <div className="map-legend map-legend2">
      <div className="map-legend-text">
        LEYENDA <span className="hidden-xs">DE ÁREAS NATURALES</span>
      </div>
      <dl>
        <dt>
          <span className="legend-protected"></span>
        </dt>
        <dd>Protegidas</dd>
      </dl>
      <dl className="last">
        <dt>
          <span className="legend-proposed"></span>
        </dt>
        <dd>Propuestas</dd>
      </dl>
    </div>
  );
}

export default Legend2;
