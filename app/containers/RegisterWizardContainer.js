import React from 'react';
import Axios from 'axios';
import RegisterWizard from '../components/register-wizard';

class WizardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      are_u_owner: null,
      catastro_number: '',
      owner_phone: '',
      owner_name: '',
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
      wich_use: null,
      importance_of_knowing: '',
      want_propose: null,
      know_owner: null,
      owner_email: '',
      geojson: null,
      plots_count: 0,
      area_size: 0,
      base64Img: '',
      land_name: '',
    };
  }

  handleOnSubmit = data => {
    const { history } = this.props;

    const geom = data.geojson.geometry;
    const metadata = {
      u_name: data.u_name,
      u_lastname: data.u_lastname,
      u_username: data.u_username,
      u_password: data.u_password,
      u_email: data.u_email,
      u_zip: data.u_zip,
      are_u_owner: data.are_u_owner,
      catastro_number: data.catastro_number,
      owner_phone: data.owner_phone,
      owner_name: data.owner_name,
      inheritance_land: data.inheritance_land,
      inheritance_agree: data.inheritance_agree,
      lands_problem: data.lands_problem,
      lands_other_problem: data.lands_other_problem,
      has_mortgage: data.has_mortgage,
      has_surveying: data.has_surveying,
      lands_main_uses: data.lands_main_uses,
      lands_other_main_uses: data.lands_other_main_uses,
      lands_structures: data.lands_structures,
      lands_other_structures: data.lands_other_structures,
      lands_attributes: data.lands_attributes,
      lands_other_attributes: data.lands_other_attributes,
      has_contamination: data.has_contamination,
      wich_use: data.wich_use,
      importance_of_knowing: data.importance_of_knowing,
      want_propose: data.want_propose,
      know_owner: data.know_owner,
      owner_email: data.owner_email,
    };

    Axios.post('/api/land', {
      level: 'basic',
      status: 'new',
      base64Img: data.base64Img,
      plots_count: data.plots_count,
      area_size: data.area_size,
      geom,
      metadata,
    })
      .then(response => {
        console.log(response);
        history.push('/register/success');
      })
      .catch(err => {
        window.alert('Error on register land: ' + err);
      });
  };

  render() {
    return <RegisterWizard onSubmit={this.handleOnSubmit} />;
  }
}

export default WizardContainer;
