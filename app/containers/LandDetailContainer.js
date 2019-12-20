import React from 'react';
import { Col, Row } from 'antd';
import Button from '../components/ui/Button';
import BaseLayout from '../components/layout/base';
import Icon from '../components/ui/Icon';
import LandDetail from '../components/land/detail';

class LandDetailContainer extends React.Component {

  handleOnAddProposal = (event) => {
    this.props.history.push('/register');
  }

  handleOnClose = (event) => {
    this.props.history.push('/map');
  }

  render () {
    return (
      <BaseLayout dark darkHeader
        header={
          <div className="page-title">
            <h2>TARJETA<br/>DE PROPUESTA</h2>
            <ul className="actions">
              <li>
                <Button size="large" type="link" onClick={this.handleOnClose}><Icon type="close"/></Button>
              </li>
            </ul>
          </div>
        }
        footerRightComponent={<Button className="m33-btn ant-btn-xlg" size="large" type="secondary" onClick={this.handleOnAddProposal} bordered><Icon type="plus"/></Button>}
      >
        <LandDetail />
      </BaseLayout>
    );
  }
}

export default LandDetailContainer;
