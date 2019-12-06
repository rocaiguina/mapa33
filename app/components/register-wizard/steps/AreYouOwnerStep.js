import React from 'react';
import { Col, Row, Radio } from 'antd';

class AreYouOwnerStep extends React.Component {

  handleOnChange = (event) => {
    this.props.wizard.next();
  }

  render() {
    return (
      <div className="m-t-20">
        <br/>
        <br/>
        <br/>
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Eres Dueño del terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group buttonStyle="solid" onChange={this.handleOnChange}>
                <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
              </Radio.Group>
          </Col>
          <Col md={4}/>
        </Row>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default AreYouOwnerStep;