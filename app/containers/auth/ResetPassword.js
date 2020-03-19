import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import AuthApi from '../../api/auth';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class ResetPassword extends React.Component {
  handleOnClose = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <BaseLayout
        title="LOGIN"
        showCloseBtn={true}
        enableMenu={false}
      >
        <div className="main-content m-t-20">
          <ResetPasswordForm />
        </div>
      </BaseLayout>
    );
  }
}

export default ResetPassword;
