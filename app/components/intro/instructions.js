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
              Si tu propuesta recibe suficiente apoyo, te daremos todas las herramientas para que comiences tu iniciativa. También puedes formar parte del proyecto apoyando las propuestas que te gustan, compartiendolas, y escribiendo en la parte de los comentarios.
              </p>
              <p>
              Tu participación nos ayuda a escribir una nueva historia para la naturaleza, compartiendo cómo ella forma parte de la tuya.
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