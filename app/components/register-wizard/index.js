import React from 'react';
import { withRouter } from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Step from './Step';
import RegisterStep from './steps/RegisterStep';
import AreYouOwnerStep from './steps/AreYouOwnerStep';
import ProposeLandStep from './steps/ProposeLandStep';
import PhoneOwnerStep from './steps/PhoneOwnerStep';
import InheritanceLandStep from './steps/InheritanceLandStep';
import InheritanceAgreeStep from './steps/InheritanceAgreeStep';
import ProblemLandStep from './steps/ProblemLandStep';
import MortgageStep from './steps/MortgageStep';
import MainUsesStep from './steps/MainUsesStep';
import HowManyStructuresStep from './steps/HowManyStructuresStep';
import MainAttributesStep from './steps/MainAttributesStep';
import SurveyingStep from './steps/SurveyingStep';
import ContaminationStep from './steps/ContaminationStep';
import KnowOwnerStep from './steps/KnowOwnerStep';
import YesFillFormStep from './steps/YesFillFormStep';
import WichUseStep from './steps/WichUseStep';
import SubmitStep from './steps/SubmitStep';
import ImportanceOfKnowingStep from './steps/ImportanceOfKnowingStep';
import CatastroNumberStep from './steps/CatastroNumberStep';
import MapStep from './steps/MapStep';

class RegisterWizard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnSubmit = (values) => {
    this.props.onSubmit(values);
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
        }}
        validationSchema={Yup.object().shape({
            u_name: Yup.string()
                .required('Nombre(s) requerido(s)'),
            u_lastname: Yup.string()
                .required('Apellido(s) requerido(s)'),
            u_username: Yup.string()
                .required('Nombre de usuario requerido'),
            u_email: Yup.string()
                .email('Correo inválido')
                .required('Correo requerido'),
            u_password: Yup.string()
                .min(6, 'Debe tener más de 6 carácteres')
                .required('Contraseña requerida'),
            u_zip:  Yup.string()
                .required('CodeZip requerido'),
            catastro_number: Yup.string()
                .required('Número de Catastro requerido'),
            owner_name: Yup.string(),
            owner_phone: Yup.string(),
        })}
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
                <Route path={`${match.path}/propose`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ProposeLandStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/map`}>
                  <MapStep basename={match.path} history={history} formik={formik} />
                </Route>
                <Route path={`${match.path}/owner`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<AreYouOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>


                {/* Owner Flow */}
                <Route path={`${match.path}/catastro-number`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<CatastroNumberStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/owner-phone`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<PhoneOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/inheritance`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<InheritanceLandStep basename={match.path} history={history} formik={formik} />}
                  />
                </Route>
                <Route path={`${match.path}/inheritance-agree`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<InheritanceAgreeStep basename={match.path} history={history} formik={formik} />}
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
                <Route path={`${match.path}/surveying`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<SurveyingStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                {/* End Owner Flow */}


                {/* NO Owner Flow */}
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
                {/* End NO Owner Flow */}

                {/* Common Steps */}
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
                <Route path={`${match.path}/contamination`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<ContaminationStep basename={match.path} history={history} formik={formik} />}
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
                <Route path={`${match.path}/wichuse`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    component={<WichUseStep basename={match.path} history={history} formik={formik} />}
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
              {/* End Common Steps */}
              </Switch>
            </form>
          )
        }
      </Formik>
    )
  }
}

export default withRouter(RegisterWizard);
