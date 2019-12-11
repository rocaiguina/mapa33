import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class SecondProposalsStep extends React.Component {

  handleOnNext = (event) => {
    this.props.wizard.next();
  }

  handleOnPrevious = (event) => {
    this.props.wizard.previous();
  }

  render() {
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Segundas dos propuestas?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group defaultValue="Si">
                <div style={{display:"flex"}}>
                  <Radio value="Si" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#3.<br/>Proponemos que utop&iacute;a se mantenga cerrada como una reserva biol&oacute;gica y que conserve su nombre actual pues ah&iacute; se capta la conexi&oacute;n simb&oacute;lica entre la montaña y la comunidad.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="No" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#4.<br/>Proponemos esperar hasta que utop&iacute;a se recupere del huracas con la opci&oacute;n de dar acceso en el futuro a personas de bajos recursos de nuestra comunidad para que puedan recolectar frutos del bosque y plantas medicinales, y madera para combustible o construcci&oacute;.</h3></div>
                </div>
              </Radio.Group>
          </Col>
          <Col md={4}/>
        </Row>
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default SecondProposalsStep;
