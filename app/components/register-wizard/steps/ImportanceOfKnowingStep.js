import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ImportanceOfKnowingStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/wichuse`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/contamination`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={8}>
            <h1>
              ¿Por qué es importante la protección de este terreno en particular?
            </h1>
          </Col>
          <Col md={16} style={{textAlign:"left"}}>
            <Radio.Group
              name="importance_of_knowing"
              value={formik.values.importance_of_knowing}
              onChange={formik.handleChange}
            >
              <div style={{display:"flex"}}>
                <Radio value="nature" className="blockstyleradio" ></Radio>
                <div><h3 style={{lineHeight: '32px'}}>Es un espacio 100% natural y quiero evitar cualquier perturbación e impacto humano.</h3></div>
              </div>
              <div style={{display:"flex", marginTop:"15px"}}>
                <Radio value="nature_low_human" className="blockstyleradio" ></Radio>
                <div><h3 style={{lineHeight: '32px'}}>Es un lugar natural con bajo impacto humano y quiero evitar mayores perturbaciones.</h3></div>
              </div>
              <div style={{display:"flex", marginTop:"15px"}}>
                <Radio value="nature_special" className="blockstyleradio" ></Radio>
                <div><h3 style={{lineHeight: '32px'}}>Es un lugar con rasgos naturales especiales(p.e. arboledas, mogotes, lagunas, cuevas)</h3></div>
              </div>
              <div style={{display:"flex", marginTop:"15px"}}>
                <Radio value="species_protection" className="blockstyleradio" ></Radio>
                <div><h3 style={{lineHeight: '32px'}}>Es un lugar donde habitan especies que deber ser protegidas</h3></div>
              </div>
              <div style={{display:"flex", marginTop:"15px"}}>
                <Radio value="historic" className="blockstyleradio" ></Radio>
                <div><h3 style={{lineHeight: '32px'}}>Es un lugar con historia natural y cultural que debe ser protegida</h3></div>
              </div>
              <div style={{display:"flex", marginTop:"15px"}}>
                <Radio value="conservation" className="blockstyleradio" ></Radio>
                <div><h3 style={{lineHeight: '32px'}}>Es un lugar óptimo donde la conservación y el desarrollo sustentable pueden ocurrir a la vez.</h3></div>
              </div>
            </Radio.Group>
          </Col>
        </Row>
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default ImportanceOfKnowingStep;
