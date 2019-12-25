import React from 'react';
import { Col, Row, Checkbox, Input } from 'antd';
import Pager from '../../ui/Pager';

class HowManyStructuresStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro2: false,
      };
  }

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.lands_structures != formik.initialValues.lands_structures){
      history.push(`${basename}/mainattributes`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/mainuses`);
  }

  mostrarinput(e){
    this.setState({
      inputotro2: e.target.checked
    });
  }

  handleOnChange = (checkedValue) => {
    const { setFieldValue } = this.props.formik;
    setFieldValue('lands_structures', checkedValue);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿Qué tipo de estructuras hay en el terreno?</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group
              style={{ width: '100%' }}
              value={formik.values.lands_structures}
              onChange={this.handleOnChange}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="residential"  className="inputprop radiobutton">Residencial</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="commercial"  className="inputprop radiobutton">Comercial / Oficina</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="agricultural" className="inputprop radiobutton">Agrícola</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="others" id="inputotro2" className="inputprop radiobutton" onChange={this.mostrarinput}>Otras</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {
                this.state.inputotro2 &&
                <Input
                  name="lands_other_structures"
                  className="inputprop"
                  id="otro2"
                  size="large"
                  value={formik.values.lands_other_structures}
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

export default HowManyStructuresStep;
