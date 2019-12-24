import React from 'react';
import { Col, Input, Row } from 'antd';
import Button from '../../ui/Button';
import Joyride from 'react-joyride';

class PruebaTour extends React.Component {
/* Se hicieron cambios en nombres de Tooltips de joyride, ademas de colores, y la función de close se integro en la de skip, lo más probable es que se pierda-*/
  handleOnSubmit = (event) => {
    this.props.wizard.next();
  }
  constructor(props) {
      super(props);
      this.state = {
        steps: [
          {
            target: '.nombre',
            content: 'This is my awesome feature!',
            placementBeacon: "top",
            disableBeacon: "false"
          },
          {
            target: '.apellido',
            content: 'This another awesome feature!',
            placementBeacon: "top",
          },
          {
            target: '.usuario',
            content: 'This another awesome feature!',
            placementBeacon: "top",
          },
          {
            target: '.password',
            content: 'This another awesome feature!',
            placementBeacon: "top",
          },
          {
            target: '.email',
            content: 'This another awesome feature!',
            placementBeacon: "top",
          },
          {
            target: '.zipcode',
            content: 'This another awesome feature!',
            placementBeacon: "top",
          },
          {
            target: '.eso',
            content: 'This another awesome feature!',
            placementBeacon: "top",
          },
        ],
      };
  }



  render() {
    const { steps } = this.state;
    return (
      <div className="m-b-20">
        <Joyride
            steps={steps}
            run={true}
            continuous={true}
            showSkipButton={true}
            autoStart={true}
            styles={{
            options: {
              primaryColor: 'rgba(255,255,255,1)',
            }
          }}
          />
          <Row>
              <Col md={4}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1>Reg&iacute;strate: </h1>
              </Col>
          </Row>
          <Row>
              <Col md={4}/>
              <Col id="propcol1" md={8} >
                  <Input className="inputprop nombre" size="large" placeholder="Nombre:" />
                  <Input className="inputprop apellido" size="large" placeholder="Apellido:" />
                  <Input className="inputprop usuario" size="large" placeholder="Usuario:" />
              </Col>
              <Col id="propcol2" md={8} >
                  <Input className="inputprop password" size="large" placeholder="Password:" />
                  <Input className="inputprop email" size="large" placeholder="Email:" />
                  <Input className="inputprop zipcode" size="large" placeholder="ZipCode:" />
              </Col>
              <Col md={4}/>
          </Row>
          <br/>
          <br/>
          <Row>
              <Col lg={{ span: 6, offset: 9 }}>
                  <Button style={{borderRadius:"25px"}} className="eso" type="secondary" size="large" block onClick={this.handleOnSubmit}>Someter</Button>
              </Col>
          </Row>
      </div>
    );
  }
}

export default PruebaTour;
