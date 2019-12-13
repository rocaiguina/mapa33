import React from 'react';
import { Button, Col, Row } from 'antd';
import Icon from '../components/ui/Icon';
import BaseLayout from '../components/layout/base';

class RegisterContainer extends React.Component {

  handleOnClose = (event) => {
    this.props.history.push('/map');
  }

  render () {
    return (
      <BaseLayout
        header={
          <div className="page-title">
            <h2>FORMULARIO<br/>DE PROPUESTA</h2>
            <ul className="actions">
              <li>
                <Button size="large" type="link" onClick={this.handleOnClose}><Icon type="close"/></Button>
              </li>
            </ul>
          </div>
        }
      >
        <div className="m33-wizard">
          <div className="m33-wizard-vcenter">
            <div className="m-t-20">
              <Row>
                <Col md={8}/>
                <Col md={8} style={{textAlign:"center"}}>
                    <h3>Gracias, estaremos evaluando tu propuesta.</h3>
                    <h3>Recibiras confirmación por correo electrónico cuando este aprobada tu selección.</h3>
                    <h3>De tener alguna duda con su selección para la Naturaleza se comunicará con usted.</h3>
                    <br/>
                    <Button className="inputprop radiobutton buttonok" onClick={() => this.handleOnClose()}>VOLVER AL MAPA</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default RegisterContainer;
