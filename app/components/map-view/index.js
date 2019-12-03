import React from 'react';
import Legend from './legend';
import Map from './map';
import List from './list';
import ToolBar from './toolbar';

class MapView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mapView: 'list',             // map, list
      areaView: 'protected',       // protected, proposals
      datalist: [
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
    }
  }

  render () {
    return (
      <div>
        <Legend />
        {
          this.state.mapView == 'map' ? <Map/> : <List items={this.state.datalist}/>
        }
        <ToolBar />
      </div>
    );
  }
}

export default MapView;