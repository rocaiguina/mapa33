import React from 'react';
import PropTypes from 'prop-types';
import { notification, Spin } from 'antd';

import BaseLayout from '../components/layout/base';
import Legend from '../components/map-view/Legend';
import FilterLand from '../components/land/Filter';
import LandCarousel from '../components/land/Carousel';
import ProposeButton from '../components/map-view/ProposeButton';
import LandApi from '../api/land';

class LandCardsViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      region: '',
      status: '', // conserved, proposed
      maplist: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || '';
    const region = queryParams.get('region') || '';
    this.fetchAreas(status, region);
    this.setState({
      status,
      region,
    });
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
    const { history } = this.props;
    if (value == 'map') {
      history.push('/');
    } else {
      const { status, region } = this.state;
      history.push('/map/' + value + '?status=' + status + '&region=' + region);
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
        title={
          <span>
            LEYENDA <span className="hidden-xs">DE ÁREAS NATURALES</span>
          </span>
        }
        closeLinkClassname="ant-btn-white ant-btn-round"
        enableMenu
        verticalAlign="top"
        subtitle={<Legend />}
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <FilterLand
          region={this.state.region}
          view="cards"
          status={this.state.status}
          onChangeRegion={this.handleOnChangeRegion}
          onChangeView={this.handleOnChangeView}
          onChangeStatus={this.handleOnChangeStatus}
        />
        <div className="land-list-wrapper">
          <Spin spinning={this.state.loading}>
            <LandCarousel lands={this.state.maplist} />
          </Spin>
        </div>
      </BaseLayout>
    );
  }
}

LandCardsViewContainer.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default LandCardsViewContainer;
