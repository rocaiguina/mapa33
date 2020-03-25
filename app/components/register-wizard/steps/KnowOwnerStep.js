import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Radio, Row } from 'antd';

import BaseLayout from '../../layout/base';
import Icon from '../../ui/Icon';

class KnowOwnerStep extends React.Component {
  handleOnChange = e => {
    const self = this;
    this.props.handleChange(e);
    setTimeout(function() {
      self.props.next();
    }, 400);
  };

  render() {
    return (
      <BaseLayout
        title="FORMULARIO DE PROPUESTA"
        showCloseBtn={true}
        footerRightComponent={<Button>Continuar</Button>}
      >
        <div className="main-content m-t-20">
          <Row gutter={30}>
            <Col span={12}>
              <Button onClick={this.props.previous}>Back</Button>
            </Col>
            <Col span={12}>
              <p className="text-right">
                <strong>Paso:</strong>
                <br />12 de 21
              </p>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <h2>¿Conoces al dueño(a) del terreno?</h2>
            </Col>
            <Col
              md={12}
              style={{
                textAlign: 'center',
              }}
            >
              <Radio.Group
                name="know_owner"
                buttonStyle="solid"
                value={this.props.know_owner}
                onChange={this.handleOnChange}
              >
                <Radio.Button
                  className="inputprop radioprop radiosi form1"
                  value={true}
                >
                  Si
                </Radio.Button>
                <Radio.Button
                  className="inputprop radioprop radiono form1"
                  value={false}
                >
                  No
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      </BaseLayout>
    );
  }
}

KnowOwnerStep.propTypes = {
  know_owner: PropTypes.bool,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleChange: PropTypes.func,
};

export default KnowOwnerStep;
