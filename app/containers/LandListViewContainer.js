import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import BaseLayout from '../components/layout/base';
import Legend from '../components/map-view/Legend';
import FilterLand from '../components/land/Filter';
import LandItem from '../components/land/Item';
import ProposeButton from '../components/map-view/ProposeButton';
import LandApi from '../api/land';

class LandListViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
      loading: false,
      region: '',
      status: '', // conserved, proposed
      maplist: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { page } = this.state;
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || '';
    const region = queryParams.get('region') || '';
    this.fetchAreas(status, region, page);
    this.setState({
      status,
      region,
    });
  }

  fetchAreas(level, location, page) {
    const self = this;
    const { maplist } = this.state;
    const limit = 12;
    this.setState({ loading: true });
    LandApi.find({ level, location, page, limit })
      .then(response => {
        const { docs, has_next_page, next_page } = response;
        self.setState({
          maplist: [...maplist, ...docs],
          hasMore: has_next_page,
          loading: false,
          page: next_page,
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
    const { status, page } = this.state;
    this.fetchAreas(status, value, page);
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
    const { region, page } = this.state;
    this.fetchAreas(value, region, page);
  };

  handleLoadMore = () => {
    const { page, region, status } = this.state;
    this.fetchAreas(status, region, page);
  };

  render() {
    const { hasMore, maplist } = this.state;
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
        className="main-auto-height"
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <FilterLand
          region={this.state.region}
          view="list"
          status={this.state.status}
          onChangeRegion={this.handleOnChangeRegion}
          onChangeView={this.handleOnChangeView}
          onChangeStatus={this.handleOnChangeStatus}
        />
        <div className="land-list-wrapper">
          <div className="table-responsive">
            <div className="land-list land-list-dark">
              <InfiniteScroll
                dataLength={maplist.length}
                next={this.handleLoadMore}
                hasMore={hasMore}
              >
                {maplist.map(item => (
                  <LandItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    level={item.level}
                    owner={item.user}
                    location={item.location}
                    area_size={item.area_size}
                    likes={item.likes}
                    onLike={this.handleOnLike}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

LandListViewContainer.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default LandListViewContainer;
