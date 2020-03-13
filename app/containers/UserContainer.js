import React from 'react';
import BaseLayout from '../components/layout/base';
import User from '../components/user';

class UserContainer extends React.Component {

  render () {
    return (
      <BaseLayout >
        <User/>
      </BaseLayout>
    );
  }
}

export default UserContainer;