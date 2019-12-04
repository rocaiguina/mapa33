import React from 'react';
import { Button } from 'antd';
import BaseLayout from '../components/layout/base';
import Footer from '../components/layout/footer';
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
