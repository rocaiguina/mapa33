import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

function Empty() {
  return (
    <div className="empty-result">
      <h2>No hay áreas propuestas activas.</h2>
      <Link
        to="/land"
        className="ant-btn ant-btn-lg ant-btn-round ant-btn-purple"
      >
        Proponer área <Icon type="plus" className="m-l-50" />
      </Link>
    </div>
  );
}

export default Empty;
