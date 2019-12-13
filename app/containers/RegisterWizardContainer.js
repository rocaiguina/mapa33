import React from 'react';
import Axios from 'axios';
import { Button } from 'antd';
import Icon from '../components/ui/Icon';
import BaseLayout from '../components/layout/base';
import RegisterWizard from '../components/register-wizard';

class WizardContainer extends React.Component {

  handleOnSubmit = (data) => {
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

    Axios
      .post('/api/land', {
        geom,
        metadata,
      })
      .then(response => {
        history.push('/register/success');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    return (
      <RegisterWizard
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}

export default WizardContainer;
