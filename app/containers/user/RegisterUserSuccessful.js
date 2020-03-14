import React from 'react';
import { Link } from 'react-router-dom';

import BaseLayout from '../../components/layout/base';

function RegisterUserSuccessful() {
  return (
    <BaseLayout title="BIENVENIDO A MAPA33">
      <div className="jumbotron text-center m-t-20">
        <h1>Registro Satisfactorio</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit voluptatem
          debitis.
        </p>
        <Link
          to="/login"
          className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
        >
          Iniciar Sesión
        </Link>
      </div>
    </BaseLayout>
  );
}

export default RegisterUserSuccessful;
