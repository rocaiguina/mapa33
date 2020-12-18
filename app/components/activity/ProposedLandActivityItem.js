import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import { LAND_STATUS_NEW, LAND_STATUS_APPROVED } from '../../constants';

const ProposedLandActivityItem = props => {
  const { id, name, status, createdAt, onDelete } = props;

  const canEdit = useMemo(() => {
    let expireAt = createdAt ? Moment(createdAt) : Moment();
    expireAt.add(24, 'hours');
    return Moment().isBefore(expireAt) && status === LAND_STATUS_NEW;
  }, [createdAt, status]);

  const handleOnDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <div className="activity-item activity-proposedland-item">
      <Row gutter={16}>
        <Col xs={14}>
          <Link to={`/land/${id}`} className="activity-title">
            {name}
          </Link>
        </Col>
        <Col xs={10} className="activity-controls">
          {!canEdit && status === LAND_STATUS_NEW && (
            <span className="ant-btn ant-btn-round ant-btn-sm ant-btn-link ant-btn-gray">
              Bajo revisión
            </span>
          )}
          {status === LAND_STATUS_APPROVED && (
            <span className="ant-btn ant-btn-round ant-btn-sm ant-btn-background-ghost ant-btn-turquoise">
              Publicada
            </span>
          )}
          {canEdit && (
            <Button shape="round" size="small" ghost className="ant-btn-purple">
              Editar
            </Button>
          )}
          {(canEdit || status !== LAND_STATUS_NEW) && (
            <Button
              ghost
              shape="circle"
              size="small"
              icon="close"
              onClick={handleOnDelete}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

ProposedLandActivityItem.defaultProps = {
  id: 0,
  name: '',
  status: '',
  createdAt: '',
  onDelete: () => {},
};

ProposedLandActivityItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ProposedLandActivityItem;
