import React from 'react';
import { Button, Card, Col, Row } from 'antd';

export default (props) => {
  return (
    <div className="intro">
      <div>
        <Button onClick={props.onClose}>X</Button>
      </div>
      <Row>
        <Col md={{ span: 10, offset: 7 }}>
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
            <div>
              <Button onClick={props.onExploreMap}>EXPLORA EL MAPA <i className="m33-icon m33-icon-arrow-right"></i></Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}