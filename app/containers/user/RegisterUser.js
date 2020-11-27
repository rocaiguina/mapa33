import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import RegisterForm from '../../components/user/RegisterForm';
import Auth from '../../services/auth';
import UserApi from '../../api/user';
import { omit } from "lodash";

class RegisterUser extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { history, location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const {birthday_year, birthday_month, birthday_day} = values;
    const birthday = new Date(birthday_year, birthday_month, birthday_day);
    let userValues = {...values, birthday: birthday};
    userValues = omit(userValues, ["birthday_day", "birthday_month", "birthday_year"])

    UserApi.register(userValues)
      .then(user => {
        const next = queryParams.get('next') || '/';
        Auth.authenticate(user);
        history.push('/register/user/successful?next=' + next);
      })
      .catch(() => {
        setSubmitting(false);
        notification.error({
          message: 'Error',
          description:
            'No se logró registar tu cuenta. Por favor intenta nuevamente.',
        });
      });
  };

  render() {
    const { location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    return (
      <BaseLayout
        title="BIENVENIDO A MAPA33"
        showCloseBtn={true}
        enableMenu={false}
        className="main-relative-xs"
      >
        <RegisterForm
          onSubmit={this.handleOnSubmit}
          next={queryParams.get('next')}
        />
      </BaseLayout>
    );
  }
}

RegisterUser.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default RegisterUser;
