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
      level: '',
      photograph: '',
      owner: null,
      likes: 0,
      reason_conservation: '',
      location: '',
      main_attributes: [],
      other_main_attributes: '',
      main_uses: [],
      other_main_uses: '',
      proposed_uses: [],
      area_size: 0,
      status: '',
      plots_count: 1,
      coordinates: null,
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
        self.setState({
          name: land.name,
          level: land.level,
          photograph: land.photograph,
          owner: land.owner,
          likes: land.likes,
          reason_conservation: land.reason_conservation,
          location: land.location,
          main_attributes: land.main_attributes,
          other_main_attributes: land.other_main_attributes,
          main_uses: land.main_uses,
          other_main_uses: land.other_main_uses,
          proposed_uses: land.proposed_uses,
          area_size: land.area_size,
          status: land.status,
          plots_count: land.plots_count,
          coordinates: land.coordinates,
          disabledLike: land.disabledLike,
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
    LandApi.like(land.id)
      .then(() => {
        setSubmitting(false);
        self.setState(prevState => ({
          likes: prevState.likes + 1,
          disabledLike: true,
        }));
        notification.success({
          message: 'Registros satisfactorio',
          description: 'Gracias por darnos tu apoyo.',
        });
      })
      .catch(err => {
        if (err.status == 401) {
          self.props.history.push('/login');
        } else {
          setSubmitting(false);
          notification.error({
            message: 'Error',
            description:
              'No se logró registrar tu apoyo. Por favor intenta nuevamente.',
          });
        }
      });
  };

  render() {
    const id = parseInt(this.props.match.params.landId);
    const {
      name,
      level,
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
      current_situation,
      proposed_uses,
    } = this.state;
    return (
      <BaseLayout
        dark
        title="TARJETA DE PROPUESTA"
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
        <LandDetail
          id={id}
          name={name}
          level={level}
          owner={owner}
          likes={likes}
          location={location}
          area={area}
          status={status}
          uses={uses}
          plots_count={plots_count}
          coordinates={coordinates && coordinates.coordinates}
          attributes={attributes}
          photograph={photograph}
          current_situation={current_situation}
          proposed_uses={proposed_uses}
          disabledLike={disabledLike}
          onClickLike={this.handleOnClickLike}
        />
      </BaseLayout>
    );
  }
}

LandDetailContainer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default LandDetailContainer;
