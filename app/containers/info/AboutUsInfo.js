import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import AboutUs from '../../components/info/aboutus.js';
import ProposeButton from '../../components/map-view/ProposeButton';

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

AboutUsInfo.propTypes = {
  history: PropTypes.object,
};

export default AboutUsInfo;
