import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
// eslint-disable-next-line node/no-extraneous-import
import { withRouter } from 'react-router';
import * as Yup from 'yup';
import { Modal } from 'antd';
import { Wizard, Steps, Step } from 'react-albus';

import AreYouOwnerStep from './steps/AreYouOwnerStep';
import ProposeLandStep from './steps/ProposeLandStep';
import InheritanceLandStep from './steps/InheritanceLandStep';
import InheritanceAgreeStep from './steps/InheritanceAgreeStep';
import ProblemLandStep from './steps/ProblemLandStep';
import MortgageStep from './steps/MortgageStep';
import MainUsesStep from './steps/MainUsesStep';
import HowManyStructuresStep from './steps/HowManyStructuresStep';
import AlreadyProposedUsesStep from './steps/AlreadyProposedUsesStep';
import MainAttributesStep from './steps/MainAttributesStep';
import SurveyingStep from './steps/SurveyingStep';
import ContaminationStep from './steps/ContaminationStep';
import KnowOwnerStep from './steps/KnowOwnerStep';
import YesFillFormStep from './steps/YesFillFormStep';
import WhichUseStep from './steps/WhichUseStep';
import SubmitStep from './steps/SubmitStep';
import ImportanceOfKnowingStep from './steps/ImportanceOfKnowingStep';
import CatastroNumberStep from './steps/CatastroNumberStep';
import MapStep from './steps/MapStep';
import ReviewLandStep from './steps/ReviewLandStep';
import ImportanceProtectionStep from './steps/ImportanceProtectionStep';
import NameLandStep from './steps/NameLand';

const landValidationSchema = Yup.object().shape({
  land_name: Yup.string().required('Nombre del terreno requerido'),
});

class RegisterWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lots: [],
      visibleCloseModal: false,
    };
  }

  handleOnChangeLand = (data, setFieldValue) => {
    this.setState({
      lots: data.lots,
    });
    let location = '';
    if (data.lands.length > 0) {
      location = data.lands[0]['municipality'];
    }
    let catastro_numbers = [];
    data.lands.forEach(item => {
      catastro_numbers.push(item.catastro);
    });
    setFieldValue('lands', data.lands);
    setFieldValue('location', location);
    setFieldValue('catastro_numbers', catastro_numbers);
    setFieldValue('coordinates', data.coordinates.geometry);
    setFieldValue('geojson', data.geojson);
    setFieldValue('plots_count', data.lots.length);
    setFieldValue('area_size', data.geojson.properties.area);
  };

  handleOnRenderMap = (data, setFieldValue) => {
    setFieldValue('base64Img', data);
  };

  handleOnNext = ({ step, push }, values, setFieldValue) => {
    switch (step.id) {
      case 'propose-land':
        if (values.want_propose !== null && !values.want_propose) {
          const { history } = this.props;
          history.replace('/');
        } else {
          push();
        }
        break;
      case 'are-you-owner':
        if (values.are_u_owner) {
          setFieldValue('owner_name', values.user.full_name);
          setFieldValue('owner_email', values.user.email);
          setFieldValue('owner_phone', values.user.phone);
          push('catastro-number');
        } else {
          push('know-owner');
        }
        break;
      case 'inheritance':
        if (values.inheritance_land === false) {
          push('problem');
        } else {
          push();
        }
        break;
      case 'survey':
        push('main-uses');
        break;
      case 'know-owner':
        if (values.know_owner) {
          push();
        } else {
          push('main-uses');
        }
        break;
      default:
        push();
        break;
    }
    console.log(step, values);
  };

  handleOnClose = () => {
    this.setState({
      visibleCloseModal: true,
    });
  };

  handleConfirmClose = () => {
    // Redirect to map.
    const { history } = this.props;
    history.push('/');
  };

  handleCancelClose = () => {
    this.setState({
      visibleCloseModal: false,
    });
  };

  render() {
    const { match, history } = this.props;
    return (
      <Formik
        initialValues={this.props.initialValues}
        enableReinitialize
        onSubmit={this.props.onSubmit}
        validationSchema={landValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="fit">
            <Wizard
              onNext={wizard => {
                this.handleOnNext(wizard, values, setFieldValue);
              }}
              history={history}
              basename={match.path}
            >
              <Steps>
                <Step
                  id="propose-land"
                  render={({ next, previous }) => (
                    <ProposeLandStep
                      want_propose={values.want_propose}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                    />
                  )}
                />
                <Step
                  id="map"
                  render={({ next, previous }) => (
                    <MapStep
                      lots={this.state.lots}
                      next={next}
                      previous={previous}
                      onChange={data => {
                        this.handleOnChangeLand(data, setFieldValue);
                      }}
                      onRenderMinimap={base64 => {
                        this.handleOnRenderMap(base64, setFieldValue);
                      }}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="review"
                  render={({ next, previous }) => (
                    <ReviewLandStep
                      lands={values.lands}
                      area={values.area_size}
                      location={values.location}
                      photograph={values.base64Img}
                      next={next}
                      previous={previous}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="importance-protection"
                  render={({ next, previous }) => (
                    <ImportanceProtectionStep
                      importance_of_protection={values.importance_of_protection}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="importance"
                  render={({ next, previous }) => (
                    <ImportanceOfKnowingStep
                      importance_of_knowing={values.importance_of_knowing}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="are-you-owner"
                  render={({ next, previous }) => (
                    <AreYouOwnerStep
                      are_u_owner={values.are_u_owner}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      onClose={this.handleOnClose}
                    />
                  )}
                />

                {/* Owner Flow */}
                <Step
                  id="catastro-number"
                  render={({ next, previous }) => (
                    <CatastroNumberStep
                      catastro_numbers={values.catastro_numbers}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="inheritance"
                  render={({ next, previous }) => (
                    <InheritanceLandStep
                      inheritance_land={values.inheritance_land}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="inheritance-agreement"
                  render={({ next, previous }) => (
                    <InheritanceAgreeStep
                      inheritance_agree={values.inheritance_agree}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="problem"
                  render={({ next, previous }) => (
                    <ProblemLandStep
                      lands_problem={values.lands_problem}
                      lands_other_problem={values.lands_other_problem}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="mortgage"
                  render={({ next, previous }) => (
                    <MortgageStep
                      has_mortgage={values.has_mortgage}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="survey"
                  render={({ next, previous }) => (
                    <SurveyingStep
                      has_surveying={values.has_surveying}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />

                {/* NO Owner Flow */}
                <Step
                  id="know-owner"
                  render={({ next, previous }) => (
                    <KnowOwnerStep
                      know_owner={values.know_owner}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="owner-data"
                  render={({ next, previous }) => (
                    <YesFillFormStep
                      owner_email={values.owner_email}
                      owner_phone={values.owner_phone}
                      owner_name={values.owner_name}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />

                {/* Common Steps */}
                <Step
                  id="main-uses"
                  render={({ next, previous }) => (
                    <MainUsesStep
                      lands_main_uses={values.lands_main_uses}
                      lands_other_main_uses={values.lands_other_main_uses}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="how-many-structures"
                  render={({ next, previous }) => (
                    <HowManyStructuresStep
                      lands_structures={values.lands_structures}
                      lands_other_structures={values.lands_other_structures}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="already-proposed-uses"
                  render={({ next, previous }) => (
                    <AlreadyProposedUsesStep
                      has_already_proposed_uses={
                        values.has_already_proposed_uses
                      }
                      proposed_uses_description={
                        values.proposed_uses_description
                      }
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="main-attributes"
                  render={({ next, previous }) => (
                    <MainAttributesStep
                      lands_attributes={values.lands_attributes}
                      lands_other_attributes={values.lands_other_attributes}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="contaminations"
                  render={({ next, previous }) => (
                    <ContaminationStep
                      has_contamination={values.has_contamination}
                      contamination_description={
                        values.contamination_description
                      }
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="which-uses"
                  render={({ next, previous }) => (
                    <WhichUseStep
                      which_uses={values.which_uses}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="land"
                  render={({ next, previous }) => (
                    <NameLandStep
                      land_name={values.land_name}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
                <Step
                  id="summary"
                  render={({ next, previous }) => (
                    <SubmitStep
                      name={values.land_name}
                      photograph={values.base64Img}
                      owner={values.owner_name}
                      importance_of_protection={values.importance_of_protection}
                      location={values.location}
                      main_attributes={values.lands_attributes}
                      other_main_attributes={values.lands_other_attributes}
                      main_uses={values.lands_main_uses}
                      other_main_uses={values.lands_other_main_uses}
                      proposed_uses={values.which_uses}
                      area_size={values.area_size}
                      plots_count={values.plots_count}
                      coordinates={values.coordinates}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      isSubmitting={isSubmitting}
                      onClose={this.handleOnClose}
                    />
                  )}
                />
              </Steps>
            </Wizard>
            <Modal
              title="Propuesta"
              closable={false}
              onOk={this.handleConfirmClose}
              onCancel={this.handleCancelClose}
              okText="Si"
              cancelText="No"
              visible={this.state.visibleCloseModal}
              okButtonProps={{ shape: 'round', className: 'ant-btn-purple' }}
              cancelButtonProps={{ shape: 'round' }}
            >
              <p>¿Estas seguro que quieres cerrar el formulario?</p>
            </Modal>
          </form>
        )}
      </Formik>
    );
  }
}

RegisterWizard.propTypes = {
  initialValues: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default withRouter(RegisterWizard);
