import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class SecondProposalsStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.second_proposals != null){
      history.push(`${basename}/thirdproposals`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/firstproposals`);
  }

  render() {
    const { formik } = this.props;
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
              <Radio.Group
                name="second_proposals"
                value={formik.values.second_proposals}
                onChange={formik.handleChange}
              >
                <div style={{display:"flex"}}>
                  <Radio value="group3" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#3.<br/>Proponemos que utopía se mantenga cerrada como una reserva biológica y que conserve su nombre actual pues ahí se capta la conexión simbólica entre la montaña y la comunidad.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="group4" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#4.<br/>Proponemos esperar hasta que utopía se recupere del huracas con la opción de dar acceso en el futuro a personas de bajos recursos de nuestra comunidad para que puedan recolectar frutos del bosque y plantas medicinales, y madera para combustible o construcció.</h3></div>
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
