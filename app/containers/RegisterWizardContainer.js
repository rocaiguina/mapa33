import React from 'react';
import { Button } from 'antd';
import Icon from '../components/ui/Icon';
import BaseLayout from '../components/layout/base';
import RegisterWizard from '../components/register-wizard';

class WizardContainer extends React.Component {

  handleOnSubmit = (data) => {
    const { history } = this.props;
    setTimeout(function () {
      history.push('/register/success');
    }, 1000);
  }

  render () {
    return (
      <RegisterWizard
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}

export default WizardContainer;
