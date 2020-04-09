import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

class Instructions extends React.Component {
  render() {
    return (
      <Modal
        closable={false}
        visible={this.props.visible}
        footer={null}
        className="ant-modal-green text-center"
      >
        <p>
          <b>¿Que puedes hacer en Mapa 33?</b>
          <br />
          En este mapa especial tu puedes proponer áreas para crear
          iniciativas junto a PLN, para proteger o crear usos de beneficio
          para el bienestar ecológico-cultural de Puerto Rico.
        </p>
        <p>
          <b>Maneras de usar este mapa:</b>
          <br />
          1 - Proponiendo áreas por medio del botón de ”Proponer Área”
          <br />2 - Explorando el mapa de las áreas propuestas, en el cual
          podrás accesar y ver en detalle las áreas propuestas e
          interactuar con las mismas por medio de apoyarlas y compartir en
          sus redes sociales en señal de apoyo.
        </p>
        <p>
          <b>Una colaboración con PLN:</b>
          <br />
          Aquí un enlace que explica como PLN hará uso de este mapa.
        </p>
        <br />
        <div className="text-center">
          <Button type="primary" onClick={this.props.onClose}>
            EXPLORA EL MAPA <Icon type="arrow-right" />
          </Button>
        </div>
      </Modal>
    );
  }
}

Instructions.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Instructions;
