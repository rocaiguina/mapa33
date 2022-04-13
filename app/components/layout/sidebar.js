import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';

import Icon from '../ui/Icon';

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer
        placement={this.props.placement}
        closable={false}
        visible={this.props.visible}
        onClose={this.props.onClose}
        className="ant-drawer-purple"
      >
        <div className="ant-drawer-closable">
          <Button
            shape="round"
            size="large"
            type="link"
            className="ant-btn-white"
            onClick={this.props.onClose}
          >
            <Icon type="close" />
          </Button>
        </div>
        <ul>
          <li>
            <Link to="/about-us">Sobre Mapa-33</Link>
          </li>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/map/list">Listado de áreas</Link>
          </li>
          <li>
            <Link to="/register/propose-land">Proponer área</Link>
          </li>
          <li>
            <Link to="/faq">Preguntas frecuentes</Link>
          </li>
          <li>
            <Link to="/contact-us">Contacto</Link>
          </li>
          <li>
            <Link to="/profile">Mi perfil </Link>
          </li>
        </ul>
        <div className="naturaleza">
          <img src="/images/naturaleza.png" alt="naturaleza" />
        </div>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  visible: PropTypes.bool,
  placement: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
