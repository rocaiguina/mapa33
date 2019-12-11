import React from 'react';
import { Col, Radio, Row, Checkbox, Input } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class HistoricUsesStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro4: false,
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
      inputotro4: e.target.checked
    });
  }
  render() {
    return (
      <div className="m-t-20">
        <br/>
        <br/>
        <br/>
        <Row>
          <Col md={4}/>
          <Col md={8}>
            <h1>¿Cu&aacute;les fueron los usos hist&oacute;ricos del terreno?</h1>
            <h1>(Si aplica)</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>
                  <Checkbox value="A" className="inputprop radiobutton">Hist&oacute;rico / Culturales</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="B" className="inputprop radiobutton">Educativos / Recreativos</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="C" className="inputprop radiobutton">Paisajistas y Esc&eacute;nicos</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="D" id="inputotro4" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {this.state.inputotro4 ? <Input className="inputprop" id="otro4" size="large"/>: null}
          </Col>
          <Col md={4} />
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
            <Col xs={12}>
              <div className="text-left">
                <Button type="primary" onClick={this.handleOnPrevious}><Icon type="arrow-left-2"/></Button>
              </div>
            </Col>
            <Col xs={12}>
              <div className="text-right">
                <Button type="primary" onClick={this.handleOnNext}><Icon type="arrow-right-2"/></Button>
              </div>
            </Col>
        </Row>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default HistoricUsesStep;
