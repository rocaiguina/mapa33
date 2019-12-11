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

  handleOnChange = (event) => {
    this.props.wizard.next();
  }

  handleOnNext = (event) => {
    this.props.wizard.next();
  }

  handleOnPrevious = (event) => {
    this.props.wizard.previous();
  }
  mostrarinput(e){
    this.setState({
      inputotro1: e.target.checked
    });
  }

  render() {
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿Cu&aacute;les son los usos principales actuales de la propiedad?</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>
                  <Checkbox value="A" className="inputprop radiobutton">Residencial</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="B" className="inputprop radiobutton">Comercial</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="C" className="inputprop radiobutton">Natural / Bosque</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="D" id="inputotro1" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {this.state.inputotro1 ? <Input className="inputprop" id="otro1" size="large"/>: null}
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
