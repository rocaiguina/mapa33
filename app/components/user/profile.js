import React from 'react';
import { Col, Divider, Row, Checkbox } from 'antd';
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
        <div className="page-title">
          <h2 style={{ color: '#fff' }}>{profile.full_name}</h2>
          <Row>
            <Col span={12}>
              {profile.createdAt && (
                <h4 style={{ color: '#fff' }}>
                  Registrado desde:{' '}
                  {moment(profile.createdAt, dateFormat).format(
                    dateHumanFormat
                  )}
                </h4>
              )}
            </Col>
            <Col span={12} className="text-right m-b-5">
              <Link
                to="/"
                style={{ color: '#f576a9', fontWeight: 'bold' }}
                onClick={this.props.onClickLogout}
              >
                Log Out
              </Link>
            </Col>
          </Row>
        </div>
        <Row>
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
        <Row gutter={16}>
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
          </Col>
          <Col md={12}>
            <Row>
              <Col md={16} className="blockprofilecheckbox m-b-10 m-t-10">
                <div className="form-check form-check-dark">
                  <Checkbox checked={profile.advs_by_email} disabled>
                    Deseo recibir promociones de Para la Naturaleza en mi correo
                    electrónico
                  </Checkbox>
                </div>
                <div className="form-check form-check-dark">
                  <Checkbox checked={profile.advs_by_zip} disabled>
                    Deseo recibir promociones de Para la Naturaleza en mi
                    dirección postal
                  </Checkbox>
                </div>
              </Col>
            </Row>
            <Divider
              dashed
              style={{ borderStyle: 'dotted', marginBottom: '12px' }}
            />
            <Row className="m-b-15">
              <ProfileActivity />
              {/*
              <h3 style={{ fontWeight: 900, color: '#fff' }}>
                Áreas Propuestas
              </h3>
              <Row>
                <Col md={12} sm={24} xs={24} className="toptableprofile">
                  <h3 style={{ color: '#fff', padding: '5px 10px' }}>
                    {profile.proposed_areas} <span>Áreas propuestas</span>
                  </h3>
                </Col>
                <Col md={12} sm={12} xs={12} className="lefttableprofile">
                  <h3 style={{ color: '#f576a9', padding: '5px 10px' }}>
                    {profile.approved_areas} <span>Áreas aceptadas</span>
                  </h3>
                </Col>
                <Col md={12} sm={12} xs={12} className="righttableprofile">
                  <h3 style={{ color: '#f576a9', padding: '5px 10px' }}>
                    {profile.supported_areas} <span>Áreas apoyadas</span>
                  </h3>
                </Col>
                <Col md={12} sm={12}></Col>
              </Row>
              */}
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
