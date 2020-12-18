import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

import {
  MEMORY_STATUS_NEW,
  MEMORY_STATUS_APPROVED,
  MEMORY_STATUS_REJECTED,
} from '../../constants';

const MemoryActivityItem = props => {
  const { id, title, status, landId, onDelete } = props;

  const handleOnDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const statusLabel = useMemo(() => {
    let label = 'No definido.';
    switch (status) {
      case MEMORY_STATUS_NEW:
        label = 'Bajo revisión';
        break;
      case MEMORY_STATUS_REJECTED:
        label = 'Denegada';
        break;
      case MEMORY_STATUS_APPROVED:
        label = 'Publicada';
        break;
    }
    return label;
  }, [status]);

  return (
    <div className="activity-item activity-memory-item">
      <Row gutter={16}>
        <Col xs={14}>
          <Link to={`/land/${landId}`} className="activity-title">
            {title}
          </Link>
        </Col>
        <Col xs={10} className="activity-controls">
          <span
            className={ClassNames('ant-btn ant-btn-round ant-btn-sm', {
              'ant-btn-link ant-btn-gray': status === MEMORY_STATUS_NEW,
              'ant-btn-background-ghost ant-btn-turquoise':
                status === MEMORY_STATUS_APPROVED,
              'ant-btn-background-ghost ant-btn-purple':
                status === MEMORY_STATUS_REJECTED,
            })}
          >
            {statusLabel}
          </span>
          <Button
            ghost
            shape="circle"
            onClick={handleOnDelete}
            size="small"
            icon="close"
          />
        </Col>
      </Row>
    </div>
  );
};

MemoryActivityItem.defaultProps = {
  id: 0,
  title: '',
  status: '',
  landId: 0,
  onDelete: () => {},
};

MemoryActivityItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  status: PropTypes.string,
  landId: PropTypes.number,
  onDelete: PropTypes.func,
};

export default MemoryActivityItem;
