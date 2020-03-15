import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';

const { Option } = Select;

class Filter extends React.Component {
  render() {
    return (
      <div className="land-filter">
        <Row gutter={12}>
          <Col span={2}>
            <label>Región</label>
          </Col>
          <Col span={6}>
            <Select
              size="large"
              className="ant-select-black ant-select-round"
              defaultValue={this.props.defaultRegion}
              onChange={this.props.onChangeRegion}
              style={{ width: '100%' }}
            >
              <Option value="Bosque Estatal">Bosque Estatal</Option>
              <Option value="Lajas">Lajas</Option>
              <Option value="San Juan">San Juan</Option>
            </Select>
          </Col>
          <Col span={2} className="text-right">
            <label>Vista</label>
          </Col>
          <Col span={4}>
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
          <Col span={2} className="text-right">
            <label>Estatus</label>
          </Col>
          <Col span={4}>
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
