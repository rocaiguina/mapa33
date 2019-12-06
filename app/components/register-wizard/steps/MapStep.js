import React from 'react';
import { Col, Input, Row } from 'antd';
import Button from '../../ui/Button';
import MapEditor from '../../map-view/Editor';

class MapStep extends React.Component {

  render() {
    return (
      <div className="m-b-20">
          <MapEditor/>
      </div>
    );
  }
}

export default MapStep;