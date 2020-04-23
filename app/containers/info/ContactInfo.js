import React from 'react';
import BaseLayout from '../../components/layout/base';
import Contact from '../../components/info/Contact.js';
import ProposeButton from '../../components/map-view/ProposeButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

class ContactInfo extends React.Component {

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };
  render() {
    return (
      <BaseLayout 
        dark title="CONTACTO"
        enableMenu
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <Contact />
      </BaseLayout>
    );
  }
}

export default ContactInfo;