import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Text } = Typography;

class RecoveryPasswordSuccess extends React.Component {
  render() {
    return (
        <Row>
            <p className="text-center m-b-30" style={{fontWeight: "bold"}}>
              Gracias, verifique su correo electrónico para recuperar su contraseña
            </p>
            <Row>
              <Col md={8}></Col>
              <Col md={8} style={{textAlign: "center"}}>                
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-purple"
                      htmlType="submit"
                    >
                      Volver al inicio
                    </Button>
              </Col>
            </Row>
      </Row>
    )
  }
}
export default RecoveryPasswordSuccess;
