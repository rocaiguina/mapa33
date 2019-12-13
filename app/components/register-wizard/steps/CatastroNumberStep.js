import React from 'react';
import { Col, Input, Row } from 'antd';
import Pager from '../../ui/Pager';

class CatastroNumberStep extends React.Component {
  
  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/phoneowner`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/owner`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div>
          <Row>
              <Col md={8}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1>¿Cuál es el número de catastro?</h1>
              </Col>
          </Row>
          <Row>
            <Col md={8}/>
            <Col id="propcol1" md={8} >
                <Input
                  name="catastro_number"
                  className="inputprop"
                  size="large"
                  placeholder="__/__/__/__"
                  value={formik.values.catastro_number}
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

export default CatastroNumberStep;
