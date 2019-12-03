import React from 'react';
import { Button } from 'antd';
import BaseLayout from '../components/layout/base';

class RegisterLandContainer extends React.Component {

  handleOnClose = (event) => {
    this.props.history.push('/mymap');
  }

  render () {
    return (
      <BaseLayout>
        <h2>Formulario de Propuesta</h2>
        <Button onClick={this.handleOnClose}>Close</Button>
      </BaseLayout>
    );
  }
}

export default RegisterLandContainer;