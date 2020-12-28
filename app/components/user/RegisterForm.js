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
  birthday_day: Yup.number().required('Campo requerido.'),
  birthday_month: Yup.number().required('Campo requerido.'),
  birthday_year: Yup.number().required('Campo requerido.'),
  phone: Yup.string().required('Campo requerido.'),
  address: Yup.string().required('Campo requerido.'),
  city: Yup.string().required('Campo requerido.'),
  country: Yup.string().required('Campo requerido.'),
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
                <Col md={16}>
                  <h2>Regístrate</h2>
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
            <Row gutter={16}>
              <Col md={16}>
                <Row gutter={16}>
                  <Col md={12}>
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
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="last_name"
                        className="inputprop"
                        type="text"
                        placeholder="*Apellidos:"
                        onChange={handleChange}
                      />
                      <Text type="danger">{errors.last_name}</Text>
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col md={12}>
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
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="password"
                        className="inputprop"
                        type="password"
                        placeholder="*Contraseña:"
                        onChange={handleChange}
                      />
                      <Text type="danger">{errors.password}</Text>
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <Select
                        name="birthday_day"
                        className="inputprop"
                        placeholder="*Día:"
                        style={{ width: 'calc(33% - 5.3px)', marginRight: 8 }}
                        onChange={value => {
                          this.handleOnChangeBirthdayDay(value, setFieldValue);
                        }}
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          option => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          )
                        )}
                      </Select>
                      <Select
                        name="birthday_month"
                        className="inputprop"
                        placeholder="*Mes:"
                        style={{ width: 'calc(33% - 5.3px)', marginRight: 8 }}
                        onChange={value => {
                          this.handleOnChangeBirthdayMonth(
                            value,
                            setFieldValue
                          );
                        }}
                      >
                        <Option value={0}>Enero</Option>
                        <Option value={1}>Febrero</Option>
                        <Option value={2}>Marzo</Option>
                        <Option value={3}>Abril</Option>
                        <Option value={4}>Mayo</Option>
                        <Option value={5}>Junio</Option>
                        <Option value={6}>Julio</Option>
                        <Option value={7}>Agosto</Option>
                        <Option value={8}>Septiembre</Option>
                        <Option value={9}>Octubre</Option>
                        <Option value={10}>Noviembre</Option>
                        <Option value={11}>Diciembre</Option>
                      </Select>
                      <Select
                        name="birthday_year"
                        className="inputprop"
                        placeholder="*Año:"
                        style={{ width: 'calc(33% - 5.3px)' }}
                        onChange={value => {
                          this.handleOnChangeBirthdayYear(value, setFieldValue);
                        }}
                      >
                        {[...Array(100)]
                          .map((year, i) => new Date().getFullYear() - i)
                          .map(option => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                      </Select>
                      <Text type="danger">{errors.birthday}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Select
                        name="gender"
                        className="inputprop"
                        placeholder="Sexo:"
                        style={{ width: '100%' }}
                        onChange={value => {
                          this.handleOnChangeGender(value, setFieldValue);
                        }}
                      >
                        <Option value="F">Femenino</Option>
                        <Option value="M">Masculino</Option>
                      </Select>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={16}>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="phone"
                        className="inputprop"
                        type="text"
                        placeholder="*Teléfono:"
                        onChange={handleChange}
                      />
                      <Text type="danger">{errors.phone}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="company"
                        className="inputprop"
                        type="text"
                        placeholder="Compañia:"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={24}>
                    <div className="form-group">
                      <Input
                        name="address"
                        className="inputprop"
                        type="text"
                        placeholder="*Dirección:"
                        onChange={handleChange}
                      />
                      <Text type="danger">{errors.address}</Text>
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="city"
                        className="inputprop"
                        type="text"
                        placeholder="*Ciudad:"
                        onChange={handleChange}
                      />
                      <Text type="danger">{errors.city}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="estate"
                        className="inputprop"
                        type="text"
                        placeholder="Estado/Territorio:"
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <Select
                        name="country"
                        className="inputprop"
                        placeholder="*País:"
                        style={{ width: '100%' }}
                        onChange={value => {
                          this.handleOnChangeCountry(value, setFieldValue);
                        }}
                      >
                        {this.renderContries()}
                      </Select>
                      <Text type="danger">{errors.country}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
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
                  </Col>
                </Row>
              </Col>
              <Col md={8}>
                <div className="m-b-20 m-t-20">
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className="form-check">
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
                      <Link
                        to="/page/terms-and-conditions"
                        style={{ color: '#222' }}
                      >
                        POLÍTICA DE PRIVACIDAD
                      </Link>
                    </Checkbox>
                    <Text type="danger">{errors.terms_and_conditions}</Text>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={16}>
                <div className="form-group">
                  <span>* Campos requeridos.</span>
                </div>
              </Col>
              <Col md={8}>
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
              </Col>
            </Row>
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
