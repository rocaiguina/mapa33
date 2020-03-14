import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import LoginForm from '../../components/auth/LoginForm';
import AuthApi from '../../api/auth';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class Login extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history } = this.props;
    AuthApi.login(values)
      .then(() => {
        history.push('/profile');
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
      <BaseLayout
        title="LOGIN"
        actions={[
          <Button key="1" size="large" type="link" onClick={this.handleOnClose}>
            <Icon type="close" />
          </Button>,
        ]}
      >
        <LoginForm onSubmit={this.handleOnSubmit} />
      </BaseLayout>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
