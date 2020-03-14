import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import RegisterForm from '../../components/user/RegisterForm';
import UserApi from '../../api/user';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class RegisterUser extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history } = this.props;
    UserApi.register(values)
      .then(() => {
        history.push('/register/user/successful');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se logró registar tu cuenta. Por favor intenta nuevamente.',
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
        title="BIENVENIDO A MAPA33"
        actions={[
          <Button key="1" size="large" type="link" onClick={this.handleOnClose}>
            <Icon type="close" />
          </Button>,
        ]}
      >
        <RegisterForm onSubmit={this.handleOnSubmit} />
      </BaseLayout>
    );
  }
}

RegisterUser.propTypes = {
  history: PropTypes.object,
};

export default RegisterUser;
