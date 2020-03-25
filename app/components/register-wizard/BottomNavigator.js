import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class BottomNavigator extends React.Component {
  render() {
    const {
      nextBtnHtmlType,
      onNext,
      onPrevious,
      disabledPrevious,
      nextText,
      previousText,
    } = this.props;
    return (
      <div className="form-group hidden-xs text-center">
        {!disabledPrevious && (
          <Button
            className="ant-btn-default"
            shape="round"
            size="large"
            onClick={onPrevious}
          >
            {previousText || 'Anterior'}
          </Button>
        )}
        <Button
          htmlType={nextBtnHtmlType}
          className="ant-btn-purple"
          shape="round"
          size="large"
          onClick={onNext}
        >
          {nextText || 'Continuar'}
        </Button>
      </div>
    );
  }
}

BottomNavigator.propTypes = {
  nextBtnHtmlType: PropTypes.string,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  disabledPrevious: PropTypes.bool,
  nextText: PropTypes.string,
  previousText: PropTypes.string,
};

export default BottomNavigator;
