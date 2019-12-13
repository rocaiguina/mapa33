import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ThirdProposalsStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/submit`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/secondproposals`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Tercer grupo de propuestas?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group
                name="third_proposals"
                value={formik.values.third_proposals}
                onChange={formik.handleChange}
              >
                <div style={{display:"flex"}}>
                  <Radio className="blockstyleradio" value="group5"></Radio>
                  <div><h3>Grupos de vecinos#5.<br/>Proponemos preservar utopía como un santuario natural cerrado al público para conservar sus cualidades anímicas y conexión con el planeta.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio className="blockstyleradio" value="group6"></Radio>
                  <div><h3>Grupos de vecinos#6.<br/>Proponemos que utopía se mantenga abierta para el beneficio uso y disfrute económico, social y cultural de toda la comunidad.</h3></div>
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

export default ThirdProposalsStep;
