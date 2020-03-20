import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Text } = Typography;

const forgotValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Campo requerido.'),
});

class ForgotPasswordForm extends React.Component {
  handleOnCancel = () => {
    window.history.back();
  };

  render() {
    return (
      <Formik
        onSubmit={this.props.onSubmit}
        validationSchema={forgotValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <p className="text-center m-b-30">
              Por favor, escriba el correo electrónico con el cuál esta
              registrado:
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
                    onChange={handleChange}
                  />
                  <Text type="danger">{errors.email}</Text>
                </div>
                <Row>
                  <Col md={18}>
                    <Link
                      to="/register/user"
                      style={{ color: '#f576a9', fontWeight: 'bold' }}
                    >
                      ¿No tiene cuenta? Regístrese
                    </Link>
                  </Col>
                  <Col
                    md={24}
                    style={{ textAlign: 'center', marginTop: '25px' }}
                  >
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-grey"
                      htmlType="submit"
                      onClick={this.handleOnCancel}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-purple"
                      htmlType="submit"
                      style={{ marginLeft: '10px' }}
                      loading={isSubmitting}
                    >
                      Enviar
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

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ForgotPasswordForm;
