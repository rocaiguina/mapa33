import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    return (
      <Drawer
        placement={this.props.placement}
        closable={this.props.closable}
        visible={this.props.visible}
        onClose={this.props.onClose}
        className="ant-drawer-purple"
      >
        <ul>
          <li>
            <Link to="/">Sobre Mapa 33</Link>
          </li>
          <li>
            <Link to="/">Mapa Inicial</Link>
          </li>
          <li>
            <Link to="/">Listado de Áreas</Link>
          </li>
          <li>
            <Link to="/">Proponer Área</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
          <li>
            <Link to="/">Contacto</Link>
          </li>
          <li>
            <Link to="/profile">Mi perfíl</Link>
          </li>
        </ul>
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
