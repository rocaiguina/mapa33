import React from 'react';
import { Button, Col, Input, Row, Select, Checkbox, Typography } from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { COUNTRIES } from '../../services/country';

const { Option } = Select;
const { Text } = Typography;

const registerValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('Campo requerido.'),
  last_name: Yup.string().required('Campo requerido.'),
  email: Yup.string()
    .email()
    .required('Campo requerido.'),
  password: Yup.string().required('Campo requerido.'),
  birthday_day: Yup.number(),
  birthday_month: Yup.number(),
  birthday_year: Yup.number(),
  phone: Yup.string(),
  address: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
  zip_code: Yup.string().required('Campo requerido.'),
  terms_and_conditions: Yup.boolean()
    .required('Debes aceptar los términos y condiciones.')
    .oneOf([true], 'Debes aceptar los términos y condiciones.'),
});

class RegisterForm extends React.Component {
  handleOnChangeGender = (value, setFieldValue) => {
    setFieldValue('gender', value);
  };

  handleOnChangeBirthdayDay = (value, setFieldValue) => {
    setFieldValue('birthday_day', value);
  };

  handleOnChangeBirthdayMonth = (value, setFieldValue) => {
    setFieldValue('birthday_month', value);
  };

  handleOnChangeBirthdayYear = (value, setFieldValue) => {
    setFieldValue('birthday_year', value);
  };

  handleOnChangeCountry = (value, setFieldValue) => {
    setFieldValue('country', value);
  };

  renderContries() {
    var paises = COUNTRIES;
    var options = [];
    for (var i in paises) {
      options.push(
        <Option key={i} value={paises[i]}>
          {paises[i]}
        </Option>
      );
    }
    return options;
  }

  render() {
    const { next } = this.props;
    return (
      <Formik
        onSubmit={this.props.onSubmit}
        validationSchema={registerValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="m-b-15">
              <Row gutter={16}>
                <Col md={{ span: 8, offset: 8 }}>
                  <h2>Regístrate</h2>
                  <div className="form-group">
                    <Input
                      name="first_name"
                      className="inputprop"
                      type="text"
                      placeholder="*Nombre:"
                      onChange={handleChange}
                    />
                    <Text type="danger">{errors.first_name}</Text>
                  </div>
                  <div className="form-group">
                    <Input
                      name="last_name"
                      className="inputprop"
                      type="text"
                      placeholder="*Apellido:"
                      onChange={handleChange}
                    />
                    <Text type="danger">{errors.last_name}</Text>
                  </div>
                  <div className="form-group">
                    <Input
                      name="email"
                      className="inputprop"
                      type="text"
                      placeholder="*Email:"
                      onChange={handleChange}
                    />
                    <Text type="danger">{errors.email}</Text>
                  </div>
                  <div className="form-group">
                    <Input
                      name="zip_code"
                      className="inputprop"
                      type="text"
                      placeholder="*Código postal:"
                      onChange={handleChange}
                    />
                    <Text type="danger">{errors.zip_code}</Text>
                  </div>
                  <div className="form-group">
                    <Input
                      name="password"
                      className="inputprop"
                      type="password"
                      placeholder="*Crear contraseña:"
                      onChange={handleChange}
                    />
                    <Text type="danger">{errors.password}</Text>
                  </div>
                  <div className="m-b-20 m-t-20">
                    <br />
                    <div className="form-check m-t-10">
                      <Checkbox
                        name="advs_by_email"
                        defaultChecked={false}
                        onChange={handleChange}
                      >
                        Deseo recibir contenido personalizado de Para la
                        Naturaleza
                      </Checkbox>
                    </div>
                    <div className="form-check">
                      <Checkbox
                        name="terms_and_conditions"
                        defaultChecked={false}
                        onChange={handleChange}
                      >
                        He leído y acepto la{' '}
                        <a target="_blank" href="/images/PP-mapa33.pdf">
                          POLÍTICA DE PRIVACIDAD
                        </a>
                      </Checkbox>
                      <Text type="danger">{errors.terms_and_conditions}</Text>
                    </div>
                  </div>
                  <div className="form-group text-right text-center-xs">
                    <Button
                      size="large"
                      shape="round"
                      className="ant-btn-purple"
                      htmlType="submit"
                      loading={isSubmitting}
                    >
                      REGISTRAR
                    </Button>
                  </div>
                  <div className="form-group">
                    <span>* Campos requeridos.</span>
                  </div>
                </Col>
                <Col md={8}>
                  <h3 className="text-right text-left-xs">
                    <Link
                      to={next ? '/login?next=' + next : '/login'}
                      style={{ color: '#f576a9', fontWeight: 'bold' }}
                    >
                      Ya estoy registrado/a
                    </Link>
                  </h3>
                </Col>
              </Row>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  next: PropTypes.string,
};

export default RegisterForm;
