import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import AuthApi from '../../api/auth';

class ResetPassword extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history } = this.props;
    const { token } = this.props.match.params;
    AuthApi.resetPassword(token, values)
      .then(() => {
        history.push('/reset-password/successful');
      })
      .catch(err => {
        setSubmitting(false);
        if (err.status == 403) {
          notification.error({
            message: 'Error',
            description: 'Solicitud expirada. Por favor realiza una nueva.',
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
        title="RESTAURAR CONTRASEÑA"
        showCloseBtn={true}
        enableMenu={false}
      >
        <ResetPasswordForm onSubmit={this.handleOnSubmit} />
      </BaseLayout>
    );
  }
}

ResetPassword.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default ResetPassword;
