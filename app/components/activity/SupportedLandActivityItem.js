import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Icon, Row } from 'antd';
import { Link } from 'react-router-dom';

const SupportedLandActivityItem = props => {
  const { id, land, onUnLike } = props;

  const handleOnUnLike = useCallback(() => {
    onUnLike(id);
  }, [id, onUnLike]);

  return (
    <div className="activity-item activity-supportedland-item">
      <Row gutter={16}>
        <Col xs={14}>
          <Link to={`/land/${land && land.id}`} className="activity-title">
            {land && land.name}
          </Link>
        </Col>
        <Col xs={10} className="activity-controls">
          <Button
            type="link"
            shape="round"
            size="small"
            className="ant-btn-purple"
            onClick={handleOnUnLike}
          >
            <Icon type="heart" theme="filled" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

SupportedLandActivityItem.defaultProps = {
  id: 0,
  land: {
    id: 0,
    name: '',
  },
  onUnLike: () => {},
};

SupportedLandActivityItem.propTypes = {
  id: PropTypes.number,
  land: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onUnLike: PropTypes.func,
};

export default SupportedLandActivityItem;
