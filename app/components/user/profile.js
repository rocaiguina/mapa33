import React from 'react';
import BaseLayout from '../layout/base';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Col, Input, Row, DatePicker, Select, Checkbox} from 'antd';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

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
                <h1 style={{color:"#fff"}}>Fulano de Tal Jímenez</h1>            
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
                    <Link
                        to="/"
                        style={{color: '#f576a9', fontWeight: 'bold', right:0}}
                    >
                        Editar
                    </Link>
                </span>                
            </div>
            <Row className="profileContent">
                <Col md={12}>
                    <Col md={12}>
                        <h3>Agosto 21,1989</h3>
                        <p>Nacimiento</p>
                    </Col>
                    <Col md={12}>
                        <h3>Monte North Garden, G110</h3>
                        <p>Dirección</p>
                    </Col>
                    <Col md={12}>
                        <h3>fulanodetal@gmail.com</h3>
                        <p>Correo Electrónico</p>
                    </Col>
                    <Col md={12}>
                        <h3>San Juan</h3>
                        <p>Ciudad</p>
                    </Col>
                    <Col md={12}>
                        <h3>787-000-000</h3>
                        <p>Teléfono</p>
                    </Col>
                    <Col md={12}>
                        <h3>No provisto</h3>
                        <p>Estado / Territorio</p>
                    </Col>
                    <Col md={12}>
                        <h3>Masculino</h3>
                        <p>Género</p>
                    </Col>
                    <Col md={12}>
                        <h3>Puerto Rico</h3>
                        <p>País</p>
                    </Col>
                    <Col md={12}>
                        <h3>No provisto</h3>
                        <p>Nombre de compañia</p>
                    </Col>
                    <Col md={12}>
                        <h3>00918</h3>
                        <p>Código postal</p>
                    </Col>                
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

export default Profile;
