import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Button, Col, Input, Row, DatePicker, Select, Typography } from 'antd';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';
import { COUNTRIES } from '../../services/country';

const dateFormat = 'YYYY-MM-DD';
const dateHumanFormat = 'MMMM YYYY';
const { Option } = Select;
const { Text } = Typography;

const profileValidationSchema = Yup.object().shape({
  full_name: Yup.string().required('Campo requerido.'),
  birthday: Yup.date().required('Campo requerido.'),
  phone: Yup.string().required('Campo requerido.'),
  address: Yup.string().required('Campo requerido.'),
  city: Yup.string().required('Campo requerido.'),
  country: Yup.string().required('Campo requerido.'),
  zip_code: Yup.string().required('Campo requerido.'),
});

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnChangeGender = (value, setFieldValue) => {
    setFieldValue('gender', value);
  };

  handleOnChangeCountry = (value, setFieldValue) => {
    setFieldValue('country', value);
  };

  handleOnChangeBirthday = (value, setFieldValue) => {
    setFieldValue('birthday', value.toDate());
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
    return (
      <Formik
        initialValues={this.props.initialValues}
        enableReinitialize
        onSubmit={this.props.onSubmit}
        validationSchema={profileValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              className="page-title profiletitle"
              style={{ borderBottomColor: '#fff' }}
            >
              <Row>
                <Col xs={24} md={12}>
                  <div className="form-group">
                    <Input
                      name="full_name"
                      className="inputprop blackstyleinput"
                      type="text"
                      value={values.full_name}
                      onChange={handleChange}
                    />
                    <label className="text-darkgray">Nombre y apellidos</label>
                  </div>
                  {values.createdAt && (
                    <h4 style={{ color: '#fff' }}>
                      Registrado desde:{' '}
                      {moment(values.createdAt, dateFormat).format(
                        dateHumanFormat
                      )}
                    </h4>
                  )}
                </Col>
              </Row>
            </div>
            <Row>
              <Col xs={24} md={12}>
                <h3 style={{ fontWeight: 900, color: '#fff' }}>Datos</h3>
              </Col>
              <Col xs={24} md={12} className="hidden-xs">
                <div className="form-group text-right">
                  <Link
                    to="/profile"
                    className="ant-btn ant-btn-background-ghost ant-btn-round"
                  >
                    Cancelar
                  </Link>
                  <Button
                    shape="round"
                    className="ant-btn-purple"
                    htmlType="submit"
                    style={{ marginLeft: '5px' }}
                    loading={isSubmitting}
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col md={12}>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group">
                      <DatePicker
                        name="birthday"
                        className="dateinput blackstyleinput"
                        type="text"
                        style={{ width: '100%' }}
                        value={moment(values.birthday, dateFormat)}
                        format={dateFormat}
                        onChange={value => {
                          this.handleOnChangeBirthday(value, setFieldValue);
                        }}
                      />
                      <label className="text-darkgray">Nacimiento</label>
                      <Text type="danger">{errors.birthday}</Text>
                    </div>
                    <div className="form-group">
                      <Input
                        name="email"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.email}
                        readOnly
                        disabled
                      />
                      <label className="text-darkgray">
                        Correo Electrónico
                      </label>
                    </div>
                    <div className="form-group">
                      <Input
                        name="phone"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <label className="text-darkgray">Teléfono</label>
                      <Text type="danger">{errors.phone}</Text>
                    </div>
                    <div className="form-group">
                      <Select
                        name="gender"
                        className="inputprop blackstyleinput"
                        style={{ width: '100%' }}
                        value={values.gender}
                        onChange={value => {
                          this.handleOnChangeGender(value, setFieldValue);
                        }}
                      >
                        <Option value="F">Femenino</Option>
                        <Option value="M">Masculino</Option>
                      </Select>
                      <label className="text-darkgray">Género</label>
                      <Text type="danger">{errors.gender}</Text>
                    </div>
                    <div className="form-group">
                      <Input
                        name="company"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.company}
                        onChange={handleChange}
                      />
                      <label className="text-darkgray">
                        Nombre de compañia
                      </label>
                      <Text type="danger">{errors.company}</Text>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <Input
                        name="address"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.address}
                        onChange={handleChange}
                      />
                      <label className="text-darkgray">Dirección</label>
                      <Text type="danger">{errors.address}</Text>
                    </div>
                    <div className="form-group">
                      <Input
                        name="city"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.city}
                        onChange={handleChange}
                      />
                      <label className="text-darkgray">Ciudad</label>
                      <Text type="danger">{errors.city}</Text>
                    </div>
                    <div className="form-group">
                      <Input
                        name="estate"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.estate}
                        onChange={handleChange}
                      />
                      <label className="text-darkgray">Estado/Territorio</label>
                      <Text type="danger">{errors.estate}</Text>
                    </div>
                    <div className="form-group">
                      <Select
                        name="country"
                        className="inputprop blackstyleinput"
                        style={{ width: '100%' }}
                        value={values.country}
                        onChange={value => {
                          this.handleOnChangeCountry(value, setFieldValue);
                        }}
                      >
                        {this.renderContries()}
                      </Select>
                      <label className="text-darkgray">País</label>
                      <Text type="danger">{errors.gender}</Text>
                    </div>
                    <div className="form-group">
                      <Input
                        name="zip_code"
                        className="inputprop blackstyleinput"
                        type="text"
                        value={values.zip_code}
                        onChange={handleChange}
                      />
                      <label className="text-darkgray">Código postal</label>
                      <Text type="danger">{errors.gender}</Text>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                {/*
                <Row>
                  <Col md={16} className="blockprofilecheckbox m-b-10">
                    <div className="form-check">
                      <Checkbox
                        name="advs_by_email"
                        style={{ color: '#fff' }}
                        checked={values.advs_by_email}
                        onChange={handleChange}
                      >
                        Deseo recibir contenido personalizado de Para la
                        Naturaleza
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
                */}
                <div className="form-group text-center visible-xs m-t-10">
                  <Link
                    to="/profile"
                    className="ant-btn ant-btn-background-ghost ant-btn-round"
                  >
                    Cancelar
                  </Link>
                  <Button
                    shape="round"
                    className="ant-btn-purple"
                    htmlType="submit"
                    style={{ marginLeft: '5px' }}
                    loading={isSubmitting}
                  >
                    Guardar Cambios
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

ProfileForm.defaultProps = {
  initialValues: {},
};

ProfileForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ProfileForm;
