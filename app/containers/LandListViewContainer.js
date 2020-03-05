import React from 'react';
import Axios from 'axios';

import BaseLayout from '../components/layout/base';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Legend from '../components/map-view/Legend';
import FilterLand from '../components/land/Filter';
import LandList from '../components/land/List';
import LandCarousel from '../components/land/Carousel';

class LandListViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: '',
      view: 'list',
      status: '',
      areaView: '', // conserved, proposed
      maplist: [],
    };
  }

  componentDidMount() {
    this.fetchAreas(this.state.areaView);
  }

  fetchAreas(areaView) {
    const self = this;
    Axios.get(`/api/land/?area=${areaView}`)
      .then(response => {
        self.setState({
          maplist: response.data,
        });
      })
      .catch(err => {
        window.alert(err);
      });
  }

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };

  handleOnChangeModeView = () => {
    this.props.history.push('/map');
  };

  handleOnChangeAreaView = event => {
    this.setState({
      areaView: event.target.value,
    });
    this.fetchAreas(event.target.value);
  };

  handleOnChangeRegion = value => {
    this.setState({
      region: value,
    });
  };

  handleOnChangeView = value => {
    this.setState({
      view: value,
    });
  };

  handleOnChangeStatus = value => {
    this.setState({
      status: value,
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
          <FilterLand
            defaultRegion={this.state.region}
            defaultView={this.state.view}
            defaultStatus={this.state.status}
            onChangeRegion={this.handleOnChangeRegion}
            onChangeView={this.handleOnChangeView}
            onChangeStatus={this.handleOnChangeStatus}
          />
          {this.state.view == 'list' ? (
            <LandList lands={this.state.maplist} />
          ) : (
            <LandCarousel lands={[]} />
          )}
        </div>
      </BaseLayout>
    );
  }
}

export default LandListViewContainer;
