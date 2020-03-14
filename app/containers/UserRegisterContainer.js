import React from 'react';
import BaseLayout from '../components/layout/base';
import RegisterForm from '../components/user/RegisterForm';

class UserRegisterContainer extends React.Component {
  handleOnSubmit = (values, {setSubmitting}) => {
    // TODO: Make ajax call here.
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  render () {
    return (
      <BaseLayout>
        <RegisterForm
          onSubmit={this.handleOnSubmit}
        />
      </BaseLayout>
    );
  }
}

export default UserRegisterContainer;
