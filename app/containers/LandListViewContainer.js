import React from 'react';
import PropTypes from 'prop-types';
import { Divider, notification } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import QueryString from 'query-string';

import BaseLayout from '../components/layout/base';
import Legend2 from '../components/map-view/Legend2';
import FilterLand from '../components/land/Filter';
import Empty from '../components/land/Empty';
import LandItem from '../components/land/Item';
import ProposeButton from '../components/map-view/ProposeButton';

import LandApi from '../api/land';
import AuthService from '../services/auth';

class LandListViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
      loading: true,
      keywords: '',
      region: '',
      useType: '',
      size: '',
      status: '', // conserved, proposed
      dataLand: [],
      maplist: [],
      loadedLands: 0,
      totalLands: 0,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = QueryString.parse(location.search);
    const { status, region } = queryParams;
    const { keywords, page, useType, size } = this.state;
    this.fetchAreas(keywords, status, region, useType, size, page);
    this.setState({
      status,
      region,
    });
  }

  fetchAreas(keywords, level, location, use_type, area_size, page, append) {
    const self = this;
    const { maplist } = this.state;
    const limit = 12;
    this.setState({ loading: true });
    LandApi.find({ keywords, level, location, use_type, area_size, page, limit })
      .then(response => {
        const {
          docs,
          has_next_page,
          next_page,
          current_page,
          total,
        } = response;
        const data = append ? [...maplist, ...docs] : docs;
        self.setState({
          maplist: data,
          hasMore: has_next_page,
          loading: false,
          page: next_page,
          loadedLands: current_page * docs.length,
          totalLands: total,
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
    const { keywords, status, useType, size } = this.state;
    this.fetchAreas(keywords, status, value, useType, size, 1);
  };

  handleOnChangeUseType = value => {
    this.setState({
      useType: value,
      page: 1,
    });
    const { keywords, status, region, size } = this.state;
    this.fetchAreas(keywords, status, region, value, size, 1);
  };

  handleOnChangeSize = value => {
    this.setState({
      size: value,
      page: 1,
    });
    const { keywords, status, region, useType } = this.state;
    this.fetchAreas(keywords, status, region, useType, value, 1);
  };

  handleOnChangeStatus = () => {
    const { keywords, status, region, useType, size } = this.state;
    const value = status === 'proposed' ? 'conserved' : 'proposed';
    this.setState({
      status: value,
      page: 1,
    });
    this.fetchAreas(keywords, value, region, useType, size, 1);
  };

  handleOnChangeView = () => {
    const { history } = this.props;
    history.push('/map/cards');
  };

  handleOnSearchKeyword = value => {
    this.setState({
      keywords: value,
    });
    if (value && value.length >= 3) {
      const self = this;
      LandApi.findAutoComplete(value)
        .then(response => {
          const dataLand = response.map(item => {
            return {
              value: item.id,
              text: item.name,
            };
          });
          self.setState({
            dataLand,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleOnSelectLand = value => {
    this.props.history.push(`/land/${value}`);
  };

  handleOnSearch = value => {
    this.setState({
      keywords: value,
    });
    const { region, useType, size, status } = this.state;
    this.fetchAreas(value, status, region, useType, size, 1);
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
      this.props.history.push('/register/user?next=/map/list');
    }
  };

  handleLoadMore = () => {
    const { keywords, page, region, useType, size, status } = this.state;
    this.fetchAreas(keywords, status, region, useType, size, page, true);
  };

  render() {
    const {
      loading,
      region,
      useType,
      size,
      hasMore,
      dataLand,
      maplist,
      totalLands,
      loadedLands,
    } = this.state;
    return (
      <BaseLayout
        dark
        title={<Legend2 />}
        closeLinkClassname="ant-btn-white ant-btn-round"
        enableMenu
        disableBorder
        verticalAlign="top"
        className="main-auto-height"
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <FilterLand
          dataLand={dataLand}
          region={region}
          useType={useType}
          size={size}
          onChangeRegion={this.handleOnChangeRegion}
          onChangeUseType={this.handleOnChangeUseType}
          onChangeSize={this.handleOnChangeSize}
          onChangeStatus={this.handleOnChangeStatus}
          onChangeView={this.handleOnChangeView}
          onSearchKeyword={this.handleOnSearchKeyword}
          onSelectLand={this.handleOnSelectLand}
          onSearch={this.handleOnSearch}
        />
        <div className="land-list-wrapper">
          <Divider
            dashed
            style={{ borderStyle: 'dotted', margin: '1px 0 15px 0' }}
          />
          {maplist.length > 0 && (
            <h3 className="land-list-pagination-info">
              Mostrando {loadedLands} de {totalLands}
            </h3>
          )}
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
                    landShape={item.landShapeURL}
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
            {maplist.length === 0 && loading === false && <Empty />}
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
