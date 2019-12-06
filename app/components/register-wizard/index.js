import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';

import RegisterStep from './steps/RegisterStep';
import AreYouOwnerStep from './steps/AreYouOwnerStep';
import CatastroNumberStep from './steps/CatastroNumberStep';
import ProposeLandStep from './steps/ProposeLandStep';

class RegisterWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isOwner: false,
      isProposing: false,
    };
  }



  render () {
    return (
      <h2>WIZARD HERE</h2>
    )
  }
}

export default RegisterWizard;