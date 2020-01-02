import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class KnowOwnerStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.know_owner === true) {
      history.push(`${basename}/yesfillform`);
    }

    if (formik.values.know_owner === false) {
      history.push(`${basename}/mainuses`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/owner`);
  }

  handleOnChange = (event) => {
    const { basename, formik, history } = this.props;
    formik.setFieldValue('know_owner', event.target.value);

    if (event.target.value === true) {
      history.push(`${basename}/yesfillform`);
    }

    if (event.target.value === false) {
      history.push(`${basename}/mainuses`);
    }
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">        
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Conoces al dueño(a) del terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group
                name="know_owner"
                buttonStyle="solid"
                value={formik.values.know_owner}
                onChange={this.handleOnChange}
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

export default KnowOwnerStep;
