import React from 'react';
import { Col, Row, Checkbox, Input } from 'antd';
import Pager from '../../ui/Pager';

class HistoricUsesStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro4: false,
      };
  }

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/contamination`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/mainattributes`);
  }

  mostrarinput(e){
    this.setState({
      inputotro4: e.target.checked
    });
  }

  handleOnChange = (checkedValue) => {
    const { setFieldValue } = this.props.formik;
    setFieldValue('lands_historic_uses', checkedValue);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿Cuáles fueron los usos históricos del terreno?</h1>
            <h1>(Si aplica)</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group
              style={{ width: '100%' }}
              value={formik.values.lands_historic_uses}
              onChange={this.handleOnChange}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="historic" className="inputprop radiobutton">Histórico / Culturales</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="educational" className="inputprop radiobutton">Educativos / Recreativos</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="landscape" className="inputprop radiobutton">Paisajistas y Escénicos</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="others" id="inputotro4" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {
                this.state.inputotro4 &&
                <Input
                  name="lands_other_historic_uses"
                  className="inputprop"
                  id="otro4"
                  size="large"
                  value={formik.values.lands_other_historic_uses}
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

export default HistoricUsesStep;
