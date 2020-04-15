import React from 'react';
import PropTypes from 'prop-types';
import BaseLayout from '../components/layout/base';
import Intro from '../components/intro';
import Legend from '../components/map-view/Legend';
import Map from '../components/map-view/Map';
import Instructions from '../components/intro/instructions';
import ProposeButton from '../components/map-view/ProposeButton';
import LocalStorage from '../services/LocalStorage';
import HomeGuideTour from './HomeGuideTour';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: false,
      showInstructions: false,      
      showGuide: false,
      areaView: '',
      modeView: 'map',
      run: true,
      hasRunned: false,
    };
  }

  componentDidMount() {
    var showIntro = LocalStorage.getItem('showIntro', '1');
    var showInstructions = LocalStorage.getItem('showInstructions', '1');    
    var showGuide = LocalStorage.getItem('showInstructions', '1');
    this.setState({
      showIntro: showIntro == '1',
      showInstructions: showIntro == '0' && showInstructions == '1',
      showGuide: showIntro == '0' && showInstructions == '0' && showGuide == '1',
    });
  }

  handleOnEndIntro = () => {
    this.setState({
      showIntro: false,
      showInstructions: true,
    });
    LocalStorage.setItem('showIntro', '0');
  };

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

  handleOnNextTour = (index) => {
    if (index == 5) {
      this.setState({
        run: false,
      });
      LocalStorage.setItem('showGuide', '0');
    }
  };

  render() {
    const { showIntro, showGuide,showInstructions } = this.state;
    const title = showIntro ? null : 'LEYENDA DE ÁREAS NATURALES';
    const subtitle = showIntro ? null : <Legend />;
    return (
      <BaseLayout
        dark
        title={title}
        subtitle={subtitle}
        showCloseBtn={false}
        enableMenu={!showIntro}
        footerRightComponent={
          !showIntro && <ProposeButton title="Proponer área" icon="plus" />
        }
      >
        {showIntro && <Intro onEnd={this.handleOnEndIntro} />}
        {!showIntro && (
        <div>
          <Map
            areaView={this.state.areaView}
            modeView={this.state.modeView}
            onChangeMode={this.handleOnChangeMode}
            onChangeArea={this.handleOnChangeArea}
          />
          {showGuide && <HomeGuideTour
            run={this.state.run}
            onNext={this.handleOnNextTour}
            onFinish={this.handleOnCloseTour}
            onClose={this.handleOnCloseTour}
          />
          }
          </div>
        )}
        
        <Instructions
          visible={this.state.showInstructions}
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
