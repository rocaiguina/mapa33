import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import BaseLayout from '../../components/layout/base';

class RegisterLandSuccessful extends React.Component {
  render() {
    return (
      <BaseLayout title="REGISTRO SATISFACTORIO" showCloseBtn={true}>
        <div className="jumbotron text-center">
          <p className="lead">¡Gracias por unirte a la meta común.!</p>
          <Row>
            <Col md={{ offset: 6, span: 12 }}>
              <p className="lead">
                Ahora nuestro equipo evaluará tu propuesta.
                <br />
                Verifica tu correo electrónico para nuestras notificaciones sobre el
                proceso de evaluación y aprobación de propuesta.
              </p>
            </Col>
          </Row>
          <Link
            to="/map"
            className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
          >
            Volver al Mapa
          </Link>
        </div>
      </BaseLayout>
    );
  }
}

export default RegisterLandSuccessful;
