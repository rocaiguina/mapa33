import React from 'react';
import { Card, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

class Menu extends React.Component {
    constructor (props) {
        super(props);
    }
    
    aboutMenu = (event) => {
        window.location.href = '/info'; 
    }
    render () {
      console.log('entro en about')
        return (
            <div className="menublock">
                <Row>
                  <Col lg={24}>           
                      <div style={{borderBottom: "white dotted 1px"}}>
                        <Button type="simplebtn" onClick={this.aboutMenu}>Sobre Mapa 33</Button>
                      </div>
                      <div style={{borderBottom: "white dotted 1px"}}>
                        <Button type="simplebtn" >Mapa Inicial</Button>
                      </div>
                      <div style={{borderBottom: "white dotted 1px"}}>
                        <Button type="simplebtn" >Listado de áreas</Button>
                      </div>
                      <div >
                        <Button type="simplebtn" >Proponer área</Button>
                      </div>
                  </Col>
                </Row>
            </div>
        );
    }
}

export default Menu;
