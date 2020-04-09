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
        className="ant-modal-green ant-modal-full"
      >
        <h3 className="text-bold">¿Qué es Mapa-33?</h3>
        <p>
          Mapa-33 es una herramienta en línea para asistir en la conservación de
          terrenos del archipiélago de Puerto Rico.
        </p>
        <h3 className="text-bold">¿Cómo funciona?</h3>
        <p>
          Siguiendo los pasos indicados, podrás explorar el mapa, identificar
          terrenos y crear una propuesta para iniciar el proceso de
          conservación.
        </p>
        <h3 className="text-bold">¿Cuál es la meta?</h3>
        <p>
          La meta común del Mapa es proteger 33% del terreno puertorriqueño para
          el año 2033.
        </p>
        <p>
          Participar de la creación del Mapa-33 incluye proponer terrenos para
          conservación, mostrar apoyo a propuestas existentes y visibilizar
          propuestas de tu interés a través de tus redes sociales.
        </p>
        <p className="m-b-30">
          Mapa-33 depende de ti para asegurar el bienestar ecológico de Puerto
          Rico. Únete.
        </p>
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
