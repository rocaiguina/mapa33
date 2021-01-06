import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Checkbox, Modal, Row } from 'antd';

import { LAND_PROPOSED_USES } from '../../../constants';

const { confirm } = Modal;

class EditLandProposedUsesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.proposedUses,
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let self = this;
    confirm({
      title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
      content: 'USOS PRINCIPALES PROPUESTOS',
      cancelText: 'Sí',
      okText: 'No',
      onCancel() {
        self.props.onSubmit(self.state.data);
      },
      className: 'modal-confirm-style2',
    });
  };

  handleOnChange = data => {
    this.setState({
      data,
    });
  };

  handleOnCancel = () => {
    this.setState({
      data: this.props.proposedUses,
    });
    this.props.onClose();
  };

  render() {
    const { visible } = this.props;
    const { data } = this.state;
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
          ¿Qué uso crees que debe de tener el espacio conservado?
        </h3>
        <Checkbox.Group
          style={{ width: '100%' }}
          value={data}
          onChange={this.handleOnChange}
        >
          <Row>
            {LAND_PROPOSED_USES.map(item => (
              <Col key={item.value} span={24}>
                <Checkbox value={item.value} className="inputprop radiobutton">
                  {item.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
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

EditLandProposedUsesModal.defaultValues = {
  proposedUses: [],
  visible: false,
  onClose: () => {},
  onSubmit: () => {},
};

EditLandProposedUsesModal.propTypes = {
  proposedUses: PropTypes.array,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EditLandProposedUsesModal;
