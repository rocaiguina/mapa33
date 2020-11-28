import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Divider, notification, Row } from 'antd';
import { DiscussionEmbed } from 'disqus-react';

import BaseLayout from '../components/layout/base';
import ProposeButton from '../components/map-view/ProposeButton';
import LandDetail from '../components/land/detail';
import MemoryListContainer from './MemoryListContainer';

import MemoryModalRegisterContainer from './MemoryModalRegisterContainer';

import LandApi from '../api/land';
import AuthService from '../services/auth';

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
      coordinates: {},
      disabledLike: true,
      shareMemories: false,
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
          photograph: land.photographURL,
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
          coordinates: land.coordinates || { coordinates: [] },
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
          message: '¡Gracias por unirte a la meta común!',
          description:
            'Ahora pendiente a tu correo electrónico para que sigas y conozcas la actualización del proceso de esta propuesta.',
        });
      })
      .catch(err => {
        if (err.status == 401) {
          self.props.history.push('/register/user?next=/land/' + land.id);
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

  handleOnShareMemories = () => {
    if (AuthService.isUserLogged()) {
      this.setState({
        shareMemories: true,
      });
    } else {
      const { landId } = this.props.match.params;
      return this.props.history.replace(
        `/register/user?next=/land/${landId}`
      );
    }
  };

  handleOnCloseMemoriesModal = () => {
    this.setState({
      shareMemories: false,
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
      shareMemories,
    } = this.state;
    const title =
      level == 'conserved'
        ? 'TARJETA DE ÁREA PROTEGIDA'
        : 'TARJETA DE PROPUESTA';
    return (
      <BaseLayout
        dark
        title={title}
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
        <Divider dashed style={{ borderStyle: 'dotted' }} />
        <Row gutter={16}>
          <Col md={18}>
            <h3 className="text-bold text-uppercase m-b-15">
              MEMORIAS DE <br />
              {name}
            </h3>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <Button
                block
                shape="round"
                className="ant-btn-purple"
                size="large"
                onClick={this.handleOnShareMemories}
                style={{
                  height: '54px',
                  lineHeight: '52px',
                }}
              >
                Comparte tus memorias
              </Button>
            </div>
          </Col>
        </Row>
        <MemoryListContainer landId={id} />
        <Divider dashed style={{ borderStyle: 'dotted' }} />
        <Row gutter={16}>
          <Col md={8}>
            <h3 className="text-bold m-b-20">
              CONECTA CON LA COMUNIDAD DEL TERRENO DEL FUTURO
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
          </Col>
          <Col md={16}>
            <div className="land-disqus">
              <DiscussionEmbed
                shortname='mapa33'
                config={{
                  identifier: id,
                  title: name,
                }}
              />
            </div>
          </Col>
        </Row>
        <MemoryModalRegisterContainer
          landId={id}
          visible={shareMemories}
          onClose={this.handleOnCloseMemoriesModal}
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
