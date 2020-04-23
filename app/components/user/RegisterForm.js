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
import { readRemoteFile } from 'react-papaparse'

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

  renderContries(){
    var paises = ['Afganistán','Albania','Alemania','Algeria','Andorra','Angola','Anguila','Antártida','Antigua y Barbuda','Antillas Neerlandesas','Arabia Saudita','Argentina','Armenia','Aruba','Australia','Austria','Azerbayán','Bahamas','Bahrein','Bangladesh','Barbados','Bélgica','Belice','Benín','Bhután','Bielorrusia','Birmania','Bolivia','Bosnia y Herzegovina','Botsuana','Brasil','Brunéi','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Camboya','Camerún','Canadá','Chad','Chile','China','Chipre','Ciudad del Vaticano','Colombia','Comoras','Congo','Congo','Corea del Norte','Corea del Sur','Costa de Marfil','Costa Rica','Croacia','Cuba','Dinamarca','Dominica','Ecuador','Egipto','El Salvador','Emiratos Árabes Unidos','Eritrea','Escocia','Eslovaquia','Eslovenia','España','Estados Unidos de América','Estonia','Etiopía','Filipinas','Finlandia','Fiyi','Francia','Gabón','Gales','Gambia','Georgia','Ghana','Gibraltar','Granada','Grecia','Groenlandia','Guadalupe','Guam','Guatemala','Guayana Francesa','Guernsey','Guinea','Guinea Ecuatorial','Guinea-Bissau','Guyana','Haití','Honduras','Hong kong','Hungría','India','Indonesia','Inglaterra','Irak','Irán','Irlanda','Irlanda del Norte','Isla Bouvet','Isla de Man','Isla de Navidad','Isla Norfolk','Islandia','Islas Bermudas','Islas Caimán','Islas Cocos (Keeling)','Islas Cook','Islas de Åland','Islas Feroe','Islas Georgias del Sur y Sandwich del Sur','Islas Heard y McDonald','Islas Maldivas','Islas Malvinas','Islas Marianas del Norte','Islas Marshall','Islas Pitcairn','Islas Salomón','Islas Turcas y Caicos','Islas Ultramarinas Menores de Estados Unidos','Islas Vírgenes Británicas','Islas Vírgenes de los Estados Unidos','Israel','Italia','Jamaica','Japón','Jersey','Jordania','Kazajistán','Kenia','Kirgizstán','Kiribati','Kuwait','Laos','Lesoto','Letonia','Líbano','Liberia','Libia','Liechtenstein','Lituania','Luxemburgo','Macao','Macedônia','Madagascar','Malasia','Malawi','Mali','Malta','Marruecos','Martinica','Mauricio','Mauritania','Mayotte','México','Micronesia','Moldavia','Mónaco','Mongolia','Montenegro','Montserrat','Mozambique','Namibia','Nauru','Nepal','Nicaragua','Niger','Nigeria','Niue','Noruega','Nueva Caledonia','Nueva Zelanda','Omán','Países Bajos','Pakistán','Palau','Palestina','Panamá','Papúa Nueva Guinea','Paraguay','Perú','Polinesia Francesa','Polonia','Portugal','Puerto Rico','Qatar','Reino Unido','República Centroafricana','República Checa','República Dominicana','Reunión','Ruanda','Rumanía','Rusia','Sahara Occidental','Samoa','Samoa Americana','San Bartolomé','San Cristóbal y Nieves','San Marino','San Martín (Francia)','San Pedro y Miquelón','San Vicente y las Granadinas','Santa Elena','Santa Lucía','Santo Tomé y Príncipe','Senegal','Serbia','Seychelles','Sierra Leona','Singapur','Siria','Somalia','Sri lanka','Sudáfrica','Sudán','Suecia','Suiza','Surinám','Svalbard y Jan Mayen','Swazilandia','Tadjikistán','Tailandia','Taiwán','Tanzania','Territorio Británico del Océano Índico','Territorios Australes y Antárticas Franceses','Timor Oriental','Togo','Tokelau','Tonga','Trinidad y Tobago','Tunez','Turkmenistán','Turquía','Tuvalu','Ucrania','Uganda','Uruguay','Uzbekistán','Vanuatu','Venezuela','Vietnam','Wallis y Futuna','Yemen','Yibuti','Zambia','Zimbabue'];
    var options = [];
    for (var i in paises) {
        options.push(<Option value={paises[i]}>{paises[i]}</Option>)         
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
                      <DatePicker
                        name="birthday"
                        className="inputprop"
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
                  <div className="form-check">
                    <Checkbox
                      name="advs_by_email"
                      defaultChecked={false}
                      onChange={handleChange}
                    >
                      Deseo recibir promociones de Para la Naturaleza en mi
                      correo electrónico
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
