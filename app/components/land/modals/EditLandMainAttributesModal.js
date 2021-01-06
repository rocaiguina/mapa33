import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Checkbox, Input, Modal, Row } from 'antd';

import { LAND_ATTRIBUTES } from '../../../constants';

const { confirm } = Modal;

class EditLandMainAttributesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataOther: '',
      inputotro: false,
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.landAttributes,
      dataOther: this.props.landOtherAttribute,
      inputotro: this.props.landOtherAttribute ? true : false,
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let self = this;
    confirm({
      title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
      content: 'ATRIBUTOS PRINCIPALES DEL LUGAR',
      cancelText: 'Sí',
      okText: 'No',
      onCancel() {
        self.props.onSubmit(self.state.data, self.state.dataOther);
      },
      className: 'modal-confirm-style2',
    });
  };

  handleOnChange = data => {
    this.setState({
      data,
      inputotro: data.indexOf('others') !== -1,
    });
  };

  handleOnChangeOtherAttr = event => {
    this.setState({
      dataOther: event.target.value,
    });
  };

  handleOnCancel = () => {
    this.setState({
      data: this.props.landAttributes,
      dataOther: this.props.landOtherAttribute,
      inputotro: this.props.landOtherAttribute ? true : false,
    });
    this.props.onClose();
  };

  render() {
    const { visible } = this.props;
    const { data, dataOther, inputotro } = this.state;
    return (
      <Modal
        visible={visible}
        width={380}
        footer={null}
        onCancel={this.handleOnCancel}
        destroyOnClose={true}
        wrapClassName="ant-modal-style2"
      >
        <h3 className="text-center m-b-15">
          ¿Cuáles son los principales atributos que resaltan el valor para la
          conservación de esta propiedad?
        </h3>
        <Checkbox.Group
          style={{ width: '100%' }}
          value={data}
          onChange={this.handleOnChange}
        >
          <Row>
            {LAND_ATTRIBUTES.map(item => (
              <Col key={item.value} span={24}>
                <Checkbox value={item.value} className="inputprop radiobutton">
                  {item.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        {inputotro && (
          <Input
            className="inputprop"
            id="otro3"
            size="large"
            value={dataOther}
            onChange={this.handleOnChangeOtherAttr}
          />
        )}
        <Button
          block
          size="large"
          shape="round"
          className="ant-btn-purple"
          onClick={this.handleOnSubmit}
        >
          <span className="text-black">Editar</span>
        </Button>
      </Modal>
    );
  }
}

EditLandMainAttributesModal.defaultValues = {
  landAttributes: [],
  landOtherAttribute: '',
  proposedUses: [],
  visible: false,
  onClose: () => {},
  onSubmit: () => {},
};

EditLandMainAttributesModal.propTypes = {
  landAttributes: PropTypes.array,
  landOtherAttribute: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EditLandMainAttributesModal;
