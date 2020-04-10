import React from 'react';
import PropTypes from 'prop-types';
import { notification, Spin } from 'antd';

import BaseLayout from '../components/layout/base';
import Legend from '../components/map-view/Legend';
import FilterLand from '../components/land/Filter';
import LandList from '../components/land/List';
import LandCarousel from '../components/land/Carousel';
import ProposeButton from '../components/map-view/ProposeButton';
import LandApi from '../api/land';

class LandListViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      region: '',
      view: 'list',
      status: '', // conserved, proposed
      maplist: [],
    };
  }

  componentDidMount() {
    const level = this.state.status;
    const location = this.state.region;
    this.fetchAreas(level, location);
  }

  fetchAreas(level, location) {
    const self = this;
    this.setState({ loading: true });
    LandApi.find({ level, location })
      .then(lands => {
        self.setState({
          maplist: lands,
          loading: false,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se logró recuperar las áreas naturales. Por favor intenta nuevamente.',
        });
      });
  }

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };

  handleOnChangeRegion = value => {
    this.setState({
      region: value,
    });
    const level = this.state.status;
    this.fetchAreas(level, value);
  };

  handleOnChangeView = value => {
    if (value == 'map') {
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({
        view: value,
      });
    }
  };

  handleOnChangeStatus = value => {
    this.setState({
      status: value,
    });
    const region = this.state.region;
    this.fetchAreas(value, region);
  };

  render() {
    return (
      <BaseLayout
        dark
        title="LEYENDA DE ÁREAS NATURALES"
        enableMenu
        verticalAlign="top"
        subtitle={<Legend />}
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <FilterLand
          defaultRegion={this.state.region}
          defaultView={this.state.view}
          defaultStatus={this.state.status}
          onChangeRegion={this.handleOnChangeRegion}
          onChangeView={this.handleOnChangeView}
          onChangeStatus={this.handleOnChangeStatus}
        />
        <Spin spinning={this.state.loading}>
          {this.state.view == 'list' ? (
            <LandList lands={this.state.maplist} />
          ) : (
            <LandCarousel lands={this.state.maplist} />
          )}
        </Spin>
      </BaseLayout>
    );
  }
}

LandListViewContainer.propTypes = {
  history: PropTypes.object,
};

export default LandListViewContainer;
