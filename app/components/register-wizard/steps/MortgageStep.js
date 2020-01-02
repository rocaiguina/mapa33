import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class MortgageStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.has_mortgage != null){
      history.push(`${basename}/surveying`);
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/problem`);
  }

  handleOnChange = (event) => {
    const { basename, formik, history } = this.props;
    formik.setFieldValue('has_mortgage', event.target.value);
    history.push(`${basename}/surveying`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Existe una hipoteca sobre el terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group
                name="has_mortgage"
                buttonStyle="solid"
                value={formik.values.has_mortgage}
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

export default MortgageStep;
