import React from 'react';
import { Button } from 'antd';
import BaseLayout from '../components/layout/base';
import MapView from '../components/map-view';

class HomeContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      maplist: []
    };
  }

  handleOnAddProposal = (event) => {
    this.props.history.push('/register-land');
  }

  render () {
    return (
      <BaseLayout dark
        footerRightComponent={<Button onClick={this.handleOnAddProposal}><i className="m33-icon m33-icon-plus"></i></Button>}>
        <MapView data={this.state.maplist}/>
      </BaseLayout>
    );
  }
}

export default HomeContainer;