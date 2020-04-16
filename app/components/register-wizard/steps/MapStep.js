import React from 'react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import BaseLayout from '../../layout/base';
import MapEditor from '../../map-view/Editor';
import MapTourGuide from '../MapTourGuide';

class MapStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      run: true,
      hasRunned: false,
      loading: false,
    };
  }

  handleOnSubmit = () => {
    if (this.props.lots.length > 0) {
      this.props.next();
    } else {
      notification.error({
        message: 'Error',
        description: 'No se ha seleccionado ninguna parcela.',
      });
    }
  };

  handleOnZoom = map => {
    const { hasRunned } = this.state;
    if (map.getZoom() > 14 && !hasRunned) {
      this.setState({
        run: true,
      });
    }
  };

  handleOnCloseTour = () => {
    this.setState({
      run: false,
      hasRunned: true,
    });
  };

  handleOnNextTour = (index) => {
    if (index == 5) {
      this.setState({
        run: false,
      });
    }
  };

  handleOnLoad = () => {
    this.setState({
      loading: true,
    });
  }

  handleOnLoaded = () => {
    this.setState({
      loading: false,
    });
  }

  render() {
    const footerXs = [14, 0, 10];
    return (
      <BaseLayout
        title="ESCOGE TU TERRENO/PROPUESTA"
        footerXs={footerXs}
        footerRightComponent={
          <Button
            id="submitMap"
            className="ant-btn-purple"
            shape="round"
            size="large"
            block
            onClick={this.handleOnSubmit}
            loading={this.state.loading}
          >
            Continuar
          </Button>
        }
        afterFooter={
          <MapTourGuide
            run={this.state.run}
            onNext={this.handleOnNextTour}
            onFinish={this.handleOnCloseTour}
            onClose={this.handleOnCloseTour}
          />
        }
      >
        <div className="main-content m-t-20">
          <MapEditor
            lots={this.props.lots}
            onRenderMinimap={this.props.onRenderMinimap}
            onChange={this.props.onChange}
            onZoom={this.handleOnZoom}
            onLoad={this.handleOnLoad}
            onLoaded={this.handleOnLoaded}
          />
        </div>
      </BaseLayout>
    );
  }
}

MapStep.propTypes = {
  lots: PropTypes.array,
  onChange: PropTypes.func,
  onRenderMinimap: PropTypes.func,
  history: PropTypes.object,
  next: PropTypes.func,
};

export default MapStep;
