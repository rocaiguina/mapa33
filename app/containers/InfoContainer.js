import React from 'react';
import BaseLayout from '../components/layout/base';
import Info from '../components/info';

class InfoContainer extends React.Component {
  render() {
    return (
      <BaseLayout dark>
        <Info />
      </BaseLayout>
    );
  }
}

export default InfoContainer;
