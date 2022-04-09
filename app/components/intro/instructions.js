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
        <h3 className="text-bold">¡Hola!</h3>
        <p>
          La conservación de Puerto Rico depende de la participación activa de
          todos los ciudadanos. La meta común es conservar el 33% del
          archipiélago para el 2033.
        </p>
        <p>
          Mapa-33 es una herramienta interactiva y educativa que nos permite
          conocer lo que queremos conservar y lo que es importante para todos.
        </p>
        <h3>¿Para qué puedes utilizar esta herramienta?</h3>
        <p>
          1. Proponer un terreno que es importante para ti y para tu comunidad.
        </p>
        <p>
          2. Conocer y apoyar las propuestas de los demás. Si el terreno que
          quieres proponer ya está en el mapa, puedes apoyar esa propuesta y
          compartirla con tu comunidad.
        </p>
        <p className="m-b-30">
          Ahora, sigue las instrucciones a continuación y bienvenido a Mapa-33.
        </p>
        <div className="text-center">
          <Button type="primary" onClick={this.props.onClose}>
            COMENZAR
            <Icon type="arrow-right" />
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
