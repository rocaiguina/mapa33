import React from 'react';
import { Link } from 'react-router-dom';

import BaseLayout from '../../components/layout/base';

function RegisterUserSuccessful() {
  return (
    <BaseLayout>
      <div className="jumbotron text-center m-t-20">
        <h1>Bienvenido a Mapa33</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit voluptatem
          debitis.
        </p>
        <Link to="/login" className="ant-btn">
          Iniciar Sesión
        </Link>
      </div>
    </BaseLayout>
  );
}

export default RegisterUserSuccessful;
