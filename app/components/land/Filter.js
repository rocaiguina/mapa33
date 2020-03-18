import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';

const { Option } = Select;

class Filter extends React.Component {
  render() {
    return (
      <div className="land-filter">
        <Row gutter={16}>
          <Col span={8}>
            <Row>
              <Col xs={24} md={6}>
                <label>Región</label>
              </Col>
              <Col xs={24} md={18}>
                <Select
                  size="large"
                  className="ant-select-black ant-select-round"
                  defaultValue={this.props.defaultRegion}
                  onChange={this.props.onChangeRegion}
                  style={{ width: '100%' }}
                >
                  <Option value="">Todas</Option>
                  <Option value="adjuntas">Adjuntas</Option>
                  <Option value="aguada">Aguada</Option>
                  <Option value="aguadilla">Aguadilla</Option>
                  <Option value="aguas_buenas">Aguas Buenas</Option>
                  <Option value="aibonito">Aibonito</Option>
                  <Option value="anasco">Añasco</Option>
                  <Option value="arecibo">Arecibo</Option>
                  <Option value="arroyo">Arroyo</Option>
                  <Option value="barceloneta">Barceloneta</Option>
                  <Option value="barranquitas">Barranquitas</Option>
                  <Option value="bayamon">Bayamón</Option>
                  <Option value="cabo_rojo">Cabo Rojo</Option>
                  <Option value="caguas">Caguas</Option>
                  <Option value="camuy">Camuy</Option>
                  <Option value="canovanas">Canóvanas</Option>
                  <Option value="carolina">Carolina</Option>
                  <Option value="catano">Cataño</Option>
                  <Option value="cayey">cayey</Option>
                  <Option value="ceiba">Ceiba</Option>
                  <Option value="ciales">Ciales</Option>
                  <Option value="cidra">c\Cidra</Option>
                  <Option value="coamo">Coamo</Option>
                  <Option value="comerio">Comerío</Option>
                  <Option value="corozal">Corozal</Option>
                  <Option value="culebra">Culebra</Option>
                  <Option value="dorado">Dorado</Option>
                  <Option value="fajardo">Fajardo</Option>
                  <Option value="florida">Florida</Option>
                  <Option value="guanica">Guánica</Option>
                  <Option value="guayama">Guayama</Option>
                  <Option value="guayanilla">Guayanilla</Option>
                  <Option value="guaynabo">Guaynabo</Option>
                  <Option value="gurabo">Gurabo</Option>
                  <Option value="hatillo">Hatillo</Option>
                  <Option value="hormigueros">Hormigueros</Option>
                  <Option value="humacao">Humacao</Option>
                  <Option value="isabela">Isabela</Option>
                  <Option value="jayuya">Jayuya</Option>
                  <Option value="juana_diaz">Juana Díaz</Option>
                  <Option value="juncos">Juncos</Option>
                  <Option value="lajas">Lajas</Option>
                  <Option value="lares">Lares</Option>
                  <Option value="las_marias">Las Marías</Option>
                  <Option value="las_piedras">Las Piedras</Option>
                  <Option value="loiza">Loíza</Option>
                  <Option value="luquillo">Luquillo</Option>
                  <Option value="manati">Manatí</Option>
                  <Option value="maricao">Maricao</Option>
                  <Option value="maunabo">Maunabo</Option>
                  <Option value="mayaguez">Mayagüez</Option>
                  <Option value="moca">Moca</Option>
                  <Option value="morovis">Morovis</Option>
                  <Option value="naguabo">Naguabo</Option>
                  <Option value="naranjito">Naranjito</Option>
                  <Option value="orocovis">Orocovis</Option>
                  <Option value="patillas">Patillas</Option>
                  <Option value="penuelas">Peñuelas</Option>
                  <Option value="ponce">Ponce</Option>
                  <Option value="quebradillas">Quebradillas</Option>
                  <Option value="rincon">Rincón</Option>
                  <Option value="rio_grande">Río Grande</Option>
                  <Option value="sabana_grande">Sábana Grande</Option>
                  <Option value="salinas">Salinas</Option>
                  <Option value="san_german">San Germán</Option>
                  <Option value="san_juan">San Juan</Option>
                  <Option value="san_lorenzo">San Lorenzo</Option>
                  <Option value="san_sebastian">San Sebastián</Option>
                  <Option value="santa_isabel">Santa Isabel</Option>
                  <Option value="toa_alta">Toa Alta</Option>
                  <Option value="toa_baja">Toa Baja</Option>
                  <Option value="trujillo_alto">Trujillo Alto</Option>
                  <Option value="utuado">Utuado</Option>
                  <Option value="vega_alta">Vega Alta</Option>
                  <Option value="vega_baja">Vega Baja</Option>
                  <Option value="vieques">Vieques</Option>
                  <Option value="villalba">Villalba</Option>
                  <Option value="yabucoa">Yabucoa</Option>
                  <Option value="yauco">Yauco</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col xs={8} md={7} lg={5}>
            <Row>
              <Col xs={24} md={8}>
                <label>Vista</label>
              </Col>
              <Col xs={24} md={16}>
                <Select
                  size="large"
                  className="ant-select-black ant-select-round"
                  defaultValue={this.props.defaultView}
                  onChange={this.props.onChangeView}
                  style={{ width: '100%' }}
                >
                  <Option value="list">Lista</Option>
                  <Option value="card">Tarjetas</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col xs={8} md={7} lg={5}>
            <Row>
              <Col xs={24} md={8}>
                <label>Estatus</label>
              </Col>
              <Col xs={24} md={16}>
                <Select
                  size="large"
                  className="ant-select-black ant-select-round"
                  defaultValue={this.props.defaultStatus}
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
    );
  }
}

Filter.propTypes = {
  defaultRegion: PropTypes.string,
  defaultView: PropTypes.string,
  defaultStatus: PropTypes.string,
  onChangeRegion: PropTypes.func,
  onChangeView: PropTypes.func,
  onChangeStatus: PropTypes.func,
};

export default Filter;
