import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class InheritanceAgreeStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.inheritance_agree != null){
      history.push(`${basename}/problem`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/inheritance`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
            <h1>¿Todos los herederos están de acuerdo?</h1>
          </Col>
          <Col md={8} style={{textAlign:"center",marginLeft:"auto", marginRight:"auto"}}>
            <Radio.Group
              name="inheritance_agree"
              buttonStyle="solid"
              value={formik.values.inheritance_agree}
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

export default InheritanceAgreeStep;
