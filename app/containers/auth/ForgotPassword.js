import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import AuthApi from '../../api/auth';

class ForgotPassword extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history } = this.props;
    AuthApi.forgotPassword(values)
      .then(() => {
        history.push('/forgot-password/successful');
      })
      .catch(err => {
        setSubmitting(false);
        if (err.status == 404) {
          notification.error({
            message: 'Error',
            description: 'Por favor verifica tu dirección de correo electrónico.',
          });
        } else {
          notification.error({
            message: 'Error',
            description:
              'No se logró realizar tu solicitud. Por favor intenta nuevamente.',
          });
        }
      });
  };

  render() {
    return (
      <BaseLayout
        title="RECUPERAR CONTRASEÑA"
        showCloseBtn={true}
        enableMenu={false}
      >
        <div className="main-content m-t-20">
          <ForgotPasswordForm onSubmit={this.handleOnSubmit} />
        </div>
      </BaseLayout>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object,
};

export default ForgotPassword;
