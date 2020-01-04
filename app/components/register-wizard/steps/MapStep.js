import React from 'react';
import { Col, Input, Row } from 'antd';
import BaseLayout from '../../layout/base';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import MapEditor from '../../map-view/Editor';
import Joyride,{ ACTIONS, EVENTS, STATUS } from 'react-joyride';

class MapStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      run: true,
      lands: [],
      area: 0,
      names: {
        next: 'Siguiente',
        last: 'Siguiente'
      },
      steps: [
        {
          target: '#mapPointerBtn',
          content: <div><img src="https://dummyimage.com/190x140/474747/fff" alt="imagen proporsicion"/ ><h5 style={{textAlign:"left", paddingTop:"5px"}}>Selecciona la parcela haciendo tap o click</h5></div>,
          disableBeacon: "false",
          placement: "top",
        },
        {
          target: '#trashBtn',
          content: <div><img src="https://dummyimage.com/190x140/474747/fff" alt="imagen proporsicion"/ ><h5 style={{textAlign:"left", paddingTop:"5px"}}>Borra puntos o parcelas de tu selección</h5></div>,
          placement: "top",
        },
        {
          target: '#myLocationBtn',
          content: <div><img src="https://dummyimage.com/190x140/474747/fff" alt="imagen proporsicion"/ ><h5 style={{textAlign:"left", paddingTop:"5px"}}>Encuentra tu posición exacta en el mapa</h5></div>,
          placement: "top",
        },
        {
          target: '.searchinput',
          content: <div><img src="https://dummyimage.com/190x140/474747/fff" alt="imagen proporsicion"/ ><h5 style={{textAlign:"left", paddingTop:"5px"}}>Busca un municipio o dirección</h5></div>,
          placement: "bottomh5",
        },
        {
          target: '.submitbtn',
          content: <div><img src="https://dummyimage.com/190x140/474747/fff" alt="imagen proporsicion"/ ><h5 style={{textAlign:"left", paddingTop:"5px"}}>Cuando tengas tu terreno seleccionado pulsa aquí para someter</h5></div>,
          placement: "top",
        },
      ],
      stepIndex: 0,
      stepIndex2: 1,
    };
  }

  handleOnClose = (e) => {
    this.props.history.push('/map');
  }

  handleOnSelect = (data) => {
    this.setState({
      lands: data.lands,
      area: data.area
    });
    const { setFieldValue } = this.props.formik;
    setFieldValue('geojson', data.geojson);
  }

  handleOnSubmit = (e) => {
    const { basename, history, formik } = this.props;
    if (formik.values.geojson) {
      history.push(`${basename}/owner`);
    }
  }

  handleOnCloseTutorial = (e) => {
    this.setState({
      run: false
    });
  }

  handleJoyrideCallback = data => {
   const { action, index, status, type } = data;

   if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
     // Update state to advance the tour
     this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
     if(index < 4){
       this.setState({ stepIndex2: index+1 + (action === ACTIONS.PREV ? -1 : 1) });
     }
   }
   else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
     // Need to set our running state to false, so we can restart if we click start again.
     this.setState({ run: false });
   }

   console.groupCollapsed(type);
   console.log(data); //eslint-disable-line no-console
   console.groupEnd();
 };

  render() {
    const footerXs = [14, 0, 10];
    const { steps, run, stepIndex, stepIndex2, names} = this.state;

    return (
      <BaseLayout
        header={
          <div className="page-title">
            <Joyride
                callback={this.handleJoyrideCallback}
                steps={steps}
                stepIndex={stepIndex}
                run={run}
                locale={names}
                continuous={true}
                disableOverlayClose={true}
                hideBackButton={true}
                spotlightPadding={0}
              />
            <h2>ESCOGE TU<br/>TERRENO/PROPUESTA</h2>
            <ul className="actions">
              <li>
                <Button size="large" type="link" onClick={this.handleOnClose}><Icon type="close"/></Button>
              </li>
            </ul>
          </div>
        }
        subheader={
          <div className="page-subtitle">
            <h5>{this.state.lands.length} Parcelas escogidas - Área: {this.state.area} m<sup>2</sup> </h5>
            {this.state.run? <div className="overlay"></div> : null}
            {this.state.run? <Button style={{right: "0"}} className="ant-btn m33-btn ant-btn-secondary ant-btn-lg tourup" onClick={this.handleOnCloseTutorial}>Cerrar Tutorial</Button> : null}
            {this.state.run? <h1 style={{left: "0", color:"white", fontWeight:"bold"}} className="tourup">{this.state.stepIndex2}/5</h1> : null}
          </div>
        }
        footerXs={footerXs}
        footerRightComponent={
          <Button
            size="large"
            className="m33-btn ant-btn-xlg submitbtn"
            style={{ fontSize: '16px',borderRadius:"15px !important" }}
            type="secondary"
            onClick={this.handleOnSubmit}
            block>
            Submit
          </Button>
        }>
        <div className="m33-wizard">
          <div className="m33-wizard-vcenter">
            <MapEditor onSelect={this.handleOnSelect}/>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default MapStep;
