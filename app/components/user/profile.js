import React from 'react';
import { Col, Divider, Radio, Row } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProfileActivity from '../../containers/user/ProfileActivity';

const dateFormat = 'YYYY-MM-DD';
const dateHumanFormat = 'MMMM YYYY';

class Profile extends React.Component {
  render() {
    const profile = this.props.initialValues;
    return (
      <div>
        <div className="profile-username">
          <h2 style={{ color: '#fff' }}>{profile.full_name}</h2>
        </div>
        <Row>
          <Col span={12}>
            {profile.createdAt && (
              <h4 style={{ color: '#fff', margin: '0' }}>
                Registrado desde:{' '}
                {moment(profile.createdAt, dateFormat).format(dateHumanFormat)}
              </h4>
            )}
          </Col>
          <Col span={12} className="text-right">
            <Link
              to="/"
              style={{ color: '#f576a9', fontWeight: 'bold' }}
              onClick={this.props.onClickLogout}
            >
              Log Out
            </Link>
          </Col>
        </Row>
        <Divider dashed style={{ borderStyle: 'dotted', margin: '15px 0' }} />
        <Row className="m-t-15">
          <Col span={12}>
            <h3 style={{ fontWeight: 900, color: '#fff' }}>Datos</h3>
          </Col>
          <Col span={12} className="text-right">
            <Link
              to="/profile/edit"
              style={{ color: '#f576a9', fontWeight: 'bold', right: 0 }}
            >
              Editar
            </Link>
          </Col>
        </Row>
        <Row gutter={16} className="m-t-15">
          <Col md={12}>
            <Row gutter={16}>
              <Col md={12}>
                <h3>Agosto 21,1989</h3>
                <p className="text-darkgray">Nacimiento</p>
                <h3>{profile.email}</h3>
                <p className="text-darkgray">Correo Electrónico</p>
                <h3>{profile.phone}</h3>
                <p className="text-darkgray">Teléfono</p>
                <h3>{profile.gender == 'F' ? 'Femenino' : 'Masculino'}</h3>
                <p className="text-darkgray">Género</p>
                <h3>{profile.company}</h3>
                <p className="text-darkgray">Nombre de compañia</p>
              </Col>
              <Col md={12}>
                <h3>{profile.address}</h3>
                <p className="text-darkgray">Dirección</p>
                <h3>{profile.city}</h3>
                <p className="text-darkgray">Ciudad</p>
                <h3>{profile.estate}</h3>
                <p className="text-darkgray">Estado/Territorio</p>
                <h3>{profile.country}</h3>
                <p className="text-darkgray">País</p>
                <h3>{profile.zip_code}</h3>
                <p className="text-darkgray">Código postal</p>
              </Col>
            </Row>
            <Row className="m-b-15">
              <Col xs={16}>
                Deseo recibir contenido personalizado de Para la Naturaleza
              </Col>
              <Col xs={8}>
                <Radio.Group
                  value={profile.advs_by_email}
                  buttonStyle="solid"
                  className="radio-group-style2"
                  disabled
                >
                  <Radio.Button value={true}>Sí</Radio.Button>
                  <Radio.Button value={false}>No</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Divider
              dashed
              style={{ borderStyle: 'dotted', margin: '0 0 15px 0' }}
            />
            <Row className="m-b-15">
              <h3>Mi actividad de Áreas</h3>
              <ProfileActivity />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Profile.defaultProps = {
  initialValues: {},
};

Profile.propTypes = {
  initialValues: PropTypes.object,
  onClickLogout: PropTypes.func,
};

export default Profile;
