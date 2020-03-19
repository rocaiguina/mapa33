import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Text } = Typography;

class ResetPasswordForm extends React.Component {
  render() {
    return (
        <form >
            <Row>
                <Col md={6}></Col>
                <Col md={12}>
                    <div style={{fontWeight: "bold"}}>
                        <p >
                          Por favor, escriba su contraseña nueva, asegurese de no repetir su contraseña anterior.
                        </p>
                        <p>
                            Asegure de que contraseña tenga:
                        </p>

                        <ul>
                            <li>Al menos una letra mayúscula</li>
                            <li>Un mínimo de 8 carácteres</li>
                            <li>Al menos 1 carácter especial (*,&,@,$, por ejemplo)</li>
                        </ul>
                    </div>
                    
                    <div className="form-group">
                      <Input
                        name="new_password"
                        className="inputprop"
                        size="large"
                        type="password"
                        placeholder="Contraseña nueva"
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        name="same_password"
                        className="inputprop"
                        size="large"
                        type="password"
                        placeholder="Repetir contraseña nueva"
                      />
                    </div>
                    <Row style={{textAlign: "center"}}>
                        <Button
                          size="large"
                          shape="round"
                          className="ant-btn-purple"
                          htmlType="submit"
                          style={{marginTop: "50px"}}
                        >
                          Guardar
                        </Button>
                    </Row>
                </Col>
            </Row>
      </form>
    )
  }
}
export default ResetPasswordForm;
