import React from 'react';
import Button from '../ui/Button';
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
import PruebaTour from './steps/PruebaTour';

class RegisterWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        step: 1
    }
  }

  handleOnSubmit = (values) => {
    this.props.onSubmit(values);
  }

  handleOnClose = (e) => {
    this.props.history.push('/map');
  }

  render () {
    const { match, history, step } = this.props;
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
          plots_count: 0,
          area_size: 0,
          base64Img: '',
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
            // catastro_number: Yup.string()
            //     .required('Número de Catastro requerido'),
            // owner_name: Yup.string(),
            // owner_phone: Yup.string(),
            // owner_email: Yup.string()
            //     .email('Correo inválido'),
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
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                        size="large"
                        className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                        style={{ fontSize: '16px',borderRadius:"15px !important" }}
                        type="secondary"
                        bordered>
                        1/17
                      </Button>
                      </div>}
                    component={<RegisterStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}

                  />
                </Route>
                <Route path={`${match.path}/propose`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                        size="large"
                        className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                        style={{ fontSize: '16px',borderRadius:"15px !important" }}
                        type="secondary"
                        bordered>
                        2/17
                      </Button>
                      </div>}
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
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          4/17
                        </Button>
                      </div>
                    }
                    component={<AreYouOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>


                {/* Owner Flow */}
                <Route path={`${match.path}/catastro-number`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>5/17</span> : <span>5/11</span>}
                        </Button>
                      </div>
                    }
                    component={<CatastroNumberStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/owner-phone`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder"><Button
                        size="large"
                        className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                        style={{ fontSize: '16px',borderRadius:"15px !important" }}
                        type="secondary"
                        bordered>
                        {formik.values.are_u_owner ? <span>6/17</span> : <span>6/11</span>}
                      </Button>
                      </div>
                    }
                    component={<PhoneOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/inheritance`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>7/17</span> : <span>7/11</span>}
                        </Button></div>
                    }
                    component={<InheritanceLandStep basename={match.path} history={history} formik={formik} />}
                  />
                </Route>
                <Route path={`${match.path}/inheritance-agree`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>8/17</span> : <span>8/11</span>}
                        </Button>
                      </div>
                    }
                    component={<InheritanceAgreeStep basename={match.path} history={history} formik={formik} />}
                  />
                </Route>
                <Route path={`${match.path}/problem`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>9/17</span> : <span>9/11</span>}
                        </Button>
                      </div>
                    }
                    component={<ProblemLandStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/mortgage`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>10/17</span> : <span>10/11</span>}
                        </Button>
                      </div>
                    }
                    component={<MortgageStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/surveying`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>11/17</span> : <span>11/11</span>}
                        </Button>
                      </div>
                    }
                    component={<SurveyingStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                {/* End Owner Flow */}


                {/* NO Owner Flow */}
                <Route path={`${match.path}/knowowner`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner ? <span>5/17</span> : <span>5/11</span>}
                        </Button>
                      </div>
                    }
                    component={<KnowOwnerStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/yesfillform`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.know_owner ? <span>6/12</span> : <span>5/11</span>}
                        </Button>
                      </div>
                    }
                    component={<YesFillFormStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                {/* End NO Owner Flow */}

                {/* Common Steps */}
                <Route path={`${match.path}/mainuses`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner  ? <span>12/17</span>: formik.values.know_owner ? <span>7/12</span> : <span>6/11</span> }
                        </Button>
                      </div>
                    }
                    component={<MainUsesStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/howmanystructures`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner  ? <span>13/17</span> : formik.values.know_owner ? <span>8/12</span> : <span>7/11</span> }
                        </Button>
                      </div>
                    }
                    component={<HowManyStructuresStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/mainattributes`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner  ? <span>14/17</span> : formik.values.know_owner ? <span>9/12</span> : <span>8/11</span> }
                        </Button>
                      </div>
                    }
                    component={<MainAttributesStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/contamination`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner  ? <span>15/17</span> : formik.values.know_owner ? <span>10/12</span> : <span>9/11</span> }
                        </Button>
                      </div>
                    }
                    component={<ContaminationStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/importanceofknowing`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                         {formik.values.are_u_owner  ? <span>16/17</span> : formik.values.know_owner ? <span>11/12</span> : <span>10/11</span>}
                        </Button>
                      </div>
                    }
                    component={<ImportanceOfKnowingStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/wichuse`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                          {formik.values.are_u_owner  ? <span>17/17</span> : formik.values.know_owner ? <span>12/12</span> : <span>11/11</span> }
                        </Button>
                      </div>
                    }
                    component={<WichUseStep basename={match.path} history={history} formik={formik} />}
                    onClose={this.handleOnClose}
                  />
                </Route>
                <Route path={`${match.path}/submit`}>
                  <Step
                    title={<h2>Formulario de<br/>Propuesta</h2>}
                    footerRightComponent={
                      <div className="stepguideborder">
                        <Button
                          size="large"
                          className="stepguide ant-btn m33-btn ant-btn-lg ant-btn-background-blackstep"
                          style={{ fontSize: '16px',borderRadius:"15px !important" }}
                          type="secondary"
                          bordered>
                        </Button>
                      </div>
                    }
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
