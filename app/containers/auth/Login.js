import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import LoginForm from '../../components/auth/LoginForm';
import Auth from '../../services/auth';

class Login extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history, location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    Auth.login(values)
      .then(() => {
        const next = queryParams.get('next') || '/profile';
        history.push(next);
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Autenticación inválida. Por favor intenta nuevamente.',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  handleOnClose = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <BaseLayout title="LOGIN" showCloseBtn={true} enableMenu={false}>
        <LoginForm onSubmit={this.handleOnSubmit} />
      </BaseLayout>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default Login;
