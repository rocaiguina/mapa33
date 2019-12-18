import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class WichUseStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.wich_use != null){
      history.push(`${basename}/submit`);
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
          <Col md={12}>
            <h1>
              ¿Cuál uso le darías al terreno?
            </h1>
          </Col>
          <Col md={12} style={{textAlign:"left"}}>
              <Radio.Group
                name="wich_use"
                value={formik.values.wich_use}
                onChange={formik.handleChange}
              >
                <div style={{display:"flex"}}>
                  <Radio value="scientist_research" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Investigación Científica</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"15px"}}>
                  <Radio value="environment_monitoring" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Monitoreo Ambiental</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"15px"}}>
                  <Radio value="spirit_uses" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Usos espirituales</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"15px"}}>
                  <Radio value="educational" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Educación</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"15px"}}>
                  <Radio value="recreation" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Recreación</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"15px"}}>
                  <Radio value="turism" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Turismo</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"15px"}}>
                  <Radio value="sustainable_uses" className="blockstyleradio" ></Radio>
                  <div><h3 style={{ lineHeight: '32px' }}>Usos sostenibles</h3></div>
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

export default WichUseStep;
