import React from 'react';
import { Col, Row, Checkbox, Input } from 'antd';
import Pager from '../../ui/Pager';

class MainUsesStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro1: false,
      };
  }

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.are_u_owner === true) {
      history.push(`${basename}/howmanystructures`);
    }

    if (formik.values.are_u_owner === false) {
      history.push(`${basename}/wichuse`);
    }

    if (formik.values.are_u_owner === null) {
      history.push(`${basename}/owner`); 
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.are_u_owner === true) {
      history.push(`${basename}/surveying`);
    }

    if (formik.values.are_u_owner === false) {
      history.push(`${basename}/stateland`);
    }

    if (formik.values.are_u_owner === null) {
      history.push(`${basename}/owner`); 
    }
  }

  mostrarinput(e){
    this.setState({
      inputotro1: e.target.checked
    });
  }

  handleOnChange = (checkedValue) => {
    const { setFieldValue } = this.props.formik;
    setFieldValue('lands_main_uses', checkedValue);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿Cu&aacute;les son los usos principales actuales de la propiedad?</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group 
              style={{ width: '100%' }}
              value={formik.values.lands_main_uses}
              onChange={this.handleOnChange}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="residential" className="inputprop radiobutton">Residencial</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="commercial" className="inputprop radiobutton">Comercial</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="nature_forest" className="inputprop radiobutton">Natural / Bosque</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="others" id="inputotro1" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {
                this.state.inputotro1 &&
                <Input
                  name="lands_other_main_uses"
                  className="inputprop"
                  id="otro1"
                  size="large"
                  value={formik.values.lands_other_main_uses}
                  onChange={formik.handleChange}
                />
              }
          </Col>
          <Col md={4} />
        </Row>
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default MainUsesStep;
