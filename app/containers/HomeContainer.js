import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../components/layout/base';
import Legend2 from '../components/map-view/Legend2';
import Map from '../components/map-view/Map';
import Instructions from '../components/intro/instructions';
import ProposeButton from '../components/map-view/ProposeButton';
import LocalStorage from '../services/LocalStorage';
import HomeGuideTour from './HomeGuideTour';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInstructions: false,
      showGuide: false,
      areaView: '',
      modeView: 'map',
      run: true,
      hasRunned: false,
    };
  }

  componentDidMount() {
    var showInstructions = LocalStorage.getItem('showInstructions', '1');
    var showGuide = LocalStorage.getItem('showInstructions', '1');
    this.setState({
      showInstructions: showInstructions == '1',
      showGuide: showInstructions == '0' && showGuide == '1',
    });
  }

  handleOnCloseInstructions = () => {
    this.setState({
      showInstructions: false,
      showGuide: true,
    });
    LocalStorage.setItem('showInstructions', '0');
  };

  handleOnChangeMode = event => {
    const mode = event.target.value;
    const { history } = this.props;
    history.push('/map/' + mode + '?status=' + this.state.areaView);
  };

  handleOnChangeArea = event => {
    this.setState({
      areaView: event.target.value,
    });
  };

  handleOnCloseTour = () => {
    this.setState({
      run: false,
      hasRunned: true,
      showGuide: false,
    });
    LocalStorage.setItem('showGuide', '0');
  };

  handleOnNextTour = index => {
    if (index == 5) {
      this.setState({
        run: false,
        showGuide: false,
      });
      LocalStorage.setItem('showGuide', '0');
    }
  };

  render() {
    const { showGuide, showInstructions } = this.state;
    const title = <Legend2 />;
    return (
      <BaseLayout
        dark
        title={title}
        showCloseBtn={true}
        disableBorder
        footerRightComponent={
          <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        <div>
          <Map
            areaView={this.state.areaView}
            modeView={this.state.modeView}
            onChangeMode={this.handleOnChangeMode}
            onChangeArea={this.handleOnChangeArea}
          />
          {showGuide && (
            <HomeGuideTour
              run={this.state.run}
              onNext={this.handleOnNextTour}
              onFinish={this.handleOnCloseTour}
              onClose={this.handleOnCloseTour}
            />
          )}
        </div>
        <Instructions
          visible={showInstructions}
          onClose={this.handleOnCloseInstructions}
        />
      </BaseLayout>
    );
  }
}

HomeContainer.propTypes = {
  history: PropTypes.object,
};

export default HomeContainer;
