import React from 'react';
import { Button, Col, Popover, Row } from 'antd';

class MapToolBar extends React.Component {
  render () {
    return (
      <div>
        <Row>
          <Col md={12} xs={0}>
            <Button><i className="m33-icon m33-icon-plus"></i></Button>
            <Button><i className="m33-icon m33-icon-less"></i></Button>
          </Col>
          <Col md={12}>
            <Button><i className="m33-icon m33-icon-menu"></i></Button>
            <Button><i className="m33-icon m33-icon-user"></i></Button>
            <Popover content={<p>List view</p>} trigger="click">
              <Button><i className="m33-icon m33-icon-eye"></i></Button>
            </Popover>
            <Popover content={<p>Area view</p>} trigger="click">
              <Button><i className="m33-icon m33-icon-layers"></i></Button>
            </Popover>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MapToolBar;