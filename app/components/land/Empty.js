import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

export default function (props) {
  return (
    <div>
      <h2>No hay áreas propuestas activas.</h2>
      <Link to="/land">
        Proponer área <Icon type="plus"/>
      </Link>
    </div>
  )
}
