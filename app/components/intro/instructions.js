import React from 'react';
import { Card, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default props => {
  return (
    <div className="intro">
      <div className="intro-text">
        <Row>
          <Col lg={{ span: 8, offset: 8 }}>
            <Card className="ant-card-intro ant-card-round ant-card-green">
              <p>
                <b>¿Que puedes hacer en Mapa 33?</b>
                <br />
                En este mapa especial tu puedes proponer áreas para crear
                iniciativas junto a PLN, para proteger o crear usos de beneficio
                para el bienestar ecológico-cultural de Puerto Rico.
              </p>
              <p>
                <b>Maneras de usar este mapa:</b>
                <br />
                1 - Proponiendo áreas por medio del botón de ”Proponer Área”
                <br />2 - Explorando el mapa de las áreas propuestas, en el cual
                podrás accesar y ver en detalle las áreas propuestas e
                interactuar con las mismas por medio de apoyarlas y compartir en
                sus redes sociales en señal de apoyo.
              </p>
              <p>
                <b>Una colaboración con PLN:</b>
                <br />
                Aquí un enlace que explica como PLN hará uso de este mapa.
              </p>
              <br />
              <div className="text-center">
                <Button type="primary" onClick={props.onExploreMap}>
                  EXPLORA EL MAPA <Icon type="arrow-right" />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
