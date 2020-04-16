import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import '../style/HomeGuide.css';

class HomeGuideTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      steps: [
         {
          target: '#visualizar_guide',
          content: (
            <div>
              <h4 style={{fontWeight: "bolder",textAlign: "left", marginBottom: "0"}}>Visualizar</h4>
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Escoge cómo quieres ver las áreas/los terrenos del mapa: Lista, Tarjetas o Mapa.
              </h5>
            </div>
          ),
          disableBeacon: true,
          placement: 'top',
        },
        {
          target: '#capas_guide',
          content: (
            <div>
              <h4 style={{fontWeight: "bolder",textAlign: "left", marginBottom: "0"}}>Capas</h4>
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Ajusta el mapa para que muestre capas de información por colores. Estos corresponden a las siguientes categorías: Áreas Propuestas, Áreas Protegidas o Ambas.
              </h5>
            </div>
          ),
          placement: 'top',
        },
        {
          target: '#propose_guide',
          content: (
            <div>
              <h4 style={{fontWeight: "bolder",textAlign: "left", marginBottom: "0"}}>Proponer</h4>
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Envía tu propuesta para áreas o terrenos que deseas sean conservados.
              </h5>
            </div>
          ),
          placement: 'top',
        },
        {
          target: '#map_guide',
          content: (
            <div>
              <h4 style={{fontWeight: "bolder",textAlign: "left", marginBottom: "0"}}>El Mapa</h4>
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                El mapa muestra los distintos tipos de áreas (o terrenos) que componen el archipiélago de Puerto Rico. Puedes interactuar con las regiones marcadas para ver sus propuestas/tarjetas.
              </h5>
            </div>
          ),
          placement: 'bottom',
        },
        {
          target: '#user_guide',
          content: (
            <div>
              <h4 style={{fontWeight: "bolder",textAlign: "left", marginBottom: "0"}}>Perfil</h4>
              <h5 style={{ textAlign: 'left', paddingTop: '5px' }}>
                Regístrate para proponer áreas (o terrenos) y mostrar tu apoyo.
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
      console.error("NUMBER: "+ index);
      console.error("NUMBER STEP: "+ newIndex);
      console.error("DATA: "+JSON.stringify(data))
      this.setState({ stepIndex: newIndex });
//      if (index < 4) {
//        this.setState({
//         stepIndex: index + 1 + (action === ACTIONS.PREV ? -1 : 1),
//         });
//        }
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
            next: 'Ver siguiente',
            last: 'Ver siguiente',
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
        <div className="tourup">
            <h1
                style={{ color: 'white', fontWeight: 'bold'}}
                className="guide_up"
              >
              <span>Explicación&nbsp;</span>&nbsp; {stepIndex + 1}/5
            </h1>
          <Button
            className="ant-btn m33-btn ant-btn-secondary ant-btn-lg guide_up"
            style={{borderRadius: "15px", fontWeight: 'bold'}}
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

HomeGuideTour.propTypes = {
  onNext: PropTypes.func,
  onFinish: PropTypes.func,
  onClose: PropTypes.func,
  run: PropTypes.bool,
};

export default HomeGuideTour;
