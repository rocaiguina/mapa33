import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import Button from '../components/ui/Button';
import BaseLayout from '../components/layout/base';
import Icon from '../components/ui/Icon';
import LandDetail from '../components/land/detail';

import LandApi from '../api/land';

class LandDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photograph: '',
      owner: '',
      likes: '',
      reason_conservation: '',
      location: '',
      area_size: 0,
      status: '',
      plots_count: 1,
      coordinates: '',
      attributes: '',
    };
  }

  componentDidMount() {
    const { landId } = this.props.match.params;
    this.fetchLand(landId);
  }

  fetchLand(landId) {
    const self = this;
    LandApi.get(landId)
      .then(land => {
        const metadata = land.metadata || {};
        self.setState({
          name: land.name,
          photograph: land.photograph,
          owner: land.user,
          likes: land.likes,
          reason_conservation: land.reason_conservation,
          location: land.location,
          area_size: land.area_size,
          status: land.status,
          plots_count: land.plots_count,
          coordinates: land.coordinates,
          attributes: metadata.attributes,
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

  render() {
    const id = this.props.match.params.landId;
    const {
      name,
      owner,
      location,
      area,
      status,
      uses,
      plots_count,
      coordinates,
      attributes,
      photograph,
    } = this.state;
    return (
      <BaseLayout
        dark
        title="TARJETA DE PROPUESTA"
        enableMenu={false}
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
        <div className="main-content m-t-15">
          <LandDetail
            id={id}
            name={name}
            owner={owner}
            location={location}
            area={area}
            status={status}
            uses={uses}
            plots_count={plots_count}
            coordinates={coordinates}
            attributes={attributes}
            photograph={photograph}
          />
        </div>
      </BaseLayout>
    );
  }
}

LandDetailContainer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default LandDetailContainer;
