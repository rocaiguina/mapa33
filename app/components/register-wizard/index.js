import React from 'react';
import { withRouter } from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Formik } from 'formik';
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
  }

  handleOnSubmit = (values) => {
    console.log(values);
  }

  render () {
    const { match, history } = this.props;
    return (
      <Formik
        initialValues={{
          u_name: '',
          u_lastname: '',
          u_username: '',
          u_password: '',
          u_email: '',
          u_zip: '',
          are_u_owner: null,
          catastro_number: '',
          owner_phone: '',
          owner_name: '',
          owner_succession: null,
          owner_members_agree: null,
          lands_problem: [],
          lands_other_problem: null,
          has_mortgage: null,
          has_documents: null,
          has_surveying: null,
          lands_main_uses: [],
          lands_other_main_uses: null,
          lands_structures: [],
          lands_other_structures: null,
          lands_attributes: [],
          lands_other_attributes: null,
          lands_historic_uses: [],
          lands_other_historic_uses: null,
          has_contamination: null,
          wich_use: '',
          value_place: '',
          importance_of_knowing: '',
          first_proposals: '',
          second_proposals: '',
          third_proposals: '',

          want_propose: null,
          know_owner: null,
          owner_email: '',
          land_status: '',
        }}
        onSubmit={this.handleOnSubmit}
      >
        {
          (formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Switch>
                <Route exact path={match.path}>
                  <RegisterStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/owner`}>
                  <AreYouOwnerStep basename={match.path} history={history} formik={formik} />
                </Route>

                {/* Owner Flow */}
                <Route path={`${match.path}/catastronumber`}>
                  <CatastroNumberStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/phoneowner`}>
                  <PhoneOwnerStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/succession`}>
                  <OwnerSuccessionStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/problem`}>
                  <ProblemLandStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/mortgage`}>
                  <MortgageStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/document`}>
                  <DocumentStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/surveying`}>
                  <SurveyingStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/mainuses`}>
                  <MainUsesStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/howmanystructures`}>
                  <HowManyStructuresStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/mainattributes`}>
                  <MainAttributesStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/historicuses`}>
                  <HistoricUsesStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/contamination`}>
                  <ContaminationStep basename={match.path} history={history} formik={formik} />
                </Route>
                {/* End Owner Flow */}

                {/* NO Owner Flow */}
                <Route path={`${match.path}/propose`}>
                  <ProposeLandStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/location`}>
                  <LocationStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/map`}>
                  <MapStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/knowowner`}>
                  <KnowOwnerStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/yesfillform`}>
                  <YesFillFormStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/stateland`}>
                  <StateLandStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/mainuses`}>
                  <MainUsesStep basename={match.path} />
                </Route>
                {/* End NO Owner Flow */}

                {/* Common steps */}
                <Route path={`${match.path}/wichuse`}>
                  <WichUseStep basename={match.path} history={history} formik={formik} />
                </Route>
                 <Route path={`${match.path}/valueplace`}>
                  <ValuePlaceStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/importanceofknowing`}>
                  <ImportanceOfKnowingStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/firstproposals`}>
                  <FirstProposalsStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/secondproposals`}>
                  <SecondProposalsStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/thirdproposals`}>
                  <ThirdProposalsStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/submit`}>
                  <SubmitStep basename={match.path} history={history} formik={formik} />
                </Route>
              </Switch>
            </form>
          )
        }
      </Formik>
    )
  }
}

export default withRouter(RegisterWizard);
