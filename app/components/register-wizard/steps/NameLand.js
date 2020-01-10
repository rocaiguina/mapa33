import React from 'react';
import { Col, Input, Row } from 'antd';
import Pager from '../../ui/Pager';

class NameLand extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.land_name != formik.initialValues.land_name) {
      if (!formik.errors.land_name){
        history.push(`${basename}/submit`);
      }
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/wichuse`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div>
          <Row>
              <Col md={8}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1>¿Qué nombre se debe utilizar para identificar este terreno?</h1>
              </Col>
          </Row>
          <Row>
            <Col md={8}/>
            <Col id="propcol1" md={8} >
                {formik.errors.land_name ? <label class="mensajerror">{formik.errors.land_name}</label> : null}
                <Input
                  name="land_name"
                  className="inputprop"
                  size="large"
                  style={{textAlign:"center"}}                  
                  value={formik.values.land_name}
                  onChange={formik.handleChange}
                />
            </Col>
          </Row>
          <Pager
            onPrevious={this.handleOnPrevious}
            onNext={this.handleOnNext}
          />;
      </div>
    );
  }
}

export default NameLand;
