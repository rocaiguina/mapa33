import React from 'react';
import BaseLayout from '../layout/base';
import {
  Button,
  Col,
  Input,
  Row,
  DatePicker,
  Select,
  Checkbox,
  Typography,
} from 'antd';

class Contact extends React.Component {

  render () {
    return (
        <div className="contactstyle" >
            <Row>
                <Col md={4}></Col>
                <Col md={20}>
                    <div>
                        <h3>Para la Naturaleza</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={8}>
                    
                    <div>
                        <h4>Oficina Central</h4>
                        <p>(787) 722-5834</p>
                        <p>info@paralanaturaleza.org</p>
                        <p>Lunes – Viernes 9:00am a 5:30pm</p>
                        <br/>
                    </div>
                    <div>
                        <h4>Reservaciones</h4>
                        <p>(787) 722-5882</p>                    
                        <p>Lunes – Viernes 9:00am a 5:30pm</p>
                        <p>Sábado: (787) 722-5834 x242</p>
                        <br/>
                        <p>Reservaciones en línea</p>
                        <p>reservaciones@paralanaturaleza.org</p>
                        <br/>
                    </div>
                </Col>
                <Col md={8}>
                    <div>
                        <h4>AMIGOS Para la Naturaleza</h4>
                        <p>(787) 722-5844</p>
                        <p>Lunes – Viernes 9:00am a 5:30pm</p>
                        <p>Membresías en línea amigos@paralanaturaleza.org</p>
                    </div>
                </Col>
            </Row>
        </div>
        
    );
  }
}
export default Contact;