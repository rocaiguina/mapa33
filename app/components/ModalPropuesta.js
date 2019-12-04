import React from "react";
import { Modal, Button, Steps, Input, Col, Row, Radio, DatePicker } from 'antd';
const {Step} = Steps;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
import moment from 'moment';

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

                >
                    <Steps current={current}>
                        <Step title="First"/>
                        <Step title="Second"/>
                        <Step title="Third"/>
                    </Steps>
                    <Row className="steps-content">
                    {current == '0' && (
                        <div>
                            <Row>
                                <Col md={4}/>
                                <Col md={8} style={{paddingLeft:"20px"}}>
                                    <h1>Regístrate</h1>
                                </Col>
                            </Row>
                            <Row>
                            <Col md={4}/>
                            <Col md={8} style={{padding:"20px"}}>
                                <Input style={{border:"2px dotted", borderRadius:"15px", marginBottom:"15px"}} size="large" placeholder="Nombre:" />
                                <Input style={{border:"2px dotted", borderRadius:"15px", marginBottom:"15px"}} size="large" placeholder="Apellido:" />
                                <Input style={{border:"2px dotted", borderRadius:"15px", marginBottom:"15px"}} size="large" placeholder="Usuario:" />
                            </Col>
                            <Col md={8} style={{padding:"20px"}}>
                                <Input style={{border:"2px dotted", borderRadius:"15px", marginBottom:"15px"}} size="large" placeholder="Password:" />
                                <Input style={{border:"2px dotted", borderRadius:"15px", marginBottom:"15px"}} size="large" placeholder="Email:" />
                                <Input style={{border:"2px dotted", borderRadius:"15px", marginBottom:"15px"}} size="large" placeholder="ZipCode:" />
                            </Col>
                            <Col md={4}/>
                            </Row>
                            <Row>
                                <Col md={8}/>
                                <Col md={8} style={{textAlign:"center", padding:"20px"}}>
                                    <Button style={{backgroundColor:"#f576a9", color:"Black", borderRadius:"15px"}}> Someter </Button>
                                </Col>
                            </Row>
                        </div>

                    )}
                    {current == '1' && (
                        <div>
                          <Row>
                            <Col md={4} />
                            <Col md={8}>
                              <h1>
                                ¿Existe transacci&oacute;n del terreno?
                              </h1>
                            </Col>
                            <Col md={8}>
                              <Radio.Group defaultValue="Si" buttonStyle="solid">
                                <Radio.Button value="Si">S&iacute;</Radio.Button>
                                <Radio.Button value="No">No</Radio.Button>
                              </Radio.Group>
                            </Col>
                            <Col md={4}/>
                          </Row>
                          <Row>
                            <Col md={4}/>
                            <Col md={8}>
                              <h1>Si contest&oacute; si,¿Cu&aacute;l es la fecha?</h1>
                            </Col>
                            <Col md={8}>
                                 <DatePicker defaultValue={moment(new Date(), dateFormatList[0])} format={dateFormatList} />
                            </Col>
                            <Col md={4}/>
                          </Row>
                        </div>
                    )}
                    {current == '2' && (
                        <div> paso 3 </div>
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
