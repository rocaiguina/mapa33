import React from 'react';
import { Button } from 'antd';
import Icon from '../components/ui/Icon';
import BaseLayout from '../components/layout/base';
import RegisterWizard from '../components/register-wizard';

class WizardContainer extends React.Component {

  render () {
    return (
      <RegisterWizard/>
    );
  }
}

export default WizardContainer;
