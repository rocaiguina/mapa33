import React from 'react';
import { Col, Radio, Row, Checkbox, Input } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class HowManyStructuresStep extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          inputotro2: false,
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
      inputotro2: e.target.checked
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
            <h1>¿Cu&aacute;ntas estructuras hay en el terreno?</h1>
            <h1>Especificar cantidad y tipo</h1>
          </Col>
          <Col md={8}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}>
                  <Checkbox value="A"  className="inputprop radiobutton">Residencial</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="B"  className="inputprop radiobutton">Comercial / Oficina</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="C" className="inputprop radiobutton">Agr&iacute;cola</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="D" id="inputotro2" className="inputprop radiobutton" onChange={this.mostrarinput}>Otras</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
              {this.state.inputotro2 ? <Input className="inputprop" id="otro2" size="large"/>: null}
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

export default HowManyStructuresStep;
