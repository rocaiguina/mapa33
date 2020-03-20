import React from 'react';
import { notification } from 'antd';
import BaseLayout from '../../components/layout/base';
import ProfileForm from '../../components/user/ProfileForm';
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
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se logró recuperar los datos de tu perfil. Por favor intenta nuevamente.',
        });
      });
  }

  handleOnSubmit = (values, { setSubmitting }) => {
    UserApi.updateProfile(values)
      .then(() => {
        setSubmitting(false);
        notification.success({
          message: 'Actualización satisfactoria',
          description: 'Se ha actualizado la información de tu perfil.',
        });
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
        <div className="main-content m-t-10">
          <ProfileForm
            initialValues={this.state.initialValues}
            onSubmit={this.handleOnSubmit}
          />
        </div>
      </BaseLayout>
    );
  }
}

export default ProfileUser;
