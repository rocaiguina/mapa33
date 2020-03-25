import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

class WichUseStep extends React.Component {
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
          <Progress onNext={this.handleOnNext} step={19} steps={21} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={19} steps={21} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Cuál uso le darías al terreno?</h2>
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'left',
              }}
            >
              <Radio.Group
                name="wich_use"
                value={this.props.wich_use}
                onChange={this.props.handleChange}
              >
                <div className="form-radio">
                  <Radio value="scientist_research" className="blockstyleradio">
                    Investigación Científica
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio
                    value="environment_monitoring"
                    className="blockstyleradio"
                  >
                    Monitoreo Ambiental
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio value="spirit_uses" className="blockstyleradio">
                    Usos espirituales
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio value="educational" className="blockstyleradio">
                    Educación
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio value="recreation" className="blockstyleradio">
                    Recreación
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio value="turism" className="blockstyleradio">
                    Turismo
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio value="sustainable_uses" className="blockstyleradio">
                    Usos sostenibles
                  </Radio>
                </div>
              </Radio.Group>
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

WichUseStep.propTypes = {
  wich_use: PropTypes.bool,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default WichUseStep;
