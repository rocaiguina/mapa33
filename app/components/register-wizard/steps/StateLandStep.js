import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class StateLandStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/mainuses`);
  }

  handleOnPrevious = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.know_owner === true) {
      history.push(`${basename}/yesfillform`);
    } else {
      history.push(`${basename}/knowowner`);
    }
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿En qué estado se encuentra el terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group
                name="land_status"
                buttonStyle="solid"
                size="large"
                value={formik.values.land_status}
                onChange={formik.handleChange}
              >
                <Col md={24}>
                  <Radio.Button className="inputprop radiobutton" value="abandoned">Abandono</Radio.Button>
                </Col>
                <Col md={24}>
                  <Radio.Button className="inputprop radiobutton" value="maintenance">Recibe Mantenimiento</Radio.Button>
                </Col>
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

export default StateLandStep;
