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
      <BaseLayout
        header={
          <div className="page-title">
            <h2>FORMULARIO<br/>DE PROPUESTA</h2>
            <ul className="actions">
              <li>
                <Button size="large" type="link" onClick={this.handleOnClose}><Icon type="close"/></Button>
              </li>
            </ul>
          </div>
        }
      >
        <div className="m33-wizard">
          <div className="m33-wizard-vcenter">
            <RegisterWizard/>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default RegisterContainer;
