import React from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Text } = Typography;

const resetPasswordValidationSchema = Yup.object().shape({
  new_password: Yup.string().required('Campo requerido.'),
  confirm_password: Yup.string()
    .required('Campo requerido.')
    .oneOf([Yup.ref('new_password'), null], 'No coinciden las contraseñas.'),
});

class ResetPasswordForm extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={this.props.onSubmit}
        validationSchema={resetPasswordValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}></Col>
              <Col md={12}>
                <p>
                  Por favor, escriba su contraseña nueva, asegurese de no
                  repetir su contraseña anterior.
                </p>
                <p>Asegure de que contraseña tenga:</p>
                <ul>
                  <li>Al menos una letra mayúscula</li>
                  <li>Un mínimo de 8 carácteres</li>
                  <li>Al menos 1 carácter especial (*,&,@,$, por ejemplo)</li>
                </ul>
                <div className="form-group">
                  <Input
                    name="new_password"
                    className="inputprop"
                    type="password"
                    placeholder="Contraseña nueva"
                    onChange={handleChange}
                  />
                  <Text type="danger">{errors.new_password}</Text>
                </div>
                <div className="form-group">
                  <Input
                    name="confirm_password"
                    className="inputprop"
                    type="password"
                    placeholder="Repetir contraseña nueva"
                    onChange={handleChange}
                  />
                  <Text type="danger">{errors.confirm_password}</Text>
                </div>
                <div className="text-center m-t-50">
                  <Button
                    size="large"
                    shape="round"
                    className="ant-btn-purple"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Guardar
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    );
  }
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ResetPasswordForm;
