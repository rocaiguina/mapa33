import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class FirstProposalsStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.first_proposals != null){
      history.push(`${basename}/secondproposals`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/importanceofknowing`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Primeras dos propuestas?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group
                name="first_proposals"
                value={formik.values.first_proposals}
                onChange={formik.handleChange}
              >
                <div style={{display:"flex"}}>
                  <Radio value="group1" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#1.<br/>Proponemos que Utopía se mantenga cerrada al público con el fin de preservar sus cualidades y belleza natural.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="group2" className="blockstyleradio" ></Radio>
                  <div><h3>Grupos de vecinos#2.<br/>Proponemos que utopía sea visitada por personas para fines de recreación y aprender sobre el medio ambiente.</h3></div>
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

export default FirstProposalsStep;
