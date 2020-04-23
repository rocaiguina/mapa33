import React from 'react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
import BaseLayout from '../../layout/base';
import MapEditor from '../../map-view/Editor';
import MapTourGuide from '../MapTourGuide';
import LocalStorage from '../../../services/LocalStorage';

class MapStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      run: true,
      hasRunned: false,
      loading: false,
      showMapGuide: false,
    };
  }

  handleOnSubmit = () => {
    if (this.props.lots.length > 0) {
      this.setState({
        loading: true,
      });
      setTimeout(() => {
        this.props.next();  
      }, 600);
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
      showMapGuide: false,
    });
      LocalStorage.setItem('showMapGuide', '0');
  };

  handleOnNextTour = (index) => {
    if (index == 11) {
      this.setState({
        run: false,
        showMapGuide: false,
      });
      LocalStorage.setItem('showMapGuide', '0');
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
    const {showMapGuide} = this.state;
    return (
      <BaseLayout
        title={<span>ESCOGE TU TERRENO<span className="hidden-xs">/PROPUESTA</span></span>}
        onClose={this.props.onClose}
        verticalAlign="top"
        footerXs={footerXs}
        footerRightComponent={
          <div className="wizard-progress">
            <Button
              id="submitMap"
              className="ant-btn-purple"
              shape="round"
              size="large"
              onClick={this.handleOnSubmit}
              loading={this.state.loading}
            >
              Continuar
            </Button>
          </div>
        }
        afterFooter={
          showMapGuide && <MapTourGuide run={this.state.run} onNext={this.handleOnNextTour} onFinish={this.handleOnCloseTour} onClose={this.handleOnCloseTour}/>
        }
      >
        <div className="main-content">
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
  onClose: PropTypes.func,
};

export default MapStep;
