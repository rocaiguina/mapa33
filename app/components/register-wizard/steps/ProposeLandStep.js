import React from 'react';
import { Col, Radio, Row } from 'antd';

class ProposeLandStep extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Quieres proponer un terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group defaultValue="Si" buttonStyle="solid">
                <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
              </Radio.Group>
          </Col>
          <Col md={4}/>
        </Row>
      </div>
    );
  }
}

export default ProposeLandStep;