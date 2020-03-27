import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../../components/layout/base';

class RegisterLandSuccessful extends React.Component {
  render() {
    return (
      <BaseLayout
        title="REGISTRO SATISFACTORIO"
        showCloseBtn={true}
      >
        <div className="jumbotron text-center">
          <p className="lead">
            Gracias, estaremos evaluando tu propuesta.
          </p>
          <p className="lead">
            Recibiras confirmación por correo electrónico cuando este
            aprobada tu selección.
            <br />
            De tener alguna duda con su selección para la Naturaleza se
            comunicará con usted.
          </p>
          <Link
            to="/map"
            className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
          >
            VOLVER AL MAPA
          </Link>
        </div>
      </BaseLayout>
    );
  }
}

export default RegisterLandSuccessful;
