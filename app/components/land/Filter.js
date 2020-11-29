import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';

const { Option } = Select;

class Filter extends React.Component {
  render() {
    return (
      <div className="land-filter">
        <div className="container">
          <Row gutter={16}>
            <Col xs={10} md={8}>
              <Row>
                <Col xs={24} md={6}>
                  <label>Pueblo</label>
                </Col>
                <Col xs={24} md={18}>
                  <Select
                    size="large"
                    className="ant-select-black ant-select-round"
                    value={this.props.region}
                    onChange={this.props.onChangeRegion}
                    style={{ width: '100%' }}
                  >
                    <Option value="">Todas</Option>
                    <Option value="Adjuntas">Adjuntas</Option>
                    <Option value="Aguada">Aguada</Option>
                    <Option value="Aguadilla">Aguadilla</Option>
                    <Option value="Aguas Buenass">Aguas Buenas</Option>
                    <Option value="Aibonito">Aibonito</Option>
                    <Option value="Añasco">Añasco</Option>
                    <Option value="Arecibo">Arecibo</Option>
                    <Option value="Arroyo">Arroyo</Option>
                    <Option value="Barceloneta">Barceloneta</Option>
                    <Option value="Barranquitas">Barranquitas</Option>
                    <Option value="Bayamón">Bayamón</Option>
                    <Option value="Cabo Rojo">Cabo Rojo</Option>
                    <Option value="Caguas">Caguas</Option>
                    <Option value="Camuy">Camuy</Option>
                    <Option value="Canóvanas">Canóvanas</Option>
                    <Option value="Carolina">Carolina</Option>
                    <Option value="Cataño">Cataño</Option>
                    <Option value="Cayey">Cayey</Option>
                    <Option value="Ceiba">Ceiba</Option>
                    <Option value="Ciales">Ciales</Option>
                    <Option value="Cidra">Cidra</Option>
                    <Option value="Coamo">Coamo</Option>
                    <Option value="Comerío">Comerío</Option>
                    <Option value="Corozal">Corozal</Option>
                    <Option value="Culebra">Culebra</Option>
                    <Option value="Dorado">Dorado</Option>
                    <Option value="Fajardo">Fajardo</Option>
                    <Option value="Florida">Florida</Option>
                    <Option value="Guánica">Guánica</Option>
                    <Option value="Guayama">Guayama</Option>
                    <Option value="Guayanilla">Guayanilla</Option>
                    <Option value="Guaynabo">Guaynabo</Option>
                    <Option value="Gurabo">Gurabo</Option>
                    <Option value="Hatillo">Hatillo</Option>
                    <Option value="Hormigueros">Hormigueros</Option>
                    <Option value="Humacao">Humacao</Option>
                    <Option value="Isabela">Isabela</Option>
                    <Option value="Jayuya">Jayuya</Option>
                    <Option value="Juana Díaz">Juana Díaz</Option>
                    <Option value="Juncos">Juncos</Option>
                    <Option value="Lajas">Lajas</Option>
                    <Option value="Lares">Lares</Option>
                    <Option value="Las Marías">Las Marías</Option>
                    <Option value="Las Piedras">Las Piedras</Option>
                    <Option value="Loíza">Loíza</Option>
                    <Option value="Luquillo">Luquillo</Option>
                    <Option value="Manatí">Manatí</Option>
                    <Option value="Maricao">Maricao</Option>
                    <Option value="Maunabo">Maunabo</Option>
                    <Option value="Mayagüez">Mayagüez</Option>
                    <Option value="Moca">Moca</Option>
                    <Option value="Morovis">Morovis</Option>
                    <Option value="Naguabo">Naguabo</Option>
                    <Option value="Naranjito">Naranjito</Option>
                    <Option value="Orocovis">Orocovis</Option>
                    <Option value="Patillas">Patillas</Option>
                    <Option value="Peñuelas">Peñuelas</Option>
                    <Option value="Ponce">Ponce</Option>
                    <Option value="Quebradillas">Quebradillas</Option>
                    <Option value="Rincón">Rincón</Option>
                    <Option value="Río Grande">Río Grande</Option>
                    <Option value="Sabana Grande">Sábana Grande</Option>
                    <Option value="Salinas">Salinas</Option>
                    <Option value="San Germán">San Germán</Option>
                    <Option value="San Juan">San Juan</Option>
                    <Option value="San Lorenzo">San Lorenzo</Option>
                    <Option value="San Sebastián">San Sebastián</Option>
                    <Option value="Santa Isabel">Santa Isabel</Option>
                    <Option value="Toa Alta">Toa Alta</Option>
                    <Option value="Toa Baja">Toa Baja</Option>
                    <Option value="Trujillo Alto">Trujillo Alto</Option>
                    <Option value="Utuado">Utuado</Option>
                    <Option value="Vega Alta">Vega Alta</Option>
                    <Option value="Vega Baja">Vega Baja</Option>
                    <Option value="Vieques">Vieques</Option>
                    <Option value="Villalba">Villalba</Option>
                    <Option value="Yabucoa">Yabucoa</Option>
                    <Option value="Yauco">Yauco</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col xs={7} md={7} lg={5}>
              <Row>
                <Col xs={24} md={8}>
                  <label>Vista</label>
                </Col>
                <Col xs={24} md={16}>
                  <Select
                    size="large"
                    className="ant-select-black ant-select-round"
                    value={this.props.view}
                    onChange={this.props.onChangeView}
                    style={{ width: '100%' }}
                  >
                    <Option value="map">Mapa</Option>
                    <Option value="list">Lista</Option>
                    <Option value="cards">Tarjetas</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col xs={7} md={7} lg={5}>
              <Row>
                <Col xs={24} md={8}>
                  <label>Estatus</label>
                </Col>
                <Col xs={24} md={16}>
                  <Select
                    size="large"
                    className="ant-select-black ant-select-round"
                    value={this.props.status}
                    onChange={this.props.onChangeStatus}
                    style={{ width: '100%' }}
                  >
                    <Option value="">Todas</Option>
                    <Option value="conserved">Protegidas</Option>
                    <Option value="proposed">Propuestas</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  region: PropTypes.string,
  view: PropTypes.string,
  status: PropTypes.string,
  onChangeRegion: PropTypes.func,
  onChangeView: PropTypes.func,
  onChangeStatus: PropTypes.func,
};

export default Filter;
