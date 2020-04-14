import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  DatePicker,
  Select,
  Checkbox,
  Typography,
} from 'antd';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const dateHumanFormat = 'MMMM YYYY';
import { readRemoteFile } from 'react-papaparse'
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
    
  renderContries(){
    var paises = ['Afganistán','Albania','Alemania','Algeria','Andorra','Angola','Anguila','Antártida','Antigua y Barbuda','Antillas Neerlandesas','Arabia Saudita','Argentina','Armenia','Aruba','Australia','Austria','Azerbayán','Bahamas','Bahrein','Bangladesh','Barbados','Bélgica','Belice','Benín','Bhután','Bielorrusia','Birmania','Bolivia','Bosnia y Herzegovina','Botsuana','Brasil','Brunéi','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Camboya','Camerún','Canadá','Chad','Chile','China','Chipre','Ciudad del Vaticano','Colombia','Comoras','Congo','Congo','Corea del Norte','Corea del Sur','Costa de Marfil','Costa Rica','Croacia','Cuba','Dinamarca','Dominica','Ecuador','Egipto','El Salvador','Emiratos Árabes Unidos','Eritrea','Escocia','Eslovaquia','Eslovenia','España','Estados Unidos de América','Estonia','Etiopía','Filipinas','Finlandia','Fiyi','Francia','Gabón','Gales','Gambia','Georgia','Ghana','Gibraltar','Granada','Grecia','Groenlandia','Guadalupe','Guam','Guatemala','Guayana Francesa','Guernsey','Guinea','Guinea Ecuatorial','Guinea-Bissau','Guyana','Haití','Honduras','Hong kong','Hungría','India','Indonesia','Inglaterra','Irak','Irán','Irlanda','Irlanda del Norte','Isla Bouvet','Isla de Man','Isla de Navidad','Isla Norfolk','Islandia','Islas Bermudas','Islas Caimán','Islas Cocos (Keeling)','Islas Cook','Islas de Åland','Islas Feroe','Islas Georgias del Sur y Sandwich del Sur','Islas Heard y McDonald','Islas Maldivas','Islas Malvinas','Islas Marianas del Norte','Islas Marshall','Islas Pitcairn','Islas Salomón','Islas Turcas y Caicos','Islas Ultramarinas Menores de Estados Unidos','Islas Vírgenes Británicas','Islas Vírgenes de los Estados Unidos','Israel','Italia','Jamaica','Japón','Jersey','Jordania','Kazajistán','Kenia','Kirgizstán','Kiribati','Kuwait','Laos','Lesoto','Letonia','Líbano','Liberia','Libia','Liechtenstein','Lituania','Luxemburgo','Macao','Macedônia','Madagascar','Malasia','Malawi','Mali','Malta','Marruecos','Martinica','Mauricio','Mauritania','Mayotte','México','Micronesia','Moldavia','Mónaco','Mongolia','Montenegro','Montserrat','Mozambique','Namibia','Nauru','Nepal','Nicaragua','Niger','Nigeria','Niue','Noruega','Nueva Caledonia','Nueva Zelanda','Omán','Países Bajos','Pakistán','Palau','Palestina','Panamá','Papúa Nueva Guinea','Paraguay','Perú','Polinesia Francesa','Polonia','Portugal','Puerto Rico','Qatar','Reino Unido','República Centroafricana','República Checa','República Dominicana','Reunión','Ruanda','Rumanía','Rusia','Sahara Occidental','Samoa','Samoa Americana','San Bartolomé','San Cristóbal y Nieves','San Marino','San Martín (Francia)','San Pedro y Miquelón','San Vicente y las Granadinas','Santa Elena','Santa Lucía','Santo Tomé y Príncipe','Senegal','Serbia','Seychelles','Sierra Leona','Singapur','Siria','Somalia','Sri lanka','Sudáfrica','Sudán','Suecia','Suiza','Surinám','Svalbard y Jan Mayen','Swazilandia','Tadjikistán','Tailandia','Taiwán','Tanzania','Territorio Británico del Océano Índico','Territorios Australes y Antárticas Franceses','Timor Oriental','Togo','Tokelau','Tonga','Trinidad y Tobago','Tunez','Turkmenistán','Turquía','Tuvalu','Ucrania','Uganda','Uruguay','Uzbekistán','Vanuatu','Venezuela','Vietnam','Wallis y Futuna','Yemen','Yibuti','Zambia','Zimbabue'];
    var options = [];
    for (var i in paises) {
        options.push(<Option value={paises[i]}>{paises[i]}</Option>)         
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
                      size="large"
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
                    className="ant-btn ant-btn-background-ghost ant-btn-round ant-btn-lg"
                  >
                    Cancelar
                  </Link>
                  <Button
                    size="large"
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
                        size="large"
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
                        size="large"
                        type="text"
                        value={values.email}
                        readonly
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                <Row>
                  <Col md={16} className="blockprofilecheckbox m-b-10 m-t-10">
                    <div className="form-check">
                      <Checkbox
                        name="advs_by_email"
                        style={{ color: '#fff' }}
                        checked={values.advs_by_email}
                        onChange={handleChange}
                      >
                        Deseo recibir promociones de Para la Naturaleza en mi
                        correo electrónico
                      </Checkbox>
                    </div>
                    <div className="form-check">
                      <Checkbox
                        name="advs_by_zip"
                        style={{ color: '#fff' }}
                        checked={values.advs_by_zip}
                        onChange={handleChange}
                      >
                        Deseo recibir promociones de Para la Naturaleza en mi
                        dirección postal
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
                <div className="form-group text-center visible-xs m-t-10">
                  <Link
                    to="/profile"
                    className="ant-btn ant-btn-background-ghost ant-btn-round ant-btn-lg"
                  >
                    Cancelar
                  </Link>
                  <Button
                    size="large"
                    shape="round"
                    className="ant-btn-purple"
                    htmlType="submit"
                    style={{ marginLeft: '5px' }}
                    loading={isSubmitting}
                  >
                    Guardar Cambios
                  </Button>
                </div>
                <Divider
                  dashed
                  style={{ borderStyle: 'dotted', marginBottom: '12px' }}
                />
                <Row>
                  <h3 style={{ fontWeight: 900, color: '#fff' }}>
                    Áreas Propuestas
                  </h3>
                  <Row>
                    <Col md={12} sm={24} xs={24} className="toptableprofile">
                      <h2 style={{ color: '#fff', padding: '5px 10px' }}>
                        {values.proposed_areas} <span>Áreas propuestas</span>
                      </h2>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="lefttableprofile">
                      <h2 style={{ color: '#f576a9', padding: '5px 10px' }}>
                        {values.approved_areas} <span>Áreas aceptadas</span>
                      </h2>
                    </Col>
                    <Col md={12} sm={12} xs={12} className="righttableprofile">
                      <h2 style={{ color: '#f576a9', padding: '5px 10px' }}>
                        {values.supported_areas} <span>Áreas apoyadas</span>
                      </h2>
                    </Col>
                    <Col md={12} sm={12}></Col>
                  </Row>
                </Row>
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
