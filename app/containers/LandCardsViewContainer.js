import React from 'react';
import PropTypes from 'prop-types';
import { Col, notification, Row } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import QueryString from 'query-string';

import BaseLayout from '../components/layout/base';
import Legend from '../components/map-view/Legend';
import FilterLand from '../components/land/Filter';
import LandCard from '../components/land/Card';
import ProposeButton from '../components/map-view/ProposeButton';

import LandApi from '../api/land';
import AuthService from '../services/auth';

class LandCardsViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
      loading: false,
      region: '',
      useType: '',
      size: '',
      status: '', // conserved, proposed
      maplist: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = QueryString.parse(location.search);
    const { status, region } = queryParams;
    const { page, useType, size } = this.state;
    this.fetchAreas(status, region, useType, size, page);
    this.setState({
      status,
      region,
    });
  }

  fetchAreas(level, location, use_type, area_size, page, append) {
    const self = this;
    const { maplist } = this.state;
    const limit = 12;
    this.setState({ loading: true });
    LandApi.find({ level, location, use_type, area_size, page, limit })
      .then(response => {
        const { docs, has_next_page, next_page } = response;
        const data = append ? [...maplist, ...docs] : docs;
        self.setState({
          maplist: data,
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
      page: 1,
    });
    const { status, useType, size } = this.state;
    this.fetchAreas(status, value, useType, size, 1);
  };

  handleOnChangeUseType = value => {
    this.setState({
      useType: value,
      page: 1,
    });
    const { status, region, size } = this.state;
    this.fetchAreas(status, region, value, size, 1);
  };

  handleOnChangeSize = value => {
    this.setState({
      size: value,
      page: 1,
    });
    const { status, region, useType } = this.state;
    this.fetchAreas(status, region, useType, value, 1);
  };

  handleOnChangeStatus = () => {
    const { status, region, useType, size } = this.state;
    const value = status === 'proposed' ? 'conserved' : 'proposed';
    this.setState({
      status: value,
      page: 1,
    });
    this.fetchAreas(value, region, useType, size, 1);
  };

  handleOnChangeView = () => {
    const { history } = this.props;
    history.push('/map/list');
  };

  handleOnLike = landId => {
    if (AuthService.isUserLogged()) {
      const self = this;
      const { maplist } = this.state;
      LandApi.like(landId)
        .then(response => {
          const umaplist = maplist.map(item => {
            if (landId === item.id) {
              item.likes = response.totalLikes;
              return item;
            }
            return item;
          });
          self.setState({
            maplist: umaplist,
          });
          notification.success({
            message: '¡Gracias por unirte a la meta común!',
            description:
              'Ahora pendiente a tu correo electrónico para que sigas y conozcas la actualización del proceso de esta propuesta.',
          });
        })
        .catch(() => {
          notification.error({
            message: 'Error',
            description:
              'No se logró registrar tu apoyo. Por favor intenta nuevamente.',
          });
        });
    } else {
      this.props.history.push('/register/user?next=/map/cards');
    }
  };

  handleLoadMore = () => {
    const { page, region, useType, size, status } = this.state;
    this.fetchAreas(status, region, useType, size, page, true);
  };

  render() {
    const { region, useType, size, hasMore, maplist } = this.state;
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
          region={region}
          useType={useType}
          size={size}
          onChangeRegion={this.handleOnChangeRegion}
          onChangeUseType={this.handleOnChangeUseType}
          onChangeSize={this.handleOnChangeSize}
          onChangeStatus={this.handleOnChangeStatus}
          onChangeView={this.handleOnChangeView}
        />
        <div className="land-list-wrapper">
          <Row gutter={16}>
            <InfiniteScroll
              dataLength={maplist.length}
              next={this.handleLoadMore}
              hasMore={hasMore}
            >
              {maplist.map(item => (
                <Col key={item.id} md={6}>
                  <LandCard
                    id={item.id}
                    name={item.name}
                    photograph={item.photographURL}
                    level={item.level}
                    location={item.location}
                    likes={item.likes}
                    onLike={this.handleOnLike}
                  />
                </Col>
              ))}
            </InfiniteScroll>
          </Row>
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
