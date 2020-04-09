import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import BaseLayout from '../components/layout/base';
import ProposeButton from '../components/map-view/ProposeButton';
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
          plots_count: land.plots_count,
          coordinates: land.coordinates,
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
      photograph,
      owner,
      likes,
      reason_conservation,
      location,
      main_attributes,
      other_main_attributes,
      main_uses,
      other_main_uses,
      proposed_uses,
      area_size,
      plots_count,
      coordinates,
      disabledLike,
    } = this.state;
    return (
      <BaseLayout
        dark
        title="TARJETA DE PROPUESTA"
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <LandDetail
          id={id}
          name={name}
          level={level}
          photograph={photograph}
          owner={owner}
          likes={likes}
          reason_conservation={reason_conservation}
          location={location}
          main_attributes={main_attributes}
          other_main_attributes={other_main_attributes}
          main_uses={main_uses}
          other_main_uses={other_main_uses}
          proposed_uses={proposed_uses}
          area_size={area_size}
          plots_count={plots_count}
          coordinates={coordinates}
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
