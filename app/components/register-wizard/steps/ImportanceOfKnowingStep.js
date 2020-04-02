import React from 'react';
import PropTypes from 'prop-types';
import { Col, Radio, Row, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

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
        footerXs={[14, 0, 10]}
        showCloseBtn={true}
        footerRightComponent={
          <Progress onNext={this.handleOnNext} step={19} steps={20} />
        }
      >
        <div className="main-content m-t-20">
          <TopNavigator previous={this.props.previous} step={19} steps={20} />
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
                <div className="form-radio">
                  <Radio
                    className="blockstyleradio"
                    value="Es un espacio 100% natural y quiero evitar cualquier perturbación e impacto humano."
                  >
                    Es un espacio 100% natural y quiero evitar cualquier
                    perturbación e impacto humano.
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio
                    className="blockstyleradio"
                    value="Es un lugar natural con bajo impacto humano y quiero evitar mayores perturbaciones."
                  >
                    Es un lugar natural con bajo impacto humano y quiero evitar
                    mayores perturbaciones.
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio
                    className="blockstyleradio"
                    value="Es un lugar con rasgos naturales especiales(p.e. arboledas, mogotes, lagunas, cuevas)"
                  >
                    Es un lugar con rasgos naturales especiales(p.e. arboledas,
                    mogotes, lagunas, cuevas)
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio
                    className="blockstyleradio"
                    value="Es un lugar donde habitan especies que deber ser protegidas"
                  >
                    Es un lugar donde habitan especies que deber ser protegidas
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio
                    className="blockstyleradio"
                    value="Es un lugar con historia natural y cultural que debe ser protegida"
                  >
                    Es un lugar con historia natural y cultural que debe ser
                    protegida
                  </Radio>
                </div>
                <div className="form-radio">
                  <Radio
                    className="blockstyleradio"
                    value="Es un lugar óptimo donde la conservación y el desarrollo sustentable pueden ocurrir a la vez."
                  >
                    Es un lugar óptimo donde la conservación y el desarrollo
                    sustentable pueden ocurrir a la vez.
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

ImportanceOfKnowingStep.propTypes = {
  importance_of_knowing: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default ImportanceOfKnowingStep;
