import React from 'react';
import { notification } from 'antd';
import BaseLayout from '../../components/layout/base';
import Profile from '../../components/user/profile';
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

  render() {
    return (
      <BaseLayout dark title="MI PERFÍL">
        <div className="main-content m-t-10">
          <Profile initialValues={this.state.initialValues}/>
        </div>
      </BaseLayout>
    );
  }
}

export default ProfileUser;
