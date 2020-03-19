import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Text } = Typography;

class RecoveryPasswordForm extends React.Component {
  render() {
    return (
        <form >
            <p className="text-center m-b-30">
              Por favor, escriba el correo electrónico con el cuál esta registrado:
            </p>
            <Row>
              <Col md={8}></Col>
              <Col md={8}>
                <div className="form-group">
                  <Input
                    name="email"
                    className="inputprop"
                    size="large"
                    type="text"
                    placeholder="Correo electrónico"
                  />
                </div>
                <Row>
                  <Col md={18}>
                    <Link
                      to="/forgot-password"
                      style={{ color: '#f576a9', fontWeight: 'bold' }}
                    >
                      ¿No tiene cuenta? Regístrese
                    </Link>
                  </Col>
                  <Col md={24} style={{textAlign: "center", marginTop: "25px"}}>
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-grey"
                      htmlType="submit"
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-purple"
                      htmlType="submit"
                      style={{marginLeft: "10px"}}
                    >
                      Enviar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
      </form>
    )
  }
}
export default RecoveryPasswordForm;
