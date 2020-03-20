import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../../components/layout/base';

class ResetPasswordSuccessful extends React.Component {
  render() {
    return (
      <BaseLayout
        title="RESTAURAR CONTRASEÑA"
        showCloseBtn={true}
        enableMenu={false}
      >
        <div className="main-content m-t-20">
          <div className="jumbotron text-center">
            <p>Tu contraseña ha sido restaurada.</p>
            <Link
              to="/login"
              className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default ResetPasswordSuccessful;
