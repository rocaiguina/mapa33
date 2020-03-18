import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import RecoveryPasswordSuccess from '../../components/auth/RecoveryPasswordSuccess';
import AuthApi from '../../api/auth';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class SuccessRecoveryPassword extends React.Component {
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
          <RecoveryPasswordSuccess />
        </div>
      </BaseLayout>
    );
  }
}

export default SuccessRecoveryPassword;
