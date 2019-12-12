import React from 'react';
import { Col, Row, Input } from 'antd';
import Pager from '../../ui/Pager';

class YesFillFormStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/stateland`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/knowowner`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{paddingLeft:"20px"}}>
              <h1>Si contesta (si) llene el formulario </h1>
          </Col>
          <Col id="propcol1" md={8} >
              <Input
                name="owner_name"
                className="inputprop"
                size="large"
                placeholder="Nombre:"
                value={formik.values.owner_name}
                onChange={formik.handleChange}
              />
              <Input 
                name="owner_phone"
                className="inputprop"
                size="large"
                placeholder="Tel:"
                value={formik.values.owner_phone}
                onChange={formik.handleChange}
              />
              <Input 
                name="owner_email"
                className="inputprop"
                size="large"
                placeholder="@:"
                value={formik.values.owner_email}
                onChange={formik.handleChange}
              />
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

export default YesFillFormStep;
