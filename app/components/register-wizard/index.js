import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';

import RegisterStep from './steps/RegisterStep';
import AreYouOwnerStep from './steps/AreYouOwnerStep';
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
      <Wizard> 
        <Steps>
          <Step id="register" render={(wizard) => (<RegisterStep wizard={wizard}/>)} />
          <Step id="owner" render={(wizard) => (<AreYouOwnerStep wizard={wizard}/>)}/>
          <Step id="propose" render={(wizard) => (<ProposeLandStep wizard={wizard}/>)} />
        </Steps>
      </Wizard>
    )
  }
}

export default RegisterWizard;