import React from 'react';
import { Col, Row, Checkbox, Input } from 'antd';
import Pager from '../../ui/Pager';

class ProblemLandStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro: false,
      };
  }

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/mortgage`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/inheritance-agree`);
  }

  mostrarinput(e){
    this.setState({
      inputotro: e.target.checked
    });
  }

  handleOnChange = (checkedValue) => {
    const { setFieldValue } = this.props.formik;
    setFieldValue('lands_problem', checkedValue);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿El terreno tiene algún problema?</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group
              name="lands_problem"
              style={{ width: '100%' }}
              value={formik.values.lands_problem}
              onChange={this.handleOnChange}
            >
              <Row>
                <Col span={24}>
                  <Checkbox value="crim_owed" className="inputprop radiobutton">Deuda en el CRIM</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="legality_problems" className="inputprop radiobutton">Problemas legales</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="ownership_problems" className="inputprop radiobutton">Problemas de titularidad</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="others" id="inputotro" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {
                this.state.inputotro &&
                <Input
                  name="lands_other_problem"
                  className="inputprop"
                  id="otro"
                  size="large"
                  value={formik.values.lands_other_problem}
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

export default ProblemLandStep;
