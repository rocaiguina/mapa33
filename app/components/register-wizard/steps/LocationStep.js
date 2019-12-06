import React from 'react';
import { Col, Radio, Row } from 'antd';

class ProposeLandStep extends React.Component {
  render() {
    return (
      <div className="m-t-20">
          <br/>
          <br/>
          <br/>
          <Row>
              <Col md={8}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1> ¿Dónde está ubicado el terreno?</h1>
              </Col>
          </Row>
          <Row>
              <Col md={8}/>
              <Col md={8}>
                  <h2>
                    Empecemos ubicando tu terreno.
                  </h2>
                  <h2>
                    Sigue el tutorial a continuación.
                    En el mapa seleccionaras tu terreno y luego contestaras una serie de preguntas una serie de preguntas para poder procesar tu selecci&oacute;.
                  </h2>
              </Col>
          </Row>
          <br/>
          <br/>
          <br/>
      </div>
    );
  }
}

export default ProposeLandStep;