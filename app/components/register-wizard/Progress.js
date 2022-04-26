import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class Progress extends React.Component {
  render() {
    const { nextBtnHtmlType, nextBtnLoading, nextText, step, steps, onNext } = this.props;
    return (
      <div className="wizard-progress">
        <div className="text-right visible-xs">
          <Button
            htmlType={nextBtnHtmlType}
            className="ant-btn-purple"
            shape="round"
            size="large"
            onClick={onNext}
            loading={nextBtnLoading}
          >
            {nextText || 'Continuar'}
          </Button>
        </div>
        <div className="hidden-xs">
          <span>Progreso de propuesta:</span>
          <h1>
            {step}/{steps}
          </h1>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  nextBtnHtmlType: PropTypes.string,
  nextText: PropTypes.string,
  onNext: PropTypes.func,
  step: PropTypes.number,
  steps: PropTypes.number,
};

export default Progress;
