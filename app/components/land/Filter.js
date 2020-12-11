import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Button, Col, Icon, Input, Row, Select } from 'antd';

import CIcon from '../ui/Icon';

const { Option } = Select;

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleOnSearchKeyword = value => {
    this.setState({
      text: value,
    });
    this.props.onSearchKeyword(value);
  };

  handleOnSearch = () => {
    const { text } = this.state;
    this.props.onSearch(text);
  };

  handleOnKeyPress = e => {
    if (e.which === 13 || e.keyCode === 13) {
      const { text } = this.state;
      this.props.onSearch(text);
    }
  };

  render() {
    const {
      dataLand,
      region,
      useType,
      size,
      onChangeRegion,
      onChangeUseType,
      onChangeSize,
      onChangeStatus,
      onChangeView,
      onSelectLand,
    } = this.props;
    return (
      <div className="land-filter">
        <div className="container">
          <Row gutter={16}>
            <Col md={11}>
              <AutoComplete
                className="ant-select-auto-complete-dark ant-select-auto-complete-round"
                size="large"
                style={{ width: '100%' }}
                dataSource={dataLand}
                placeholder="Entra keywords"
                onSearch={this.handleOnSearchKeyword}
                onSelect={onSelectLand}
                defaultActiveFirstOption={false}
              >
                <Input
                  suffix={<Icon type="search" onClick={this.handleOnSearch} />}
                  onKeyPress={this.handleOnKeyPress}
                />
              </AutoComplete>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col md={6} xs={12}>
              <label>Region</label>
              <Select
                size="large"
                className="ant-select-black ant-select-round"
                value={region}
                onChange={onChangeRegion}
                style={{ width: '100%' }}
                showSearch
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
            <Col md={6} xs={12} className="visible-xs">
              <Row gutter={16}>
                <Col md={12} xs={12}>
                  <label>Estatus</label>
                  <Button
                    block
                    shape="round"
                    size="large"
                    className="ant-btn-background-ghost ant-btn-land-status"
                    onClick={onChangeStatus}
                  >
                    <CIcon type="layers" />
                  </Button>
                </Col>
                <Col md={12} xs={12}>
                  <label>Vista</label>
                  <Button
                    block
                    shape="round"
                    size="large"
                    className="ant-btn-background-ghost ant-btn-land-view"
                    onClick={onChangeView}
                  >
                    <CIcon type="eye" />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={12}>
              <label>Tipo de Uso</label>
              <Select
                size="large"
                className="ant-select-black ant-select-round"
                value={useType}
                onChange={onChangeUseType}
                style={{ width: '100%' }}
              >
                <Option value="">Todas</Option>
                <Option value="Agricolas">Agricolas</Option>
              </Select>
            </Col>
            <Col md={6} xs={12}>
              <label>Tamaño</label>
              <Select
                size="large"
                className="ant-select-black ant-select-round"
                value={size}
                onChange={onChangeSize}
                style={{ width: '100%' }}
              >
                <Option value="">Todas</Option>
                <Option value="ASC">Menor a Mayor</Option>
                <Option value="DESC">Mayor a Menor</Option>
              </Select>
            </Col>
            <Col md={6} className="hidden-xs">
              <Row gutter={16}>
                <Col md={12}>
                  <label>Estatus</label>
                  <Button
                    block
                    shape="round"
                    size="large"
                    className="ant-btn-background-ghost ant-btn-land-status"
                    onClick={onChangeStatus}
                  >
                    <CIcon type="layers" />
                  </Button>
                </Col>
                <Col md={12}>
                  <label>Vista</label>
                  <Button
                    block
                    shape="round"
                    size="large"
                    className="ant-btn-background-ghost ant-btn-land-view"
                    onClick={onChangeView}
                  >
                    <CIcon type="eye" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Filter.defaultProps = {
  dataLand: [],
  region: '',
  useType: '',
  size: '',
  onChangeRegion: () => {},
  onChangeUseType: () => {},
  onChangeSize: () => {},
  onChangeStatus: () => {},
  onChangeView: () => {},
  onSearchKeyword: () => {},
  onSelectLand: () => {},
  onSearch: () => {},
};

Filter.propTypes = {
  dataLand: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  region: PropTypes.string,
  useType: PropTypes.string,
  size: PropTypes.string,
  onChangeRegion: PropTypes.func,
  onChangeUseType: PropTypes.func,
  onChangeSize: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onChangeView: PropTypes.func,
  onSearchKeyword: PropTypes.func,
  onSelectLand: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Filter;
