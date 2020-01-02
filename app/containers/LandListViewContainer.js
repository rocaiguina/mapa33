import React from 'react';
import Axios from 'axios';

import BaseLayout from '../components/layout/base';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Legend from '../components/map-view/Legend';
import ListView from '../components/map-view/List';
import ToolBar from '../components/map-view/Toolbar';


class LandListViewContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      areaView: '',             // conserved, proposed
      maplist: []
    };
  }

  componentDidMount() {
    this.fetchAreas(this.state.areaView);
  }

  fetchAreas(areaView) {
    const self = this;
    Axios
      .get(`/api/land/?area=${areaView}`)
      .then(response => {        
        self.setState({
          maplist: response.data
        })
      })
      .catch(err => {
        alert(err);
      });
  }

  handleOnAddProposal = (event) => {
    this.props.history.push('/register');
  }

  handleOnChangeModeView = (event) => {
    this.props.history.push('/map');
  }

  handleOnChangeAreaView = (event) => {
    this.setState({
      areaView: event.target.value
    });
    this.fetchAreas(event.target.value);
  }

  render () {
    return (
      <BaseLayout dark
        footerRightComponent={
          <Button
            className="m33-btn ant-btn-xlg"
            size="large"
            type="secondary"
            onClick={this.handleOnAddProposal}
            bordered
          >
            <Icon type="plus"/>
          </Button>
        }
      >
        <div className="map-view">
          <Legend />
          <ListView items={this.state.maplist} />
          <ToolBar 
            mapView="list"
            areaView={this.state.areaView}
            onChangeModeView={this.handleOnChangeModeView}
            onChangeAreaView={this.handleOnChangeAreaView}
          />
        </div>
      </BaseLayout>
    )
  }
}

export default LandListViewContainer;