import React from 'react';
import BaseLayout from '../components/layout/base';
import Intro from '../components/intro';
import ModalPropuesta from '../components/ModalPropuesta';

class IntroContainer extends React.Component {

  handleOnEndIntro = () => {
    this.props.history.push('/map');
  }

  render () {
    return (
      <BaseLayout dark>
        <Intro onEnd={this.handleOnEndIntro}/>
        <ModalPropuesta/>
      </BaseLayout>
    );
  }
}

export default IntroContainer;
