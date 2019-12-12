import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class OwnerSuccessionStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/problem`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/phoneowner`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿El dueño del terreno es una sucesión?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
            <Radio.Group
              name="owner_succession"
              buttonStyle="solid"
              value={formik.values.owner_succession}
              onChange={formik.handleChange}
            >
              <Radio.Button className="inputprop radioprop radiosi form2" value={true}>Si</Radio.Button>
              <Radio.Button className="inputprop radioprop radiono form2" value={false}>No</Radio.Button>
            </Radio.Group>
          </Col>
          <Col md={4}/>
        </Row>
        <br/>
        <br/>
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
            <h1>¿Todos los miembros están de acuerdo?</h1>
          </Col>
          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
            <Radio.Group
              name="owner_members_agree"
              buttonStyle="solid"
              value={formik.values.owner_members_agree}
              onChange={formik.handleChange}
            >
              <Radio.Button className="inputprop radioprop radiosi form3" value={true}>Si</Radio.Button>
              <Radio.Button className="inputprop radioprop radiono form3" value={false}>No</Radio.Button>
            </Radio.Group>
          </Col>
          <Col md={4}/>
        </Row>
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default OwnerSuccessionStep;
