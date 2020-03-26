import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

class MapTourGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      steps: [
        {
          target: '#mapbox-search',
          content: (
            <div>
              <img
                height="140"
                width="190"
                src="https://dummyimage.com/190x140/474747/fff"
                alt="imagen proporsicion"
              />
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Busca un municipio o dirección
              </h5>
            </div>
          ),
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#myLocationBtn',
          content: (
            <div>
              <img
                height="140"
                width="190"
                src="https://dummyimage.com/190x140/474747/fff"
                alt="imagen proporsicion"
              />
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Encuentra tu posición exacta en el mapa
              </h5>
            </div>
          ),
          placement: 'top',
        },
        {
          target: '#mapPointerBtn',
          content: (
            <div>
              <img
                height="140"
                width="190"
                src="https://dummyimage.com/190x140/474747/fff"
                alt="imagen proporsicion"
              />
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Selecciona la parcela haciendo tap o click
              </h5>
            </div>
          ),
          placement: 'top',
        },
        {
          target: '#trashBtn',
          content: (
            <div>
              <img
                height="140"
                width="190"
                src="https://dummyimage.com/190x140/474747/fff"
                alt="imagen proporsicion"
              />
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Borra puntos o parcelas de tu selección
              </h5>
            </div>
          ),
          placement: 'top',
        },
        {
          target: '#submitMap',
          content: (
            <div>
              <img
                height="140"
                width="190"
                src="https://dummyimage.com/190x140/474747/fff"
                alt="imagen proporsicion"
              />
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Cuando tengas tu terreno seleccionado pulsa aquí para someter
              </h5>
            </div>
          ),
          placement: 'top',
        },
      ],
    };
  }

  handleOnCloseTutorial = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      const newIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      this.setState({ stepIndex: newIndex });
      // if (index < 4) {
      //   this.setState({
      //     stepIndex: index + 1 + (action === ACTIONS.PREV ? -1 : 1),
      //   });
      // }
      const { onNext } = this.props;
      if (onNext) {
        onNext(newIndex);
      }
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      const { onFinish } = this.props;
      if (onFinish) {
        onFinish();
      }
    }
  };

  render() {
    const { run } = this.props;
    const { stepIndex, steps } = this.state;
    return (
      <div>
        <Joyride
          callback={this.handleJoyrideCallback}
          steps={steps}
          stepIndex={stepIndex}
          run={run}
          locale={{
            next: 'Siguiente',
            last: 'Siguiente',
          }}
          continuous={true}
          disableOverlayClose={true}
          hideBackButton={true}
          spotlightPadding={0}
        />
        {run && (
          <Button
            style={{ right: '0' }}
            className="ant-btn m33-btn ant-btn-secondary ant-btn-lg tourup"
            onClick={this.handleOnCloseTutorial}
          >
            Cerrar Tutorial
          </Button>
        )}
        {run && (
          <h1
            style={{ left: '0', color: 'white', fontWeight: 'bold' }}
            className="tourup"
          >
            {stepIndex + 1}/5
          </h1>
        )}
      </div>
    );
  }
}

MapTourGuide.propTypes = {
  onNext: PropTypes.func,
  onFinish: PropTypes.func,
  onClose: PropTypes.func,
  run: PropTypes.bool,
};

export default MapTourGuide;
