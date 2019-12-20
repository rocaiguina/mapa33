import React from 'react';
import { Card, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default (props) => {
  return (
    <div className="intro">
      <div className="intro-text">
        <div className="intro-close">
          <Button type="primary" ghost size="large" onClick={props.onClose}>
            <Icon type="close" />
          </Button>
        </div>
        <Row>
          <Col lg={{ span: 6, offset: 9 }}>
            <Card className="ant-card-intro ant-card-round ant-card-green">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                ut laoreet dolore magna aliquam erat volutpat. Ut wisi.
              </p>
              <p>
                Lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit
                in vulputate velit.
              </p>
              <br/>
              <div className="text-center">
                <Button type="primary" onClick={props.onExploreMap}>EXPLORA EL MAPA <Icon type="arrow-right"/></Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}