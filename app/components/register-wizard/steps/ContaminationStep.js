import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ContaminationStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/wichuse`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/historicuses`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿El terreno ha tenido problemas de contaminación en el pasado?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group
                name="has_contamination"
                buttonStyle="solid"
                value={formik.values.has_contamination}
                onChange={formik.handleChange}
              >
                <Radio.Button className="inputprop radioprop radiosi form1" value={true}>Si</Radio.Button>
                <Radio.Button className="inputprop radioprop radiono form1" value={false}>No</Radio.Button>
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

export default ContaminationStep;
