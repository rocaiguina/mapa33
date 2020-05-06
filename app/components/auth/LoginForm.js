import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Text } = Typography;

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Campo requerido.'),
  password: Yup.string().required('Campo requerido.'),
});

class LoginForm extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={this.props.onSubmit}
        validationSchema={loginValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <p className="text-center m-b-30">
              Por favor, escriba su correo electrónico y contraseña para
              continuar.
            </p>
            <Row>
              <Col md={8}></Col>
              <Col md={8}>
                <div className="form-group">
                  <Input
                    name="email"
                    className="inputprop"
                    type="email"
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                  />
                  <Text type="danger">{errors.email}</Text>
                </div>
                <div className="form-group">
                  <Input
                    name="password"
                    className="inputprop"
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                  <Text type="danger">{errors.password}</Text>
                </div>
                <Row>
                  <Col md={12}>
                    <Link
                      to="/forgot-password"
                      style={{ color: '#f576a9', fontWeight: 'bold' }}
                    >
                      ¿Olvidó su contraseña?
                    </Link>
                    <br />
                    <Link
                      to="/register/user"
                      style={{ color: '#f576a9', fontWeight: 'bold' }}
                    >
                      Regístrate
                    </Link>
                  </Col>
                  <Col md={12} style={{ textAlign: 'right' }}>
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-purple"
                      htmlType="submit"
                      loading={isSubmitting}
                    >
                      Entrar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
