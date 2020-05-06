import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';
import { LAND_PROTECTION_REASONS } from '../../../constants';

const { Text } = Typography;

class ImportanceOfKnowingStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    if (this.props.importance_of_knowing) {
      this.props.next();
    } else {
      this.setState({
        errors: { importance_of_knowing: 'Campo requerido' },
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        onClose={this.props.onClose}
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={17} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={17} steps={20} />
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>
                ¿Por qué es importante la protección de este terreno en
                particular?
              </h2>
              {errors.importance_of_knowing && (
                <Text type="danger">{errors.importance_of_knowing}</Text>
              )}
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'left',
              }}
            >
              <Radio.Group
                name="importance_of_knowing"
                value={this.props.importance_of_knowing}
                onChange={this.props.handleChange}
              >
                {LAND_PROTECTION_REASONS.map(item => 
                  <div key={item.value} className="form-radio">
                    <Radio
                      className="blockstyleradio"
                      value={item.value}
                    >
                      {item.label}
                    </Radio>
                  </div>
                )}
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

ImportanceOfKnowingStep.propTypes = {
  importance_of_knowing: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default ImportanceOfKnowingStep;
