import React from 'react';
import BaseLayout from '../../components/layout/base';
import FrequentQuestions from '../../components/info/FrequentQuestions.js';
import ProposeButton from '../../components/map-view/ProposeButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class FQAsInfo extends React.Component {

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };
  render() {
    return (
      <BaseLayout 
        dark title="PREGUNTAS FRECUENTES"
        enableMenu
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <FrequentQuestions />
      </BaseLayout>
    );
  }
}

export default FQAsInfo;