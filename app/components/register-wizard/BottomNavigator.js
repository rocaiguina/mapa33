import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class BottomNavigator extends React.Component {
  render() {
    const {
      nextBtnHtmlType,
      nextBtnLoading,
      onNext,
      onPrevious,
      disabledPrevious,
      nextText,
      previousText,
    } = this.props;
    return (
      <div className="wizard-navigator hidden-xs">
        {!disabledPrevious && (
          <Button
            className="ant-btn-default m-r-20"
            shape="round"
            size="large"
            onClick={onPrevious}
          >
            {previousText || 'Anterior'}
          </Button>
        )}
        <Button
          htmlType={nextBtnHtmlType}
          loading={nextBtnLoading}
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
  nextBtnLoading: PropTypes.bool,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  disabledPrevious: PropTypes.bool,
  nextText: PropTypes.string,
  previousText: PropTypes.string,
};

export default BottomNavigator;
