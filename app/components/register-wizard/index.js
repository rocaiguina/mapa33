import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';

import RegisterStep from './steps/RegisterStep';
import AreYouOwnerStep from './steps/AreYouOwnerStep';
import ProposeLandStep from './steps/ProposeLandStep';
import LocationStep from './steps/LocationStep';
import PhoneOwnerStep from './steps/PhoneOwnerStep';
import OwnerSuccessionStep from './steps/OwnerSuccessionStep';
import ProblemLandStep from './steps/ProblemLandStep';
import MortgageStep from './steps/MortgageStep';
import MainUsesStep from './steps/MainUsesStep';
import HowManyStructuresStep from './steps/HowManyStructuresStep';
import DocumentStep from './steps/DocumentStep';
import MainAttributesStep from './steps/MainAttributesStep';
import HistoricUsesStep from './steps/HistoricUsesStep';
import SurveyingStep from './steps/SurveyingStep';
import ContaminationStep from './steps/ContaminationStep';
import KnowOwnerStep from './steps/KnowOwnerStep';
import YesFillFormStep from './steps/YesFillFormStep';
import StateLandStep from './steps/StateLandStep';
import WichUseStep from './steps/WichUseStep';
import SubmitStep from './steps/SubmitStep';
import LastStep from './steps/LastStep';
import YoulGoingStep from './steps/YoulGoingStep';
import LongTermGoalStep from './steps/LongTermGoalStep';
import ValuePlaceStep from './steps/ValuePlaceStep';
import ImportanceOfKnowingStep from './steps/ImportanceOfKnowingStep';
import FirstProposalsStep from './steps/FirstProposalsStep';
import SecondProposalsStep from './steps/SecondProposalsStep';
import ThirdProposalsStep from './steps/ThirdProposalsStep';
import CatastroNumberStep from './steps/CatastroNumberStep';

import MapStep from './steps/MapStep';

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
          <Step id="location" render={(wizard) => (<LocationStep wizard={wizard}/>)} />
          <Step id="catastronumber" render={(wizard) => (<CatastroNumberStep wizard={wizard}/>)} />
          <Step id="phoneowner" render={(wizard) => (<PhoneOwnerStep wizard={wizard}/>)} />
          <Step id="succession" render={(wizard) => (<OwnerSuccessionStep wizard={wizard}/>)} />
          <Step id="problem" render={(wizard) => (<ProblemLandStep wizard={wizard}/>)} />
          <Step id="mortgage" render={(wizard) => (<MortgageStep wizard={wizard}/>)} />
          <Step id="mainuses" render={(wizard) => (<MainUsesStep wizard={wizard}/>)} />
          <Step id="howmanystructures" render={(wizard) => (<HowManyStructuresStep wizard={wizard}/>)} />
          <Step id="document" render={(wizard) => (<DocumentStep wizard={wizard}/>)} />
          <Step id="mainattributes" render={(wizard) => (<MainAttributesStep wizard={wizard}/>)} />
          <Step id="historicuses" render={(wizard) => (<HistoricUsesStep wizard={wizard}/>)} />
          <Step id="surveying" render={(wizard) => (<SurveyingStep wizard={wizard}/>)} />
          <Step id="contamination" render={(wizard) => (<ContaminationStep wizard={wizard}/>)} />
          <Step id="knowowner" render={(wizard) => (<KnowOwnerStep wizard={wizard}/>)} />
          <Step id="yesfillform" render={(wizard) => (<YesFillFormStep wizard={wizard}/>)} />
          <Step id="stateland" render={(wizard) => (<StateLandStep wizard={wizard}/>)} />
          <Step id="wichuse" render={(wizard) => (<WichUseStep wizard={wizard}/>)} />
          <Step id="youlgoing" render={(wizard) => (<YoulGoingStep wizard={wizard}/>)} />
          <Step id="longtermgoal" render={(wizard) => (<LongTermGoalStep wizard={wizard}/>)} />
          <Step id="valueplace" render={(wizard) => (<ValuePlaceStep wizard={wizard}/>)} />
          <Step id="importanceofknowing" render={(wizard) => (<ImportanceOfKnowingStep wizard={wizard}/>)} />
          <Step id="firstproposals" render={(wizard) => (<FirstProposalsStep wizard={wizard}/>)} />
          <Step id="secondproposals" render={(wizard) => (<SecondProposalsStep wizard={wizard}/>)} />
          <Step id="thirdproposals" render={(wizard) => (<ThirdProposalsStep wizard={wizard}/>)} />
          { /* <Step id="map" render={(wizard) => (<MapStep wizard={wizard}/>)} /> */ }
          { /* <Step id="submit" render={(wizard) => (<SubmitStep wizard={wizard}/>)} /> */}
          <Step id="laststep" render={(wizard) => (<LastStep wizard={wizard}/>)} />
        </Steps>
      </Wizard>
    )
  }
}

export default RegisterWizard;
