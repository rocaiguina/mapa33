import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

class MapTourGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 6,
      stepGuide: 0,
      steps: [
        {
          target: '#mapbox-search',
          content: <h1>auxiliar</h1>,
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#mapbox-search',
          content: <h1>auxiliar</h1>,
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#mapbox-search',
          content: <h1>auxiliar</h1>,
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#mapbox-search',
          content: <h1>auxiliar</h1>,
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#mapbox-search',
          content: <h1>auxiliar</h1>,
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#mapbox-search',
          content: <h1>auxiliar</h1>,
          disableBeacon: true,
          placement: 'bottom',
        },
        {
          target: '#mapbox-search',
          content: (
            <div>
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
      this.setState({ stepIndex: newIndex, stepGuide: newIndex - 6 });
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
    const { stepIndex, steps, stepGuide } = this.state;
    return (
      <div style={{ width: '100%' }}>
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
          styles={{
            options: {
              arrowColor: '#f073a8',
              backgroundColor: '#f073a8',
              overlayColor: 'rgba(0, 0, 0, 0.65)',
              primaryColor: '#f073a8',
              textColor: '#000',
              width: 900,
              zIndex: 99,
            },
          }}
        />
        {run && (
          <div className="maptour_guide">
            <h1
              style={{ color: 'white', fontWeight: 'bold' }}
              className="guide_up"
            >
              <span>Explicación&nbsp;</span>&nbsp; {stepGuide + 1}/5
            </h1>
            <Button
              className="ant-btn m33-btn ant-btn-secondary ant-btn-lg guide_up"
              style={{ borderRadius: '15px', fontWeight: 'bold' }}
              onClick={this.handleOnCloseTutorial}
            >
              Cerrar explicación
            </Button>
          </div>
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
