import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal } from 'antd';

const { confirm } = Modal;

class EditLandNameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.landName,
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let self = this;
    confirm({
      title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
      content: 'CAMBIAR NOMBRE DE PROPUESTA',
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
      data: this.props.landName,
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
        <h3 className="m-b-15">Nombre de Propuesta</h3>
        <div className="form-group">
          <Input type="text" value={data} onChange={this.handleOnChange} />
        </div>
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

EditLandNameModal.defaultValues = {
  landName: '',
  visible: false,
  onClose: () => {},
  onSubmit: () => {},
};

EditLandNameModal.propTypes = {
  landName: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default EditLandNameModal;
