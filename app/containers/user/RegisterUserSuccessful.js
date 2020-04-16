import React from 'react';
import { Link } from 'react-router-dom';

import BaseLayout from '../../components/layout/base';

class RegisterUserSuccessful extends React.Component {
  render() {
    const { location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const next = queryParams.get('next') || '/';
    return (
      <BaseLayout
        title="BIENVENIDO A MAPA33"
        showCloseBtn={false}
        enableMenu={false}
      >
        <div className="jumbotron text-center">
          <h1>Registro Satisfactorio</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit voluptatem
            debitis.
          </p>
          <Link
            to={next}
            className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
          >
            Continuar
          </Link>
        </div>
      </BaseLayout>
    );
  }
}

export default RegisterUserSuccessful;
