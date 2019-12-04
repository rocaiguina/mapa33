import React from 'react';
import { Card, Col, Row } from 'antd';
import Button from '../ui/Button';

export default (props) => {
  return (
    <div className="intro">
      <Row>
        <Col lg={{ span: 6, offset: 9 }}>
          <div className="intro-close intro-close-ls">
            <Button type="primary" ghost size="large" onClick={props.onClose}>
              <i className="m33-icon m33-icon-close"></i>
            </Button>
          </div>
          <Card className="ant-card-round ant-card-green">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
              ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit.
            </p>
            <p>
              Lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit
              in vulputate velit.
            </p>
            <br/>
            <div className="text-center">
              <Button type="primary" onClick={props.onExploreMap}>EXPLORA EL MAPA <i className="m33-icon m33-icon-arrow-right"></i></Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}