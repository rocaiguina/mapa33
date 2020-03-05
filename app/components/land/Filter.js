import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

const { Option } = Select;

class Filter extends React.Component {
  render() {
    return (
      <Row>
        <Col>Región</Col>
        <Col>
          <Select
            defaultValue={this.props.defaultRegion}
            onChange={this.props.onChangeRegion}
          >
            <Option value="lajas">Lajas</Option>
          </Select>
        </Col>
        <Col>Vista</Col>
        <Col>
          <Select
            defaultValue={this.props.defaultView}
            onChange={this.props.onChangeView}
          >
            <Option value="list">Lista</Option>
            <Option value="card">Tarjetas</Option>
          </Select>
        </Col>
        <Col>Estatus</Col>
        <Col>
          <Select
            defaultValue={this.props.defaultStatus}
            onChange={this.props.onChangeStatus}
          >
            <Option value="ambas">Ambas</Option>
          </Select>
        </Col>
        <Col>
          <Link to="/land">
            <Icon type="close" />
          </Link>
        </Col>
      </Row>
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
