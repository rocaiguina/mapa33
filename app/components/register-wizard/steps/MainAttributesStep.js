import React from 'react';
import { Col, Row, Checkbox, Input } from 'antd';
import Pager from '../../ui/Pager';

class MainAttributesStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro3: false,
      };
  }

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/historicuses`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/howmanystructures`);
  }

  mostrarinput(e){
    this.setState({
      inputotro3: e.target.checked
    });
  }

  handleOnChange = (checkedValue) => {
    const { setFieldValue } = this.props.formik;
    setFieldValue('lands_attributes', checkedValue);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿Cuáles son los principales atributos que resaltan el valor para la conservación de esta propiedad?</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group
              style={{ width: '100%' }}
              value={formik.values.lands_attributes}
              onChange={this.handleOnChange}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="nature" className="inputprop radiobutton">Naturaleza</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="educational" className="inputprop radiobutton">Educativos</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="landscape" className="inputprop radiobutton">Paisajistas y escénicos</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="others" id="inputotro3" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {
                this.state.inputotro3 &&
                <Input
                  name="lands_other_attributes"
                  className="inputprop"
                  id="otro3"
                  size="large"
                  value={formik.values.lands_other_attributes}
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

export default MainAttributesStep;
