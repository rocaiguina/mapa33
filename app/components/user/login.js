import React from 'react';
import BaseLayout from '../layout/base';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Col, Input, Row, DatePicker, Select, Checkbox} from 'antd';

class Login extends React.Component {

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
                <h2>&nbsp;<br/>LOGIN</h2>
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
                    <Col md={6}></Col>
                    <Col md={12}>
                            <h4 style={{fontWeight:"bold",marginBottom: "35px"}}>
                                Por favor, escriba su correo electrónico y contraseña para continuar.            
                            </h4>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={20}>
                                <div style={{marginBottom: "15px"}}>
                                    <Input
                                        name="email"
                                        className="inputprop"
                                        size="large"
                                        type="text"
                                        placeholder="Correo electrónico"
                                    />
                                </div>
                                <div style={{marginBottom: "30px"}}>                                    
                                    <Input
                                        name="email"
                                        className="inputprop"
                                        size="large"
                                        type="password"
                                        placeholder="Contraseña"
                                    />
                                </div>
                                <Row>
                                    <Col md={12}>
                                        <a>
                                            <h3 style={{color:"#f576a9",fontWeight:"bold",textAlign:"left"}}>
                                                ¿Olvidó su contraseña?
                                            </h3>
                                        </a>
                                        <a>
                                            <h3 style={{color:"#f576a9",fontWeight:"bold",textAlign:"left"}}>
                                                Regístrate
                                            </h3>
                                        </a>
                                    </Col>
                                    <Col md={12} style={{textAlign:"right"}}>
                                        <Button type="secondary" size={"large"} style={{fontWeight: "600",fontSize: "16px"}} >Entrar</Button>           
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </Col>
                    <Col md={6}></Col>                        
                </Row>
              </div>
            </div>
        </BaseLayout>
    );                                                                                                                                                                                                                      
  }
}

export default Login;
