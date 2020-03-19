import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import RecoveryPasswordForm from '../../components/auth/RecoveryPasswordForm';
import AuthApi from '../../api/auth';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class RecoveryPassword extends React.Component {
  handleOnClose = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <BaseLayout
        title="RECUPERAR CONTRASEÑA"
        showCloseBtn={true}
        enableMenu={false}
      >
        <div className="main-content m-t-20">
          <RecoveryPasswordForm />
        </div>
      </BaseLayout>
    );
  }
}

export default RecoveryPassword;
