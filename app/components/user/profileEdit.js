import React from 'react';
import BaseLayout from '../layout/base';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Col, Input, Row, DatePicker, Select, Checkbox} from 'antd';
import { Link } from 'react-router-dom';

import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


class ProfileEdit extends React.Component {

  constructor(props) {
    super(props);
  }
  
  backPage = (event) => {
    window.history.back();
  } 
    
  render () {
      
    
    return ( 
        <div className="container" style={{paddingLeft:"0px", paddingRight:"0px"}}>
            <div className="page-title profiletitle" style={{borderBottomColor: "#fff" }}>
            <span className="leftblockprofile" >
                <Input
                    name="username"
                    className="inputprop blackstyleinput"
                    size="large"
                    type="text"
                    defaultValue="Fulano de Tal Jímenez"
                />        
                <h4 style={{color:"#fff"}}>Registrado desde: Febrero 2019</h4>
            </span>
            <span className="rightblockprofile" >
                <Link
                  to="/"
                  style={{color: '#f576a9', fontWeight: 'bold' }}
                >
                  Log Out
                </Link>
            </span>            
            </div>
            <div>
                <span className="leftblockprofile">
                    <h3 style={{fontWeight:900, color: "#fff"}}>Datos</h3>
                </span>
                
                <span className="rightblockprofile" style={{textAlign: "right", marginTop:0}}>
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-background-ghost"
                      htmlType="submit"
                      style={{marginLeft: "5px"}}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-purple"
                      htmlType="submit"
                      style={{marginLeft: "5px"}}
                    >
                      Guardar Cambios
                    </Button>
                </span>                
            </div>
            <Row className="profileContent">
                <Col md={12}>
                    <Row>
                    <Col md={12}>
                        <DatePicker
                            name="birthday"
                            className="inputprop blackstyleinput"
                            size="large"
                            type="text"
                            style={{ width: '100%' }}
                            defaultValue={moment('1989/08/21', dateFormat)} format={dateFormat}
                            
                          />
                        <p>Nacimiento</p>
                    </Col>
                    <Col md={12}>
                        <Input
                            name="address"
                            className="inputprop  blackstyleinput"
                            size="large"
                            type="text"
                            defaultValue="Monte North Garden, G110"
                        />
                        <p>Dirección</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={12}>
                        <Input
                            name="email"
                            className="inputprop  blackstyleinput"
                            size="large"
                            type="text"
                            value="fulanodetal@gmail.com"
                        />
                        <p>Correo Electrónico</p>
                    </Col>
                    <Col md={12}>
                        <Input
                            name="city"
                            className="inputprop blackstyleinput"
                            size="large"
                            type="text"
                            defaultValue="San Juan"
                        />
                        <p>Ciudad</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={12}>
                        <Input
                            name="phone"
                            className="inputprop blackstyleinput"
                            size="large"
                            type="text"
                            defaultValue="787-000-000"
                        />
                        <p>Teléfono</p>
                    </Col>
                    <Col md={12}>
                        <Input
                            name="state"
                            className="inputprop blackstyleinput"
                            size="large"
                            type="text"
                            defaultValue="No provisto"
                        />
                        <p>Estado / Territorio</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={12}>
                        <Select
                            name="gender"
                            className="inputprop blackstyleinput"
                            size="large"
                            style={{ width: '100%' }}
                            defaultValue="M"
                          >
                            <Option value="F" >Femenino</Option>
                            <Option value="M" >Masculino</Option>
                          </Select>
                        <p>Género</p>
                    </Col>
                    <Col md={12} >
                        <Select
                            name="country"
                            className="inputprop blackstyleinput"
                            size="large"
                            style={{ width: '100%' }}
                            defaultValue="Puerto Rico" 
                          >
                            <Option value="Bolivia">Bolivia</Option>
                            <Option value="Puerto Rico">Puerto Rico</Option>
                          </Select>
                        <p>País</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={12}>
                        <Input
                            name="company"
                            className="inputprop blackstyleinput"
                            size="large"
                            type="text"
                            defaultValue="No provisto"
                        />
                        <p>Nombre de compañia</p>
                    </Col>
                    <Col md={12}>
                        <Input
                            name="zipCode"
                            className="inputprop blackstyleinput"
                            size="large"
                            type="text"
                            defaultValue="00918"
                        />
                        <p>Código postal</p>
                    </Col>    
                    </Row>
                </Col>
                
                <Col md={12} >
                    <Row style={{borderBottom:"1px dotted #fff"}}>
                        <Col md={12} className="blockprofilecheckbox">
                            <div className="form-check">
                                <Checkbox
                                  name="advs_by_email"
                                  defaultChecked={false}
                                  style={{color: "#fff"}}
                                >
                                  Deseo recibir promociones de Para la Naturaleza en mi correo
                                  electrónico
                                </Checkbox>
                              </div>
                              <div className="form-check">
                                <Checkbox
                                  name="advs_by_zip"
                                  defaultChecked={false}
                                  style={{color: "#fff"}}
                                >
                                  Deseo recibir promociones de Para la Naturaleza en mi
                                  dirección postal
                                </Checkbox>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h3 style={{fontWeight:900, color: "#fff"}}>Áreas Propuestas</h3>
                            <Row>
                                <Col md={12} sm={24} xs={24} className="toptableprofile">
                                <h2 style={{color: "#fff"}}>21 <span>Áreas propuestas</span></h2>
                                </Col>
                                <Col md={12} sm={12} xs={12} className="lefttableprofile">
                                <h2 style={{color: "#f576a9"}}>8 <span>Áreas aceptadas</span></h2>
                                </Col>
                                <Col md={12} sm={12} xs={12} className="righttableprofile">
                                <h2 style={{color: "#f576a9"}}>120 <span>Áreas apoyadas</span></h2>
                                </Col>
                                <Col md={12} sm={12}>
                                </Col>                                
                            </Row>
                    </Row>
                </Col>
            </Row>
        </div>
          
    );                                                                                                                                                                                                                      
  }
}

export default ProfileEdit;
