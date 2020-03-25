import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class CatastroNumberStep extends React.Component {
  handleOnNext = () => {
    // TODO: validate before continue.
    this.props.next();
  };

  render() {
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={5} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={5} steps={21} />
          <Row gutter={30}>
            <Col md={8} />
            <Col md={8}>
              <h2>¿Cuál es el número de catastro?</h2>
              <div className="form-group">
                <Input
                  name="catastro_number"
                  className="inputprop"
                  size="large"
                  style={{ textAlign: 'center' }}
                  placeholder="     /     /     /     /     "
                  value={this.props.catastro_number}
                  onChange={this.props.handleChange}
                />
              </div>
            </Col>
          </Row>
          <BottomNavigator
            onPrevious={this.props.previous}
            onNext={this.handleOnNext}
          />
        </div>
      </BaseLayout>
    );
  }
}

CatastroNumberStep.propTypes = {
  catastro_number: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default CatastroNumberStep;
