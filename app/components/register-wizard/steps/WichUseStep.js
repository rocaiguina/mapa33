import React from 'react';
import { Col, Row, Input } from 'antd';
import Pager from '../../ui/Pager';

class WichUseStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/valueplace`);
  }

  handleOnPrevious = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.are_u_owner === true) {
      history.push(`${basename}/contamination`);
    }

    if (formik.values.are_u_owner === false) {
      history.push(`${basename}/mainuses`);
    }

    if (formik.values.are_u_owner === null) {
      history.push(`${basename}/owner`);
    }
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{paddingLeft:"20px"}}>
              <h1>¿Cuál uso le darías al terreno?</h1>
              <h1>Explica brevemente</h1>
          </Col>
          <Col md={8} >
            <Input.TextArea
              name="wich_use"
              className="inputprop"
              value={formik.values.wich_use}
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

export default WichUseStep;
