import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Col, Divider, Modal, Row } from 'antd';

const MemoryModalPreview = props => {
  const {
    title,
    description,
    createdAt,
    author,
    multimedias,
    visible,
    onClose,
  } = props;

  return (
    <Modal footer={null} visible={visible} onCancel={onClose} destroyOnClose>
      <h2>{title}</h2>
      <p>{description}</p>
      <Row>
        <Col xs={12}>
          <span className="memory-preview-author">{author}</span>
        </Col>
        <Col xs={12} className="text-right">
          <span className="memory-preview-createdAt">
            {Moment(createdAt).format('DD/MM/YYYY')}
          </span>
        </Col>
      </Row>
      <Divider />
    </Modal>
  );
};

MemoryModalPreview.defaultProps = {
  title: '',
  description: '',
  createdAt: '',
  author: '',
  multimedias: [],
  visible: false,
  onClose: () => {},
};

MemoryModalPreview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.string,
  multimedias: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MemoryModalPreview;
