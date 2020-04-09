import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import Profile from '../../components/user/profile';
import AuthApi from '../../api/auth';
import UserApi from '../../api/user';

class ProfileUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        full_name: '',
        birthday: new Date(),
        email: '',
        phone: '',
        gender: '',
        company: '',
        address: '',
        city: '',
        estate: '',
        country: '',
        zip_code: '',
        advs_by_email: false,
        advs_by_zip: false,
        createdAt: null,
      },
    };
  }

  componentDidMount() {
    const self = this;
    UserApi.getProfile()
      .then(profile => {
        self.setState({
          initialValues: Object.assign({}, profile),
        });
      })
      .catch(err => {
        if (err.status == 401) {
          return self.props.history.replace('/login');
        }
        notification.error({
          message: 'Error',
          description:
            'No se logró recuperar los datos de tu perfil. Por favor intenta nuevamente.',
        });
      });
  }

  handleOnLogout = event => {
    event.preventDefault();
    AuthApi.logout()
      .then(() => {
        this.props.history.push('/');
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se logró cerrar tu sesión. Por favor intenta nuevamente.',
        });
      });
  };

  render() {
    return (
      <BaseLayout dark title="MI PERFÍL" enableMenu>
        <Profile
          initialValues={this.state.initialValues}
          onClickLogout={this.handleOnLogout}
        />
      </BaseLayout>
    );
  }
}

ProfileUser.propTypes = {
  history: PropTypes.object,
};

export default ProfileUser;
