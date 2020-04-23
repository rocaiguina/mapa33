import React from 'react';
import BaseLayout from '../../components/layout/base';
import AboutUs from '../../components/info/aboutus.js';
import ProposeButton from '../../components/map-view/ProposeButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class AboutUsInfo extends React.Component {
  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };
  render() {
    return (
      <BaseLayout
        dark
        title="SOBRE EL MAPA"
        enableMenu
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <AboutUs />
      </BaseLayout>
    );
  }
}

export default AboutUsInfo;
