import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import ProfileForm from '../../components/user/ProfileForm';
import UserApi from '../../api/user';
import AuthService from '../../services/auth';

class ProfileUserEdit extends React.Component {
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
    if (AuthService.isUserLogged()) {
      UserApi.getProfile()
        .then(profile => {
          self.setState({
            initialValues: Object.assign({}, profile),
          });
        })
        .catch(err => {
          if (err.status == 401) {
            AuthService.logout();
            return self.props.history.push('/login');
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

  handleOnSubmit = (values, { setSubmitting }) => {
    const self = this;
    UserApi.updateProfile(values)
      .then(() => {
        setSubmitting(false);
        notification.success({
          message: 'Actualización satisfactoria',
          description: 'Se ha actualizado la información de tu perfil.',
        });
        self.props.history.push('/profile');
      })
      .catch(() => {
        setSubmitting(false);
        notification.error({
          message: 'Error',
          description:
            'No se logró actualizar tu información. Por favor intenta nuevamente.',
        });
      });
  };

  render() {
    return (
      <BaseLayout dark title="MI PERFÍL">
        <ProfileForm
          initialValues={this.state.initialValues}
          onSubmit={this.handleOnSubmit}
        />
      </BaseLayout>
    );
  }
}

ProfileUserEdit.propTypes = {
  history: PropTypes.object,
};

export default ProfileUserEdit;
