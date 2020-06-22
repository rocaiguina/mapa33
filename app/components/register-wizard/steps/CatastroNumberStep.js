import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;

class CatastroNumberStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    var errors = {};
    this.props.catastro_numbers.forEach((item, index) => {
      if (!item) {
        errors['catastro_numbers_' + index] = 'Campo requerido.';
      }
    });

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.props.next();
    }
  };

  render() {
    const catastro_numbers = this.props.catastro_numbers || [];
    const { errors } = this.state;
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        onClose={this.props.onClose}
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={5} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={5} steps={20} />
          <Row gutter={30}>
            <Col md={8} />
            <Col md={8}>
              <h2>¿Cuál es el número de catastro?</h2>
              {catastro_numbers.map((item, index) => (
                <div key={index} className="form-group">
                  <Input
                    name={'catastro_numbers[' + index + ']'}
                    className="inputprop"
                    size="large"
                    style={{ textAlign: 'center' }}
                    placeholder="   /   /   /   /   "
                    value={item}
                    onChange={this.props.handleChange}
                  />
                  {errors['catastro_numbers_' + index] && (
                    <Text type="danger">
                      {errors['catastro_numbers_' + index]}
                    </Text>
                  )}
                </div>
              ))}
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

CatastroNumberStep.defaultProps = {
  catastro_numbers: [],
};

CatastroNumberStep.propTypes = {
  catastro_numbers: PropTypes.array,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default CatastroNumberStep;
