import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import Profile from '../../components/user/profile';
import AuthApi from '../../api/auth';
import UserApi from '../../api/user';
import AuthService from '../../services/auth';

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
        proposed_areas: 0,
        approved_areas: 0,
        supported_areas: 0,
      },
    };
  }

  componentDidMount() {
    const self = this;
    if (AuthService.isUserLogged()) {
      UserApi.getProfile()
        .then(profile => {
          self.setState({
            initialValues: Object.assign({}, profile),
          });
        })
        .catch(err => {
          if (err.status == 401) {
            AuthService.logout();
            return self.props.history.replace('/register/user?next=/profile');
          }
          notification.error({
            message: 'Error',
            description:
              'No se logró recuperar los datos de tu perfil. Por favor intenta nuevamente.',
          });
        });
    } else {
      return self.props.history.replace('/register/user?next=/profile');
    }
  }

  handleOnLogout = event => {
    event.preventDefault();
    AuthApi.logout()
      .then(() => {
        AuthService.logout();
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
      <BaseLayout dark title="MI PERFÍL" enableMenu closeLink="/">
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
