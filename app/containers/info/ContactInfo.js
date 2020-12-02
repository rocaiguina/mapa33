import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import Contact from '../../components/info/contact.js';
import ProposeButton from '../../components/map-view/ProposeButton';

class ContactInfo extends React.Component {
  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };
  render() {
    return (
      <BaseLayout
        dark
        title="CONTACTO"
        enableMenu
        className="main-auto-height"
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <Contact />
      </BaseLayout>
    );
  }
}

ContactInfo.propTypes = {
  history: PropTypes.object,
};

export default ContactInfo;
