import React from 'react';
import BaseLayout from '../../components/layout/base';
import Contact from '../../components/info/Contact.js';
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
        footerRightComponent={
        <div>
            <Button
                className="m33-btn ant-btn-xlg"
                size="large"
                type="secondary"
                onClick={this.handleOnAddProposal}
                bordered
            >
                <Icon type="plus" />
            </Button>          
            <h5 style={{width: "100%", fontWeight: "bolder",marginLeft: "auto", marginRight: "auto", paddingTop: "2px", color: "rgb(240,115,168)"}} >Proponer área</h5>
        </div>
        }
      >
        <Contact />
      </BaseLayout>
    );
  }
}

export default ContactInfo;