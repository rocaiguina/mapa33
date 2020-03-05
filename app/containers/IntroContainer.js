import React from 'react';
import BaseLayout from '../components/layout/base';
import Intro from '../components/intro';

class IntroContainer extends React.Component {
  handleOnEndIntro = () => {
    this.props.history.push('/map');
  };

  render() {
    return (
      <BaseLayout dark>
        <Intro onEnd={this.handleOnEndIntro} />
      </BaseLayout>
    );
  }
}

export default IntroContainer;
