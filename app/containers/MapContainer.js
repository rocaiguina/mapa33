import React from 'react';
import Button from '../components/ui/Button';
import BaseLayout from '../components/layout/base';
import Icon from '../components/ui/Icon';
import MapView from '../components/map-view';

class MapContainer extends React.Component {

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
    this.props.history.push('/register');
  }

  render () {
    return (
      <BaseLayout dark
        footerRightComponent={<Button className="m33-btn ant-btn-xlg" size="large" type="secondary" onClick={this.handleOnAddProposal} bordered><Icon type="plus"/></Button>}>
        <MapView data={this.state.maplist}/>
      </BaseLayout>
    );
  }
}

export default MapContainer;