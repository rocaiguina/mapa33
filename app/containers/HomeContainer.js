import React from 'react';
import { Button } from 'antd';
import BaseLayout from '../components/layout/base';
import MapView from '../components/map-view';

class HomeContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      maplist: [
        {
          id: 1,
          name: 'El Terreno del futuro Junior Caño 1',
          location: 'Fajardo',
          use_type: 'protected'
        },
        {
          id: 2,
          name: 'El Terreno del futuro Junior Caño 2',
          location: 'Fajardo',
          use_type: 'protected'
        },
        {
          id: 3,
          name: 'El Terreno del futuro Junior Caño 3',
          location: 'Fajardo',
          use_type: 'proposed'
        },
        {
          id: 4,
          name: 'El Terreno del futuro Junior Caño 4',
          location: 'Fajardo',
          use_type: 'proposed'
        },
        {
          id: 5,
          name: 'El Terreno del futuro Junior Caño 5',
          location: 'Fajardo',
          use_type: 'proposed'
        }
      ]
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