import React from 'react';
import PropTypes from 'prop-types';
import { Input, Typography } from 'antd';

import BaseLayout from '../../layout/base';
import BottomNavigator from '../BottomNavigator';
import TopNavigator from '../TopNavigator';
import Progress from '../Progress';

const { Text } = Typography;
const { TextArea } = Input;

class ImportanceProtectionStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleOnNext = () => {
    if (this.props.importance_of_protection) {
      this.props.next();
    } else {
      this.setState({
        errors: { importance_of_protection: 'Campo requerido' },
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
          <Progress onNext={this.handleOnNext} step={4} steps={20} />
        }
      >
        <div className="main-content">
          <TopNavigator previous={this.props.previous} step={4} steps={20} />
          <h2 className="text-center">
            ¿Por qué es importante proteger este terreno?
          </h2>
          <p className="text-center">
            Comparte aquí por qué es importante conservar este terreno. Esto
            ayudará a que otras personas entiendan el valor que tiene este lugar
            para ti y tu comunidad.
          </p>
          <TextArea
            name="importance_of_protection"
            className="form-control"
            onChange={this.props.handleChange}
            value={this.props.importance_of_protection}
            maxLength="600"
            rows="4"
          />
          {errors.importance_of_protection && (
            <Text type="danger">{errors.importance_of_protection}</Text>
          )}
          <BottomNavigator
            onPrevious={this.props.previous}
            onNext={this.handleOnNext}
          />
        </div>
      </BaseLayout>
    );
  }
}

ImportanceProtectionStep.propTypes = {
  importance_of_protection: PropTypes.string,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default ImportanceProtectionStep;
