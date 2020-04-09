import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../components/layout/base';
import Intro from '../components/intro';
import Legend from '../components/map-view/Legend';
import Map from '../components/map-view/Map';
import Instructions from '../components/intro/instructions';
import LocalStorage from '../services/LocalStorage';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      showInstructions: true,
      areaView: '',
    };
  }

  componentDidMount() {
    var showIntro = LocalStorage.getItem('showIntro', '1');
    this.setState({
      showIntro: showIntro == '1',
    })
  }

  handleOnEndIntro = () => {
    this.setState({
      showIntro: false,
    });
    LocalStorage.setItem('showIntro', '0');
  };

  handleOnCloseInstructions = () => {
    this.setState({
      showInstructions: false,
    });
  }

  render() {
    const { showIntro } = this.state;
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
        !showIntro && <div>
            <div className="m33-btn-bordered m33-btn-bordered-lg">
                <Link to="/register/propose-land" className="ant-btn m33-btn ant-btn-xlg ant-btn-secondary ant-btn-lg">
                    <Icon type="plus" />
                </Link>
            </div>
                <h5 style={{width: "100%", fontWeight: "bolder",marginLeft: "auto", marginRight: "auto", paddingTop: "2px", color: "rgb(240,115,168)"}} >Proponer área</h5>
          </div>
        }
      >
        {showIntro && <Intro onEnd={this.handleOnEndIntro} />}
        {!showIntro && <Map areaView={this.state.areaView} />}
        <Instructions
          visible={this.state.showInstructions}
          onClose={this.handleOnCloseInstructions}
        />
      </BaseLayout>
    );
  }
}

export default HomeContainer;
