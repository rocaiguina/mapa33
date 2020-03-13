import React from 'react';

import BaseLayout from '../components/layout/base';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Legend from '../components/map-view/Legend';
import MapView from '../components/map-view/Map';
import ToolBar from '../components/map-view/Toolbar';

class LandMapViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaView: '', // conserved, proposed
    };
  }

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };

  handleOnChangeModeView = () => {
    this.props.history.push('/map/list');
  };

  handleOnChangeAreaView = event => {
    this.setState({
      areaView: event.target.value,
    });
  };

  render() {
    return (
      <BaseLayout
        dark
        footerRightComponent={
          <Button
            className="m33-btn ant-btn-xlg"
            size="large"
            type="secondary"
            onClick={this.handleOnAddProposal}
            bordered
          >
            <Icon type="plus" />
          </Button>
        }
      >
        <div className="map-view">
          <Legend />
          <MapView areaView={this.state.areaView} />
          <ToolBar
            mapView="map"
            areaView={this.state.areaView}
            onChangeModeView={this.handleOnChangeModeView}
            onChangeAreaView={this.handleOnChangeAreaView}
          />
        </div>
      </BaseLayout>
    );
  }
}

export default LandMapViewContainer;
