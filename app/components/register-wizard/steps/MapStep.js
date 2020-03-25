import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import BaseLayout from '../../layout/base';
import MapEditor from '../../map-view/Editor';
import MapTourGuide from '../MapTourGuide';

class MapStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      run: true,
      hasRunned: false,
      lands: [],
      area: 0,
    };
  }

  handleOnSelect = data => {
    this.setState({
      lands: data.lands,
      area: data.area,
    });
    const { setFieldValue } = this.props;
    setFieldValue('geojson', data.geojson);
    setFieldValue('plots_count', data.lands.length);
    setFieldValue('area_size', data.area);
  };

  handleOnRenderMiniMap = base64Img => {
    const { setFieldValue } = this.props;
    setFieldValue('base64Img', base64Img);
  };

  handleOnSubmit = () => {
    // if (this.state.lands.length > 0) {
    //   this.props.next();
    // }
    this.props.next();
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
    if (index == 2) {
      this.setState({
        run: false,
      });
    }
  };

  render() {
    const footerXs = [14, 0, 10];
    return (
      <BaseLayout
        title="ESCOGE TU TERRENO/PROPUESTA"
        footerXs={footerXs}
        footerRightComponent={
          <Button
            className="ant-btn-purple"
            shape="round"
            size="large"
            block
            onClick={this.handleOnSubmit}
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
            onRenderMinimap={this.handleOnRenderMiniMap}
            onSelect={this.handleOnSelect}
            onZoom={this.handleOnZoom}
          />
        </div>
      </BaseLayout>
    );
  }
}

MapStep.propTypes = {
  history: PropTypes.object,
  next: PropTypes.func,
  setFieldValue: PropTypes.func,
};

export default MapStep;
