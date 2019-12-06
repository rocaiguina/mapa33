import React from 'react';
import { Button } from 'antd';
import Icon from '../components/ui/Icon';
import BaseLayout from '../components/layout/base';
import RegisterWizard from '../components/register-wizard';

class RegisterContainer extends React.Component {

  handleOnClose = (event) => {
    this.props.history.push('/map');
  }

  render () {
    return (
      <BaseLayout>
        <div className="m-t-20">
          <div className="page-title">
            <h2>Formulario de Propuesta</h2>
            <Button size="large" type="link" onClick={this.handleOnClose}><Icon type="close"/></Button>
          </div>
        </div>
        <RegisterWizard/>
      </BaseLayout>
    );
  }
}

export default RegisterContainer;
