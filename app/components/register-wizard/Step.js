import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import BaseLayout from '../layout/base';
import Icon from '../ui/Icon';

class Step extends React.Component {
  render() {
    return (
      <BaseLayout
        title={this.props.title}
        showCloseBtn={true}
        footerRightComponent={
          <Button>Continuar</Button>
        }
      >
        <div className="main-content m-t-20">
          { this.props.component }
        </div>
      </BaseLayout>
    );
  }
}

Step.defaultProps = {
  title: '',
};

Step.propTypes = {
  title: PropTypes.string,
};

export default Step;
