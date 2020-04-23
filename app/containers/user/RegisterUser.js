import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import RegisterForm from '../../components/user/RegisterForm';
import UserApi from '../../api/user';

class RegisterUser extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history, location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    UserApi.register(values)
      .then(() => {
        const next = queryParams.get('next') || '/';
        history.push('/register/user/successful?next=' + next);
      })
      .catch(() => {
        setSubmitting(false);
        notification.error({
          message: 'Error',
          description:
            'No se logró registar tu cuenta. Por favor intenta nuevamente.',
        });
      });
  };

  render() {
    const { location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    return (
      <BaseLayout
        title="BIENVENIDO A MAPA33"
        showCloseBtn={true}
        enableMenu={false}
        className="main-relative-xs"
      >
        <RegisterForm
          onSubmit={this.handleOnSubmit}
          next={queryParams.get('next')}
        />
      </BaseLayout>
    );
  }
}

RegisterUser.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default RegisterUser;
