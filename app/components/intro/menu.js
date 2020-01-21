import React from 'react';
import { Card, Col, Row } from 'antd';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default (props) => {
  return (
      <div className="menublock">
        <Row>
          <Col lg={24}>           
              <div style={{borderBottom: "white dotted 1px"}}>
                <Button type="simplebtn" onClick={props.onExploreMap}>Sobre Mapa 33</Button>
              </div>
              <div style={{borderBottom: "white dotted 1px"}}>
                <Button type="simplebtn" onClick={props.onExploreMap}>Mapa Inicial</Button>
              </div>
              <div style={{borderBottom: "white dotted 1px"}}>
                <Button type="simplebtn" onClick={props.onExploreMap}>Listado de áreas</Button>
              </div>
              <div >
                <Button type="simplebtn" onClick={props.onExploreMap}>Proponer área</Button>
              </div>
          </Col>
        </Row>
      </div>
  );
}