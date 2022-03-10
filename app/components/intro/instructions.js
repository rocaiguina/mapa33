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
          El futuro es ahora y la meta común es conservar el 33% de Puerto Rico para el 2033. Mapa-33 es una herramienta interactiva y educativa que nos ayuda a conocer lo que queremos conservar y lo que es importante para todos. 
        </p>
        <p>
          Mapa-33 es un trabajo en equipo y todos debemos formar parte. Con tu ayuda podremos crear el mapa que queremos para el 2033.
        </p>
        <h3>Qué puedes hacer:</h3>
        <p>
          1. Proponer un terreno que es importante para ti, para la comunidad o porque guarda buenas memorias o experiencias. 
        </p>
        <p>
          2. Apoyar las propuestas de los demás. Si el terreno que quieres proponer ya está en el mapa, tienes la posibilidad de apoyar la propuesta y compartirla.
        </p>
        <p>
        NOTA: Toda solicitud de propuesta será evaluada antes de ser publicada en el mapa. Y debes registrarte para poder proponer o apoyar propuestas.
        </p>
        <p className="m-b-30">
        Ahora, sigue las instrucciones a continuación y bienvenido a Mapa-33.
        </p>
        <div className="text-center">
          <Button type="primary" onClick={this.props.onClose}>
            COMENZAR<Icon type="arrow-right" />
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
