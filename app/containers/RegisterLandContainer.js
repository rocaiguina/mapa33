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

];


class RegisterLandContainer extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          visible: false,
          current: 0
      };
  }

  handleOnClose = (event) => {
    this.props.history.push('/mymap');
  }

  next() {
      const current = this.state.current + 1;
      this.setState({ current });
  }

  prev() {
      const current = this.state.current - 1;
      this.setState({ current });
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
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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
                                  </h2>
                                  <h2>
                                    Sigue el tutorial a continuaci&oacute;n.
                                    En el mapa seleccionaras tu terreno y luego contestaras una serie de preguntas una serie de preguntas para poder procesar tu selecci&oacute;.
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
                                    <Checkbox value="A">Deuda en el CRIM</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Problemas legales</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Problemas de titularidad</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                    <Checkbox value="A">Residencial</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Comercial</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Natural / Bosque</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                    <Checkbox value="A">Residencial</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Comercial / Oficina</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Agr&iacute;cola</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otras</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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
                                    <Checkbox value="A">Naturaleza</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Educativos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Paisajistas y esc&eacute;nicos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                    <Checkbox value="A">Hist&oacute;rico / Culturales</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Eduativos / Recreativos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Paisajistas y esc&eacute;nicos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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
                                    <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                    <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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
                            <Row>
                              <Col md={4}/>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                  <h1>
                                    ¿En qu&eacute; estado se encuentra el terreno?
                                  </h1>
                              </Col>
                              <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                  <Radio.Group defaultValue="Si" buttonStyle="solid">
                                    <Radio.Button className="inputprop " value="Si">Abandono</Radio.Button>
                                    <Radio.Button className="inputprop " value="No">Recibe Mantenimiento</Radio.Button>
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
                                    <Checkbox value="A">Residencial</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Comercial</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Natural / Bosque</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                    <Checkbox value="A">Naturales</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="B">Educativos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="C">Paisajistas y esc&eacute;nicos</Checkbox>
                                  </Col>
                                  <Col span={24}>
                                    <Checkbox value="D">Otros</Checkbox>
                                  </Col>
                                </Row>
                              </Checkbox.Group>
                                <Input />
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
                                      <Button> SOMETE </Button>
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
                                      <h1>Gracias, estaremos evaluando tu propuesta.</h1>
                                      <h1>Recibiras confirmaci&oacute;n por correo electr&oacute;nico cuando este aprobada tu selecci&oacute;n.</h1>
                                      <h1>De tener alguna duda con su selecci&oacute;n para la Naturaleza se comunicar&aacute; con usted.</h1>
                                  </Col>
                                <Col id="propcol1" md={8} >
                                    <Button>Volver al mapa</Button>
                                </Col>
                                <Col md={4}/>
                              </Row>
                          </div>
                      )}
                      {current == '24' && (
                        <div>
                          <Row style={{marginTop: "20px"}}>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center"}}>
                              <h1>Si contest&oacute; si,¿Cu&aacute;l es la fecha?</h1>
                            </Col>
                            <Col md={8} style={{textAlign:"center"}} className="spacecalendar">
                              <DatePicker defaultValue={moment(new Date(), dateFormatList[0])} format={dateFormatList} className="inputprop inputCalendar" />
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
                          {current < steps.length - 1 &&  current > 0 &&(
                              <Button type="primary" onClick={() => this.next()}>
                                  Next
                              </Button>
                          )}
                          {current === steps.length - 1 && (
                              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                  Done
                              </Button>
                          )}
                          {current > 0 && (
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
