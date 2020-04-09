import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

class ProposeButton extends React.Component {
  render() {
    const { icon, title } = this.props;
    return (
      <div className="ant-btn-propose-wrapper">
        <div className="ant-btn-propose-border">
          <Link
            to="/register/propose-land"
            className="ant-btn ant-btn-lg ant-btn-propose"
          >
            <Icon type={icon} />
          </Link>
        </div>
        <div className="ant-btn-desc hidden-xs">{title}</div>
      </div>
    );
  }
}

ProposeButton.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default ProposeButton;
