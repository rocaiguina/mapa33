import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ValuePlaceStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.value_place != null){
      history.push(`${basename}/importanceofknowing`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/wichuse`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Qué valor tiene ese lugar?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group
                name="value_place"
                value={formik.values.value_place}
                onChange={formik.handleChange}
              >
                <div style={{display:"flex"}}>
                  <Radio value="existence" className="blockstyleradio" ></Radio>
                  <div><h3>Tiene derecho a existir, independiente de su valor para mí.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="resources" className="blockstyleradio" ></Radio>
                  <div><h3>Valoro sus recursos aunque nunca llegue a usarlos.</h3></div>
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

export default ValuePlaceStep;
