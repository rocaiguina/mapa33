import React from 'react';
import { Col, Row, Input} from 'antd';
import Pager from '../../ui/Pager';

class PhoneOwnerStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/inheritance`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/catastro-number`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={8}/>
          <Col md={8} style={{paddingLeft:"20px"}}>
              <h1>¿Cuál es el nombre y el teléfono del dueño?</h1>
          </Col>
        </Row>
        <Row>
          <Col md={8}/>
          <Col id="propcol1" md={8} >
              <Input
                name="owner_phone"
                className="inputprop"
                size="large"
                placeholder="T:"
                value={formik.values.owner_phone}
                onChange={formik.handleChange}
              />
              <Input.TextArea
                name="owner_name"
                className="inputprop"
                placeholder="N:"
                value={formik.values.owner_name}
                onChange={formik.handleChange}
              />
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

export default PhoneOwnerStep;
