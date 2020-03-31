import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import RegisterWizard from '../../components/register-wizard';
import UserApi from '../../api/user';
import LandApi from '../../api/land';

class RegisterLand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      are_u_owner: null,
      catastro_number: '',
      owner_name: '',
      owner_email: '',
      owner_phone: '',
      inheritance_land: null,
      inheritance_agree: null,
      lands_problem: [],
      lands_other_problem: null,
      has_mortgage: null,
      has_surveying: null,
      lands_main_uses: [],
      lands_other_main_uses: null,
      lands_structures: [],
      lands_other_structures: null,
      lands_attributes: [],
      lands_other_attributes: null,
      has_contamination: null,
      wich_use: '',
      importance_of_knowing: '',
      want_propose: null,
      know_owner: null,
      geojson: null,
      plots_count: 0,
      area_size: 0,
      base64Img: '',
      land_name: '',
    };
  }

  componentDidMount() {
    const self = this;
    UserApi.getProfile()
      .then(profile => {
      })
      .catch(err => {
        return self.props.history.push('/login');
      });
  }

  handleOnSubmit = (values, { setSubmitting }) => {
    const { history } = this.props;
    LandApi.register(values)
      .then(() => {
        history.push('/register/success');
      })
      .catch((err) => {
        if (err.status == 401) {
          // TODO: Display a login popup.
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
      <RegisterWizard
        initialValues={this.state}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}

RegisterLand.propTypes = {
  history: PropTypes.object,
};

export default RegisterLand;
