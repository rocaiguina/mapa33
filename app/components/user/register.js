import React from 'react';
import BaseLayout from '../layout/base';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Col, Input, Row, DatePicker, Select, Checkbox} from 'antd';

class Register extends React.Component {

  constructor(props) {
    super(props);
  }
  
  backPage = (event) => {
    window.history.back();
  } 
    
  render () {
      
    
    return (
        <BaseLayout
            header={
              <div className="page-title">
                <h2>FORMULARIO<br/>DE REGISTRO</h2>
                <ul className="actions">
                  <li>
                    <Button size="large" type="link" style={{color:"#000000"}} onClick={this.backPage}><Icon type="close"/></Button>
                  </li>
                </ul>
              </div>
            }
            
          >
            <div className="m33-wizard">
              <div className="m33-wizard-vcenter">
                <Row>
                    <Col md={15}>
                        <h1 style={{marginBottom:"25px"}}>Regístrate: </h1>
                        <Row>
                            <Col md={11}>
                                <Input
                                    name="name"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Nombre:"
                                />
                            </Col>
                            <Col md={2}></Col>
                            <Col md={11}>
                                <Input
                                    name="lastname"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Apellidos:"
                                /> 
                            </Col>                    
                        </Row>
                        <Row>
                            <Col md={11}>
                                <Input
                                    name="email"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Email:"
                                />
                            </Col>
                            <Col md={2}></Col>
                            <Col md={11}>
                                <Input
                                    name="phone"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Teléfono:"
                                />  
                            </Col>                    
                        </Row>
                        <Row>
                            <Col md={11}>
                                <DatePicker name="bthday"
                                className="inputprop"
                                size="large"
                                type="text"
                                style={{ width: '100%'}}
                                placeholder="*Fecha Nacimiento:"
                                 />
                            </Col>
                            <Col md={2}></Col>
                            <Col md={11}>
                                <Select
                                    name="sexo"
                                    className="inputprop"
                                    size="large"
                                    placeholder="Sexo:"
                                    style={{ width: '100%'}}
                                >                                
                                    <Option value="f">Femenino</Option>
                                    <Option value="m">Masculino</Option>                               
                                </Select>
                            </Col>                    
                        </Row>
                        <Row>
                            <Col md={11}>
                                <Input
                                    name="company"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="Compañia:"
                                />
                            </Col>
                            <Col md={2}></Col>
                            <Col md={11}></Col>                    
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Input
                                    name="street"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Dirección:"
                                />
                            </Col>                    
                        </Row>
                        
                        <Row>
                            <Col md={11}>
                                <Input
                                    name="city"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Ciudad:"
                                />
                            </Col>
                            <Col md={2}></Col>
                            <Col md={11}>
                                <Input
                                    name="state"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="Estado / Territorio:"
                                />
                            </Col>                    
                        </Row>
                        <Row>
                            <Col md={11}>
                                <Select
                                    name="country"
                                    className="inputprop"
                                    size="large"
                                    placeholder="*País:"
                                    style={{ width: '100%'}}
                                >
                                    <Option value="f">Pais 2</Option>
                                    <Option value="m">Pais 1</Option>                               
                                </Select>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={11}>
                                <Input
                                    name="codepos"
                                    className="inputprop"
                                    size="large"
                                    type="text"
                                    placeholder="*Código postal:"
                                />
                            </Col>                    
                        </Row>
                    
                    </Col>
                    <Col md={1}></Col>
                    <Col md={8}>
                        <Row>
                            <a>
                                <h3 style={{color:"#f576a9",fontWeight:"bold",textAlign:"right", marginBottom:"25px"}}>
                                    Ya estoy registrado/a
                                </h3>
                            </a>
                        </Row>
                        <h4>
                            Por favor, escriba abajo las letras de la imagen:            
                        </h4>
                        <Input
                            name="codepos"
                            className="inputprop"
                            size="large"
                            type="text"
                            style={{borderColor:"grey"}}
                            placeholder=""
                        />
                        
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                              <Col md={24}>
                                <Checkbox value="A" >
                                    <span className="checkboxregisuni">
                                        Deseo recibir promociones de Para la Naturaleza en mi correo electrónico
                                    </span>
                                </Checkbox>
                              </Col>                              
                              <Col md={24}>
                                <Checkbox value="B" >
                                    <span className="checkboxregisuni">
                                        Deseo recibir promociones de Para la Naturalesa en mi dirección postal
                                    </span>
                                </Checkbox>
                              </Col>                              
                              <Col md={24}>
                                <Checkbox value="C" >
                                    <span className="checkboxregisuni">
                                        He leído y acepto la <a>POLÍTICA DE PRIVACIDAD</a>
                                    </span>
                                </Checkbox>
                              </Col>                              
                              <Col md={24}>
                                <Checkbox value="D" >
                                    <span className="checkboxregisuni">
                                       Intereso ser voluntario / voluntaria
                                    </span>
                                </Checkbox>
                              </Col>
                              
                            </Row>
                        </Checkbox.Group>
                        <Row>
                            <Col md={12}></Col>
                            <Col md={12}>
                                <Button type="secondary" block >Registrar</Button>           
                            </Col>
                        </Row>
                    </Col>
                </Row>
              </div>
            </div>
        </BaseLayout>
    );                                                                                                                                                                                                                      
  }
}

export default Register;
