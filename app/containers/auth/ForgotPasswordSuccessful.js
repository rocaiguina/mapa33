import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../../components/layout/base';

class ForgotPasswordSuccessful extends React.Component {
  render() {
    return (
      <BaseLayout
        title="RECUPERAR CONTRASEÑA"
        showCloseBtn={true}
        enableMenu={false}
      >
        <div className="jumbotron text-center">
          <p className="lead">
            Gracias, verifique su correo electrónico para recuperar su
            contraseña.
          </p>
          <Link
            to="/login"
            className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
          >
            Volver al inicio
          </Link>
        </div>
      </BaseLayout>
    );
  }
}

export default ForgotPasswordSuccessful;
