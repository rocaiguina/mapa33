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
      <div>
        <Legend />
        {
          this.state.mapView == 'map' ? <Map/> : <List items={this.props.data}/>
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