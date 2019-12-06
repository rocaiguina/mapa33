import React from 'react';
import Legend from './Legend';
import Map from './Map';
import List from './List';
import ToolBar from './Toolbar';

class MapView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mapView: 'map',                     // map, list
      areaView: 'protected_areas',        // protected_areas, lots
    }
  }

  handleOnChangeMapView = (event) => {
    this.setState({
      mapView: event.target.value
    });
  }

  handleOnChangeAreaView = (event) => {
    this.setState({
      areaView: event.target.value
    });
  }

  render () {
    return (
      <div className="map-view">
        <Legend />
        {
          this.state.mapView == 'map' ?
            <Map
              areaView={this.state.areaView}
            /> :
            <List
              items={this.props.data}
            />
        }
        <ToolBar 
          mapView={this.state.mapView}
          areaView={this.state.areaView}
          onChangeMapView={this.handleOnChangeMapView}
          onChangeAreaView={this.handleOnChangeAreaView}/>
      </div>
    );
  }
}

export default MapView;