import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import RegisterWizard from '../../components/register-wizard';
import LandApi from '../../api/land';
import AuthService from '../../services/auth';

class RegisterLand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      are_u_owner: null,
      catastro_numbers: [],
      owner_name: '',
      owner_email: '',
      owner_phone: '',
      lands_main_uses: [],
      lands_other_main_uses: null,
      lands_structures: [],
      lands_other_structures: null,
      lands_attributes: [],
      lands_other_attributes: null,
      has_already_proposed_uses: null,
      proposed_uses_description: null,
      has_contamination: null,
      contamination_description: null,
      has_controversies: null,
      controversies_description: null,
      which_uses: [],
      importance_of_protection: '',
      importance_of_knowing: '',
      want_propose: null,
      know_owner: null,
      geojson: null,
      plots_count: 0,
      area_size: 0,
      base64Img: '',
      land_name: '',
      lands: [],
      coordinates: {},
      location: '',
      user: null,
    };
  }

  componentDidMount() {
    const self = this;
    if (AuthService.isUserLogged()) {
      const user = AuthService.getLoggedUser();
      this.setState({
        user,
      });
      // UserApi.getProfile()
      //   .then(profile => {
      //     this.setState({
      //       user: profile,
      //     });
      //   })
      //   .catch(err => {
      //     if (err.status == 401) {
      //       AuthService.logout();
      //       logout();
      //       return self.props.history.replace(
      //         '/register/user?next=/register/propose-land'
      //       );
      //     }
      //     notification.error({
      //       message: 'Error',
      //       description:
      //         'No se logró recuperar los datos de tu perfil. Por favor intenta nuevamente.',
      //     });
      //   });
    } else {
      return self.props.history.replace(
        '/register/user?next=/register/propose-land'
      );
    }
  }

  handleOnSubmit = (values, { setSubmitting }) => {
    const { history } = this.props;
    LandApi.register(values)
      .then(() => {
        history.push('/register/success');
      })
      .catch(err => {
        if (err.status == 401) {
          // TODO: Display a login popup.
          AuthService.logout();
          history.push('/login');
        } else {
          setSubmitting(false);
          notification.error({
            message: 'Error',
            description:
              'No se logró registar tu propuesta. Por favor intenta nuevamente.',
          });
        }
      });
  };

  render() {
    return (
      this.state.user && (
        <RegisterWizard
          initialValues={this.state}
          onSubmit={this.handleOnSubmit}
        />
      )
    );
  }
}

RegisterLand.propTypes = {
  history: PropTypes.object,
};

export default RegisterLand;
