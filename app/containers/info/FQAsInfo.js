import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import FrequentQuestions from '../../components/info/frequentquestions.js';
import ProposeButton from '../../components/map-view/ProposeButton';

class FQAsInfo extends React.Component {
  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };
  render() {
    return (
      <BaseLayout
        dark
        title="PREGUNTAS FRECUENTES"
        enableMenu
        className="main-auto-height"
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <FrequentQuestions />
      </BaseLayout>
    );
  }
}

FQAsInfo.propTypes = {
  history: PropTypes.object,
};

export default FQAsInfo;
