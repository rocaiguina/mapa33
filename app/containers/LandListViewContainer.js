import React from 'react';
import PropTypes from 'prop-types';
import { notification, Spin } from 'antd';

import BaseLayout from '../components/layout/base';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Legend from '../components/map-view/Legend';
import FilterLand from '../components/land/Filter';
import LandList from '../components/land/List';
import LandCarousel from '../components/land/Carousel';
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
    this.setState({
      view: value,
    });
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
        subtitle={<Legend />}
        footerRightComponent={
        <div>
            <Button
                className="m33-btn ant-btn-xlg"
                size="large"
                type="secondary"
                onClick={this.handleOnAddProposal}
                bordered
            >
                <Icon type="plus" />
            </Button>
            <h5 style={{width: "100%", fontWeight: "bolder",marginLeft: "auto", marginRight: "auto", paddingTop: "2px", color: "rgb(240,115,168)"}} >Proponer área</h5>    
        </div>          
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
