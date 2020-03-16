import React from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  DatePicker,
  Select,
  Checkbox,
  Typography,
} from 'antd';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const { Option } = Select;
const { Text } = Typography;

const registerValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('Campo requerido.'),
  last_name: Yup.string().required('Campo requerido.'),
  email: Yup.string()
    .email()
    .required('Campo requerido.'),
  password: Yup.string().required('Campo requerido.'),
  birthday: Yup.date().required('Campo requerido.'),
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

  handleOnChangeCountry = (value, setFieldValue) => {
    setFieldValue('country', value);
  };

  handleOnChangeBirthday = (value, setFieldValue) => {
    setFieldValue('birthday', value.toDate());
  };

  render() {
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
            <Row gutter={16}>
              <Col md={16}>
                <h1 style={{ marginBottom: '20px' }}>Regístrate:</h1>
              </Col>
              <Col md={8}>
                <h2 className="text-right">
                  <Link
                    to="/login"
                    style={{ color: '#f576a9', fontWeight: 'bold' }}
                  >
                    Ya estoy registrado/a
                  </Link>
                </h2>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={16}>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="first_name"
                        className="inputprop"
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                      <DatePicker
                        name="birthday"
                        className="inputprop"
                        size="large"
                        type="text"
                        style={{ width: '100%' }}
                        placeholder="*Fecha Nacimiento:"
                        onChange={value => {
                          this.handleOnChangeBirthday(value, setFieldValue);
                        }}
                      />
                      <Text type="danger">{errors.birthday}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Select
                        name="gender"
                        className="inputprop"
                        size="large"
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
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="phone"
                        className="inputprop"
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
                        placeholder="*País:"
                        style={{ width: '100%' }}
                        onChange={value => {
                          this.handleOnChangeCountry(value, setFieldValue);
                        }}
                      >
                        <Option value="Bolivia">Bolivia</Option>
                        <Option value="Puerto Rico">Puerto Rico</Option>
                      </Select>
                      <Text type="danger">{errors.country}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="zip_code"
                        className="inputprop"
                        size="large"
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
                <div className="form-check">
                  <Checkbox
                    name="advs_by_email"
                    defaultChecked={false}
                    onChange={handleChange}
                  >
                    Deseo recibir promociones de Para la Naturaleza en mi correo
                    electrónico
                  </Checkbox>
                </div>
                <div className="form-check">
                  <Checkbox
                    name="advs_by_zip"
                    defaultChecked={false}
                    onChange={handleChange}
                  >
                    Deseo recibir promociones de Para la Naturalesa en mi
                    dirección postal
                  </Checkbox>
                </div>
                <div className="form-check">
                  <Checkbox
                    name="interested_volunteer"
                    defaultChecked={false}
                    onChange={handleChange}
                  >
                    Intereso ser voluntario / voluntaria
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={16}>
                <span>* Campos requeridos.</span>
              </Col>
              <Col md={8}>
                <div className="form-group text-right">
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
};

export default RegisterForm;
