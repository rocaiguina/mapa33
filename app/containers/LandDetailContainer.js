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
      likes: 0,
      reason_conservation: '',
      location: '',
      area_size: 0,
      status: '',
      plots_count: 1,
      coordinates: '',
      attributes: '',
      disabledLike: true,
    };
  }

  componentDidMount() {
    const { landId } = this.props.match.params;
    this.fetchLand(landId);
    this.checkUserLike(landId, 3);
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
            'No se logró recuperar el área. Por favor intenta nuevamente.',
        });
      });
  }

  checkUserLike(landId, userId) {
    const self = this;
    LandApi.isLikedByUser(landId, userId)
      .then(liked => {
        self.setState({
          disabledLike: liked,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleOnAddProposal = () => {
    this.props.history.push('/register');
  };

  handleOnClickLike = (land, setSubmitting) => {
    const self = this;
    const userId = 3;
    LandApi.like(land.id, userId)
      .then(() => {
        self.setState(prevState => ({
          likes: prevState.likes + 1,
          disabledLike: true,
        }));
        notification.success({
          message: 'Registros satisfactorio',
          description: 'Gracias por darnos tu apoyo.',
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se logró registrar tu apoyo. Por favor intenta nuevamente.',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    const id = this.props.match.params.landId;
    const {
      name,
      owner,
      likes,
      location,
      area,
      status,
      uses,
      plots_count,
      coordinates,
      attributes,
      photograph,
      disabledLike,
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
            likes={likes}
            location={location}
            area={area}
            status={status}
            uses={uses}
            plots_count={plots_count}
            coordinates={coordinates}
            attributes={attributes}
            photograph={photograph}
            disabledLike={disabledLike}
            onClickLike={this.handleOnClickLike}
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
