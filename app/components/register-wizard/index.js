import React from 'react';
import { withRouter } from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Formik } from 'formik';
import Step from './Step';
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

  handleOnClose = (e) => {
    this.props.history.push('/map');
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
          geojson: null,
        }}
        onSubmit={this.handleOnSubmit}
      >
        {
          (formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Switch>
                <Route exact path={match.path}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<RegisterStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/owner`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<AreYouOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>

                {/* Owner Flow */}
                <Route path={`${match.path}/catastronumber`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<CatastroNumberStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/phoneowner`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<PhoneOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/succession`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<OwnerSuccessionStep basename={match.path} history={history} formik={formik} />}
                  />
                </Route>
                <Route path={`${match.path}/problem`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ProblemLandStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/mortgage`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<MortgageStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/document`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<DocumentStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/surveying`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<SurveyingStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/mainuses`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<MainUsesStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/howmanystructures`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<HowManyStructuresStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/mainattributes`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<MainAttributesStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/historicuses`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<HistoricUsesStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/contamination`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ContaminationStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                {/* End Owner Flow */}

                {/* NO Owner Flow */}
                <Route path={`${match.path}/propose`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ProposeLandStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/location`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<LocationStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/map`}>
                  <MapStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/knowowner`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<KnowOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/yesfillform`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<YesFillFormStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/stateland`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<StateLandStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/mainuses`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<MainUsesStep basename={match.path} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                {/* End NO Owner Flow */}

                {/* Common steps */}
                <Route path={`${match.path}/wichuse`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<WichUseStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                 <Route path={`${match.path}/valueplace`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ValuePlaceStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/importanceofknowing`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ImportanceOfKnowingStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/firstproposals`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<FirstProposalsStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/secondproposals`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<SecondProposalsStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/thirdproposals`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ThirdProposalsStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/submit`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<SubmitStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
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
