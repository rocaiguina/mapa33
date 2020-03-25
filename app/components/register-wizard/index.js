import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router';
import * as Yup from 'yup';
import { Wizard, Steps, Step } from 'react-albus';

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
import ReviewLandStep from './steps/ReviewLandStep';
import NameLandStep from './steps/NameLand';

const landValidationSchema = Yup.object().shape({
  land_name: Yup.string().required('Nombre del terreno requerido'),
});

class RegisterWizard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnNext = ({ step, push }, values) => {
    switch (step.id) {
      case 'are-you-owner':
        if (values.are_u_owner) {
          push('catastro-number');
        } else {
          push('know-owner');
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
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Wizard
              onNext={wizard => {
                this.handleOnNext(wizard, values);
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
                      next={next}
                      previous={previous}
                      setFieldValue={setFieldValue}
                    />
                  )}
                />
                <Step
                  id="review"
                  render={({ next, previous }) => (
                    <ReviewLandStep next={next} previous={previous} />
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
                    />
                  )}
                />

                {/* Owner Flow */}
                <Step
                  id="catastro-number"
                  render={({ next, previous }) => (
                    <CatastroNumberStep
                      catastro_number={values.catastro_number}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                    />
                  )}
                />
                <Step
                  id="owner-phone-number"
                  render={({ next, previous }) => (
                    <PhoneOwnerStep
                      owner_name={values.owner_name}
                      owner_phone={values.owner_phone}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
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
                    />
                  )}
                />
                <Step
                  id="contaminations"
                  render={({ next, previous }) => (
                    <ContaminationStep
                      has_contamination={values.has_contamination}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
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
                    />
                  )}
                />
                <Step
                  id="wich-uses"
                  render={({ next, previous }) => (
                    <WichUseStep
                      wich_use={values.wich_use}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
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
                    />
                  )}
                />
                <Step
                  id="summary"
                  render={({ next, previous }) => (
                    <SubmitStep
                      summary={values}
                      next={next}
                      previous={previous}
                      handleChange={handleChange}
                      isSubmitting={isSubmitting}
                    />
                  )}
                />
              </Steps>
            </Wizard>
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
