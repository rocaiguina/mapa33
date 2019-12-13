import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class InheritanceLandStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/inheritance-agree`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/owner-phone`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿El terreno es parte de una herencia?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
            <Radio.Group
              name="inheritance_land"
              buttonStyle="solid"
              value={formik.values.inheritance_land}
              onChange={formik.handleChange}
            >
              <Radio.Button className="inputprop radioprop radiosi form2" value={true}>Si</Radio.Button>
              <Radio.Button className="inputprop radioprop radiono form2" value={false}>No</Radio.Button>
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

export default InheritanceLandStep;
