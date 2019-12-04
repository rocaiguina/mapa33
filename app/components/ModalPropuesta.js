import React from "react";
import { Modal, Button, Steps, Input, Col, Row, Radio, DatePicker } from 'antd';
const {Step} = Steps;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
import moment from 'moment';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;


const steps = [
    {
        title: 'First',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },

];



class ModalPropuesta extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            current: 0
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { current } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal
                    title="FORMULARIO DE PROPUESTA"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    centered={true}
                    width="100%"
                >

                    <Row className="steps-content">
                    {current == '0' && (
                        <div>
                            <Row style={{marginTop: "40px"}}>
                                <Col md={4}/>
                                <Col md={8} style={{paddingLeft:"20px"}}>
                                    <h1>Regístrate </h1>
                                </Col>
                            </Row>
                            <Row>
                            <Col md={4}/>
                            <Col id="propcol1" md={8} >
                                <Input className="inputprop" size="large" placeholder="Nombre:" />
                                <Input className="inputprop" size="large" placeholder="Apellido:" />
                                <Input className="inputprop" size="large" placeholder="Usuario:" />
                            </Col>
                            <Col id="propcol2" md={8} >
                                <Input className="inputprop" size="large" placeholder="Password:" />
                                <Input className="inputprop" size="large" placeholder="Email:" />
                                <Input className="inputprop" size="large" placeholder="ZipCode:" />
                            </Col>
                            <Col md={4}/>
                            </Row>
                            <Row>
                                <Col md={8}/>
                                <Col md={8} style={{textAlign:"center", padding:"20px"}}>
                                    <Button className="btnprimary" size="large"> Someter </Button>
                                </Col>
                            </Row>
                        </div>

                    )}
                    {current == '1' && (
                        <div>
                          <Row style={{marginTop: "20px"}}>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                                <h1>
                                  ¿Existe transacci&oacute;n del terreno?
                                </h1>
                            </Col>
                            <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                                <Radio.Group defaultValue="Si" buttonStyle="solid">
                                  <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                                  <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                          <Row style={{marginTop: "40px"}}>
                            <Col md={4}/>
                            <Col md={8} style={{textAlign:"center"}}>
                              <h1>Si contest&oacute; si,¿Cu&aacute;l es la fecha?</h1>
                            </Col>
                            <Col md={8} style={{textAlign:"center"}} className="spacecalendar">
                              <DatePicker defaultValue={moment(new Date(), dateFormatList[0])} format={dateFormatList} className="inputCalendar" />
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                    )}
                    {current == '2' && (
                      <div>
                        <Row style={{marginTop: "20px"}}>
                          <Col md={4}/>
                          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
                              <h1>
                                ¿El due&ntilde;o del terreno es una sucesión?
                              </h1>
                          </Col>
                          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
                            <Radio.Group defaultValue="Si" buttonStyle="solid">
                              <Radio.Button className="inputprop radioprop radiosi form2" value="Si">Si</Radio.Button>
                              <Radio.Button className="inputprop radioprop radiono form2" value="No">No</Radio.Button>
                            </Radio.Group>
                          </Col>
                          <Col md={4}/>
                        </Row>
                        <Row style={{marginTop: "40px"}}>
                          <Col md={4}/>
                          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
                            <h1>¿Todos los miembros están de acuerdo?</h1>
                          </Col>
                          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
                            <Radio.Group defaultValue="Si" buttonStyle="solid">
                              <Radio.Button className="inputprop radioprop radiosi form3" value="Si">Si</Radio.Button>
                              <Radio.Button className="inputprop radioprop radiono form3" value="No">No</Radio.Button>
                            </Radio.Group>
                          </Col>
                          <Col md={4}/>
                        </Row>
                      </div>
                    )}
                    {current == '3' && (
                      <div>
                        <Row style={{marginTop: "20px"}}>

                        </Row>
                      </div>
                    )}
                    </Row>
                    <div>
                    <Row className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                    </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalPropuesta;
