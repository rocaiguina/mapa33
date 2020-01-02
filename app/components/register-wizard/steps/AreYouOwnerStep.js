import React from 'react';
import { Col, Row, Radio } from 'antd';
import Pager from '../../ui/Pager';

class AreYouOwnerStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.are_u_owner === true) {
      history.push(`${basename}/catastro-number`);
    }

    if (formik.values.are_u_owner === false) {
      history.push(`${basename}/knowowner`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/propose`);
  }

  handleOnChange = (event) => {
    const { basename, formik, history } = this.props;
    formik.setFieldValue('are_u_owner', event.target.value);

    if (event.target.value === true) {
      history.push(`${basename}/catastro-number`);
    }

    if (event.target.value === false) {
      history.push(`${basename}/knowowner`);
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
                ¿Eres Dueño del terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group
                name="are_u_owner"
                buttonStyle="solid"
                value={formik.values.are_u_owner}
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

export default AreYouOwnerStep;
