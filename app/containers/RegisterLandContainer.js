import React from 'react';
import BaseLayout from '../components/layout/base';
import {Button, Steps, Input, Col, Row, Radio, DatePicker, Checkbox, Tex } from 'antd';
const {Step} = Steps;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
import moment from 'moment';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const steps = [
    {
        title: '0',
    },
    {
        title: '1',
    },
    {
        title: '2',
    },
    {
        title: '3',
    },
    {
        title: '4',
    },
    {
        title: '5',
    },
    {
        title: '6',
    },
    {
        title: '7',
    },
    {
        title: '8',
    },
    {
        title: '9',
    },
    {
        title: '10',
    },
    {
        title: '11',
    },
    {
        title: '12',
    },
    {
        title: '13',
    },
    {
        title: '14',
    },
    {
        title: '15',
    },
    {
        title: '16',
    },
    {
        title: '17',
    },
    {
        title: '18',
    },
    {
        title: '19',
    },
    {
        title: '20',
    },
    {
        title: '21',
    },
    {
        title: '22',
    },
    {
        title: '23',
    },
    {
        title: '24',
    },
    {
        title: '25',
    },
    {
        title: '26',
    },
    {
        title: '27',
    },
    {
        title: '28',
    },
    {
        title: '29',
    },
    {
        title: '30',
    },

];

class RegisterLandContainer extends React.Component {
  constructor (props) {
      super(props);
      this.mostrarinput = this.mostrarinput.bind(this);
      this.state = {
          current: 0,
          checked: false,
          catorce: false,
          inputotro: false,
          inputotro1: false,
          inputotro2: false,
          inputotro3: false,
          inputotro4: false,
          inputotro5: false,
          inputotro6: false,
          inputotro7: false,

      };
  }

  handleOnClose = (event) => {
    this.props.history.push('/mymap');
  }

  next() {
      const current = this.state.current + 1;
      switch (this.state.current) {
        case 3:
          this.setState({ current: 16 });
          break;
        case 20:
          this.setState({ current: 26 });
          break;
        case 30:
          this.setState({ current: 22 });
          break;
        case 8:
          this.setState({ current: 11 });
          break;
        case 18:
          this.setState({ catorce: false });
          this.setState({ current: 19 });
          break;
        case 11:
          this.setState({ current: 14 });
          break;
        case 14:
          this.setState({ current: 19 });
          this.setState({ catorce: true });
          break;
        case 19:
          {this.state.catorce ? this.setState({ current: 10 }) : this.setState({ current: 20 })}
          break;
        case 10:
          this.setState({ current: 12 });
          break;
        case 13:
          this.setState({ current: 15 });
          break;
        case 15:
          this.setState({ current: 20 });
          break;
        default:
          this.setState({ current });
      }

  }

  prev() {
      const current = this.state.current - 1;
      switch (this.state.current) {
        case 3:
          this.setState({ current: 1 });
          break;
        case 4:
          this.setState({ current: 1 });
          break;
        case 16:
          this.setState({ current: 6 });
          break;
        case 26:
          this.setState({ current: 20 });
          break;
        case 11:
          this.setState({ current: 8 });
          break;
        case 14:
          this.setState({ current: 11 });
          break;
        case 19:
          {this.state.catorce ? this.setState({ current: 14 }) : this.setState({ current: 18 })}
          break;
        case 10:
          this.setState({ current: 19 });
          break;
        case 12:
          this.setState({ current: 10 });
          break;
        case 13:
          this.setState({ current: 12 });
          break;
        case 15:
          this.setState({ current: 13 });
          break;
        default:
          this.setState({ current });
      }
  }

  sentencia(expr) {
      const current = this.state.current + 1 ;
      switch (this.state.current) {
        case 1:
          {expr ? this.setState({ current: 4 }) : this.setState({ current: 2 })}
          break;
        case 2:
          {expr ? this.setState({ current: 3}) : this.handleOnClose()}
          break;
        case 16:
          {expr ? this.setState({ current: 17}) : this.setState({ current: 18})}
          break;
        case 22:
          {expr ? this.setState({ current: 23}): null}
          break;
      }

  }

  mostrarinput(e){
    switch (e.target.id){
      case 'inputotro':
        this.setState({
          inputotro: e.target.checked
        });
      break;
      case 'inputotro1':
        this.setState({
          inputotro1: e.target.checked
        });
      break;
      case 'inputotro2':
        this.setState({
          inputotro2: e.target.checked
        });
      break;
      case 'inputotro3':
        this.setState({
        inputotro3: e.target.checked
        });
      break;
      case 'inputotro4':
        this.setState({
        inputotro4: e.target.checked
        });
      break;
      case 'inputotro5':
        this.setState({
        inputotro5: e.target.checked
        });
      break;
      case 'inputotro6':
        this.setState({
        inputotro6: e.target.checked
        });
      break;
      case 'inputotro7':
        this.setState({
        inputotro7: e.target.checked
        });
      break;
      }

  }

  render () {
    const { current } = this.state;
    return (
      <BaseLayout>
        <h2>Formulario de Propuesta</h2>
        <Button onClick={this.handleOnClose}>Close</Button>

              <div>
                  <Row className="steps-content">
                      {current == '0' && (
                          <div>
                              <Row>
                                  <Col md={4}/>
                                  <Col md={8} style={{paddingLeft:"20px"}}>
                                      <h1>Reg&iacute;strate: </h1>
                                  </Col>
                              </Row>
                              <Row>
                              <Col md={4}/>
                              <Col id="propcol1" md={8} >
                                  <Input className="inputprop" size="large" placeholder="Nombre:" />
                                  <Input className="inputprop" size="large" placeholder="Apellido:" />
                                  <Input className="inputprop" size="large" placeholder="Usuario:" />
                              </Col>
                              <Col id="propcol2" md={8} >
                                  <Input className="inputprop" size="large" placeholder="Password:" />
                                  <Input className="inputprop" size="large" placeholder="Email:" />
                                  <Input className="inputprop" size="large" placeholder="ZipCode:" />
                              </Col>
                              <Col md={4}/>
                              </Row>
                          </div>
                      )}
                      {current == '1' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿Eres Due&ntilde;o del terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop radioprop radiosi form1" onClick={() => this.sentencia(true)} value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" onClick={() => this.sentencia(false)} value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '2' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿Quieres proponer un terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop radioprop radiosi form1" onClick={() => this.sentencia(true)} value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" onClick={() => this.sentencia(false)} value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '3' && (
                          <div>
                              <Row>
                                  <Col md={8}/>
                                  <Col md={8} style={{paddingLeft:"20px"}}>
                                      <h1> ¿D&oacute;nde est&aacute; ubicado el terreno?</h1>
                                  </Col>
                              </Row>
                              <Row>
                              <Col md={8}/>
                              <Col md={8}>
                                  <h2>
                                    Empecemos ubicando tu terreno.
                                  <br/>
                                    Sigue el tutorial a continuaci&oacute;n.
                                    En el mapa seleccionaras tu terreno y luego contestaras una serie de preguntas una serie de preguntas para poder procesar tu selecci&oacute;n.
                                  </h2>
                              </Col>
                              </Row>
                          </div>
                      )}
                      {current == '4' && (
                          <div>
                              <Row>
                                  <Col md={8}/>
                                  <Col md={8} style={{paddingLeft:"20px"}}>
                                      <h1>¿Cu&aacute;l es el n&uacute;mero de catastro? </h1>
                                  </Col>
                              </Row>
                              <Row>
                                <Col md={8}/>
                                <Col id="propcol1" md={8} >
                                    <Input className="inputprop" size="large" placeholder="__/__/__/__"/>
                                </Col>
                              </Row>
                          </div>
                      )}
                      {current == '5' && (
                        <div>
                            <Row>
                                <Col md={8}/>
                                <Col md={8} style={{paddingLeft:"20px"}}>
                                    <h1>¿Telefono del due&ntilde;o (si tiene) (nombre completo) </h1>
                                </Col>
                            </Row>
                            <Row>
                              <Col md={8}/>
                              <Col id="propcol1" md={8} >
                                  <Input className="inputprop" size="large" placeholder="T:"/>
                                  <Input.TextArea className="inputprop" placeholder="N:"/>
                              </Col>
                            </Row>
                        </div>
                      )}
                      {current == '6' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿El due&ntilde;o del terreno es una sucesi&oacute;n?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                              <Radio.Group defaultValue="Si" buttonStyle="solid">
                                <Radio.Button className="inputprop radioprop radiosi form2" value="Si">Si</Radio.Button>
                                <Radio.Button className="inputprop radioprop radiono form2" value="No">No</Radio.Button>
                              </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
                              <h1>¿Todos los miembros están de acuerdo?</h1>
                            </Col>
                            <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
                              <Radio.Group defaultValue="Si" buttonStyle="solid">
                                <Radio.Button className="inputprop radioprop radiosi form3" value="Si">Si</Radio.Button>
                                <Radio.Button className="inputprop radioprop radiono form3" value="No">No</Radio.Button>
                              </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                      )}
                      {current == '7' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8}>
                              <h1>¿El terreno tiene alg&uacute;n problema?</h1>
                            </Col>
                            <Col md={8}>
                              <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                  <Col span={24}>
                                    <Checkbox value="A" className="inputprop radiobutton">Deuda en el CRIM</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B" className="inputprop radiobutton">Problemas legales</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C" className="inputprop radiobutton">Problemas de titularidad</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D" id="inputotro" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                {this.state.inputotro ? <Input className="inputprop" id="otro" size="large"/>: null}
                            </Col>
                            <Col md={4} />
                          </Row>
                        </div>
                      )}
                      {current == '8' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿Existe una hipoteca sobre el terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '9' && (
                        <div>
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
                        </div>
                      )}
                      {current == '10' && (
                        <div>
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
                        </div>
                      )}
                      {current == '11' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿Tienes las escrituras?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop radioprop radiosi form1" onClick={() => this.sentencia(true)} value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" onClick={() => this.sentencia(false)} value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '12' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8}>
                              <h1>¿Cu&aacute;les son los principales atributos que resaltan el valor para la conservaci&oacute;n de esta propiedad?</h1>
                            </Col>
                            <Col md={8}>
                              <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                  <Col span={24}>
                                    <Checkbox value="A" className="inputprop radiobutton">Naturaleza</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B" className="inputprop radiobutton">Educativos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C" className="inputprop radiobutton">Paisajistas y esc&eacute;nicos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D" id="inputotro3" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                {this.state.inputotro3 ? <Input className="inputprop" id="otro3" size="large"/>: null}
                            </Col>
                            <Col md={4} />
                          </Row>
                        </div>
                      )}
                      {current == '13' && (
                        <div>
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
                                    <Checkbox value="B" className="inputprop radiobutton">Eduativos / Recreativos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C" className="inputprop radiobutton">Paisajistas y esc&eacute;nicos</Checkbox>
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
                        </div>
                      )}
                      {current == '14' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿Existe una agrimensura del terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">

                                    <Radio.Button className="inputprop radioprop radiosi form1" onClick={() => this.sentencia(true)} value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" onClick={() => this.sentencia(false)} value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '15' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿El terreno ha tenido problemas de contaminaci&oacute;n en el pasado?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop radioprop radiosi form1" onClick={() => this.sentencia(true)} value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" onClick={() => this.sentencia(false)} value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '16' && (
                          <div>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿Conoces al due&ntilde;o(a) del terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop radioprop radiosi form1" onClick={() => this.sentencia(true)} value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" onClick={() => this.sentencia(false)} value="No">No</Radio.Button>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '17' && (
                        <div>
                            <Row>
                                <Col md={4}/>
                                <Col md={8} style={{paddingLeft:"20px"}}>
                                    <h1>Si contesta (si) llene el formulario </h1>
                                </Col>
                                <Col id="propcol1" md={8} >
                                    <Input className="inputprop" size="large" placeholder="Nombre:"/>
                                    <Input className="inputprop" size="large" placeholder="Tel:"/>
                                    <Input className="inputprop" size="large" placeholder="@:"/>
                                </Col>
                              <Col md={4}/>
                            </Row>
                        </div>
                      )}
                      {current == '18' && (
                          <div>
                            <h1>18</h1>
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿En qu&eacute; estado se encuentra el terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid" size="large">
                                    <Col md={24}>
                                      <Radio.Button className="inputprop radiobutton" value="Si">Abandono</Radio.Button>
                                    </Col>
                                    <Col md={24}>
                                      <Radio.Button className="inputprop radiobutton" value="No">Recibe Mantenimiento</Radio.Button>
                                    </Col>
                                  </Radio.Group>
                              </Col>
                              <Col md={4}/>
                            </Row>
                          </div>
                      )}
                      {current == '19' && (
                        <div>
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
                                    <Checkbox value="D" id="inputotro5" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                {this.state.inputotro5 ? <Input className="inputprop" id="otro5" size="large"/>: null}
                            </Col>
                            <Col md={4} />
                          </Row>
                        </div>
                      )}
                      {current == '20' && (
                        <div>
                            <Row>
                                <Col md={4}/>
                                <Col md={8} style={{paddingLeft:"20px"}}>
                                    <h1>¿Cu&aacute;l uso le dar&iacute;as al terreno?</h1>
                                    <h1>Explica brevemente</h1>
                                </Col>
                              <Col md={8} >
                                  <Input.TextArea className="inputprop" placeholder=""/>
                              </Col>
                              <Col md={4}/>
                            </Row>
                        </div>
                      )}
                      {current == '21' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8}>
                              <h1>¿Cu&aacute;les son los principales atributos que resaltan el valor para la conservaci&oacute;n de esta propiedad?</h1>
                            </Col>
                            <Col md={8}>
                              <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                  <Col span={24}>
                                    <Checkbox value="A" className="inputprop radiobutton">Naturales</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B" className="inputprop radiobutton">Educativos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C" className="inputprop radiobutton">Paisajistas y esc&eacute;nicos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D" id="inputotro6" className="inputprop radiobutton" onChange={this.mostrarinput}>Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                {this.state.inputotro6 ? <Input className="inputprop" id="otro6" size="large"/>: null}
                            </Col>
                            <Col md={4} />
                          </Row>
                        </div>
                      )}
                      {current == '22' && (
                          <div>
                              <Row>
                                  <Col md={4}/>
                                  <Col md={16} style={{textAlign:"center"}}>
                                      <Button className="inputprop buttonok" onClick={() => this.sentencia(true)} > SOMETE </Button>
                                  </Col>
                                  <Col md={4}/>
                              </Row>
                          </div>
                      )}
                      {current == '23' && (
                          <div>
                              <Row>
                                  <Col md={4}/>
                                  <Col md={8} style={{paddingLeft:"20px"}}>
                                      <h3>Gracias, estaremos evaluando tu propuesta.</h3>
                                      <h3>Recibiras confirmaci&oacute;n por correo electr&oacute;nico cuando este aprobada tu selecci&oacute;n.</h3>
                                      <h3>De tener alguna duda con su selecci&oacute;n para la Naturaleza se comunicar&aacute; con usted.</h3>
                                  </Col>
                                  <Col md={8} style={{textAlign:"center", marginTop:"20px"}}>
                                      <Button className="inputprop radiobutton buttonok" onClick={() => this.handleOnClose()}>VOLVER AL MAPA</Button>
                                  </Col>
                                <Col md={4}/>
                              </Row>
                          </div>
                      )}
                      {current == '24' && (
                        <div>
                          <Row>
                            <Col md={8}/>
                            <Col md={8}>
                              <h1>Vas a:</h1>
                                <h2>a. Donar un terreno</h2>
                                <h2>b. Proponer un terreno</h2>
                                <h2>c. Apoyar una propuesta existente</h2>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={4}/>
                            <Col md={16} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                  <Radio.Button className="inputprop radioprop radiosi form1 abcradio" value="a">a</Radio.Button>
                                  <Radio.Button className="inputprop radioprop radiosi form1 abcradio" value="b">b</Radio.Button>
                                  <Radio.Button className="inputprop radioprop radiosi form1 abcradio" value="c">c</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col md={4} />
                          </Row>
                        </div>
                      )}
                      {current == '25' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8}>
                              <h1>¿Cu&aacute;l es su meta a largo plazo con esta propiedad?</h1>
                            </Col>
                            <Col md={8}>
                              <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                  <Col span={24}>
                                    <Checkbox value="A" className="inputprop radiobutton">Opción 1</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B" className="inputprop radiobutton">Opción 2</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C" className="inputprop radiobutton">Opción 3</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D" className="inputprop radiobutton">Opción 4</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                            </Col>
                            <Col md={4} />
                          </Row>
                        </div>
                      )}
                      {current == '26' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿Qu&eacute; valor tiene ese lugar?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"left"}}>
                                <Radio.Group defaultValue="Si">
                                  <div style={{display:"flex"}}>
                                    <Radio value="Si" className="blockstyleradio" ></Radio>
                                    <div><h3>Tiene derecho a existir, independencia de su valor de m&iacute;.</h3></div>
                                  </div>
                                  <div style={{display:"flex", marginTop:"30px"}}>
                                    <Radio value="No" className="blockstyleradio" ></Radio>
                                    <div><h3>Valoro sus recursos aunque nunca llegue a usuarios.</h3></div>
                                  </div>
                                </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                      )}
                      {current == '27' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿Por qu&eacute; es importante saber que Utop&iacute;a existe?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"left"}}>
                                <Radio.Group defaultValue="Si">
                                  <div style={{display:"flex"}}>
                                    <Radio value="Si" className="blockstyleradio" ></Radio>
                                    <div><h3>Es importante que sus recursos apoyan la supervivencia de la flora y fauna de ese lugar.</h3></div>
                                  </div>
                                  <div style={{display:"flex", marginTop:"30px"}}>
                                    <Radio value="No" className="blockstyleradio" ></Radio>
                                    <div><h3>Es importante saber que ese lugar proporciona aire fresco y agua limpia a mi comunidad.</h3></div>
                                  </div>
                                </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                      )}
                      {current == '28' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿Primeras dos propuestas?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"left"}}>
                                <Radio.Group defaultValue="Si">
                                  <div style={{display:"flex"}}>
                                    <Radio value="Si" className="blockstyleradio" ></Radio>
                                    <div><h3>Grupos de vecinos#1.<br/>Proponemos que utop&iacute;a se mantenga cerrada al público con el fin de preservar sus cualidades y belleza natural.</h3></div>
                                  </div>
                                  <div style={{display:"flex", marginTop:"30px"}}>
                                    <Radio value="No" className="blockstyleradio" ></Radio>
                                    <div><h3>Grupos de vecinos#2.<br/>Proponemos que utop&iacute;a sea visitada por personas para fines de recreación y aprender sobre el medio ambiente.</h3></div>
                                  </div>
                              </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                      )}
                      {current == '29' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿Segundas dos propuestas?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"left"}}>
                                <Radio.Group defaultValue="Si">
                                  <div style={{display:"flex"}}>
                                    <Radio value="Si" className="blockstyleradio" ></Radio>
                                    <div><h3>Grupos de vecinos#3.<br/>Proponemos que utop&iacute;a se mantenga cerrada como una reserva biol&oacute;gica y que conserve su nombre actual pues ah&iacute; se capta la conexi&oacute;n simb&oacute;lica entre la montaña y la comunidad.</h3></div>
                                  </div>
                                  <div style={{display:"flex", marginTop:"30px"}}>
                                    <Radio value="No" className="blockstyleradio" ></Radio>
                                    <div><h3>Grupos de vecinos#4.<br/>Proponemos esperar hasta que utop&iacute;a se recupere del huracas con la opci&oacute;n de dar acceso en el futuro a personas de bajos recursos de nuestra comunidad para que puedan recolectar frutos del bosque y plantas medicinales, y madera para combustible o construcci&oacute;.</h3></div>
                                  </div>
                                </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                      )}
                      {current == '30' && (
                        <div>
                          <Row>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿Tercer grupo de propuestas?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"left"}}>
                                <Radio.Group defaultValue="Si">
                                  <div style={{display:"flex"}}>
                                    <Radio className="blockstyleradio" value="Si"></Radio>
                                    <div><h3>Grupos de vecinos#5.<br/>Proponemos preservar utop&iacute;a como un santuario natural cerrado al p&uacute;blico para conservar sus cualidades an&iacute;micas y conexi&oacute;n con el planeta.</h3></div>
                                  </div>
                                  <div style={{display:"flex", marginTop:"30px"}}>
                                    <Radio className="blockstyleradio" value="No"></Radio>
                                    <div><h3>Grupos de vecinos#6.<br/>Proponemos que utop&iacute;a se mantenga abierta para el beneficio uso y disfrute econ&oacute;mico, social y cultural de toda la comunidad.</h3></div>
                                  </div>
                                </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                      )}
                      </Row>
                      <div>
                      <Row className="steps-action">
                          {current == '0' && (
                            <Row>
                                <Col md={8}/>
                                <Col md={8} style={{textAlign:"center", padding:"20px"}} onClick={() => this.next()}>
                                    <Button className="btnprimary" size="large"> Someter </Button>
                                </Col>
                            </Row>
                          )}
                          {current < steps.length &&  current > 0 && current != 23 && current != 22 && current != 16 &&(
                              <Button type="primary" onClick={() => this.next()}>
                                  Next
                              </Button>
                          )}
                          {current > 0 && current != 23 && current != 22 &&(
                              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                  Previous
                              </Button>
                          )}
                      </Row>
                      </div>
              </div>
      </BaseLayout>
    );
  }
}

export default RegisterLandContainer;
