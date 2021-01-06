import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Radio } from 'antd';

import { LAND_PROTECTION_REASONS } from '../../../constants';

const { confirm } = Modal;

class EditLandReasonConservationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.reasonConservation,
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let self = this;
    confirm({
      title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
      content: 'RAZONES DE PROTECCIÓN DE ESTE TERRENO',
      cancelText: 'Sí',
      okText: 'No',
      onCancel() {
        self.props.onSubmit(self.state.data);
      },
      className: 'modal-confirm-style2',
    });
  };

  handleOnChange = event => {
    this.setState({
      data: event.target.value,
    });
  };

  handleOnCancel = () => {
    this.setState({
      data: this.props.reasonConservation,
    });
    this.props.onClose();
  };

  render() {
    const { visible } = this.props;
    const { data } = this.state;
    return (
      <Modal
        visible={visible}
        width={480}
        footer={null}
        onCancel={this.handleOnCancel}
        destroyOnClose={true}
        wrapClassName="ant-modal-style2"
      >
        <h3 className="text-center m-b-15">
          ¿Por qué es importante la protección de este terreno en particular?
        </h3>
        <Radio.Group value={data} onChange={this.handleOnChange}>
          {LAND_PROTECTION_REASONS.map(item => (
            <div key={item.value} className="form-radio">
              <Radio className="blockstyleradio" value={item.value}>
                {item.label}
              </Radio>
            </div>
          ))}
        </Radio.Group>
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

EditLandReasonConservationModal.defaultValues = {
  reasonConservation: '',
  visible: false,
  onClose: () => {},
  onSubmit: () => {},
};

EditLandReasonConservationModal.propTypes = {
  reasonConservation: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EditLandReasonConservationModal;
