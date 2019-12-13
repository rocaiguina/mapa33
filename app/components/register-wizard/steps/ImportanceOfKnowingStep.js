import React from 'react';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ImportanceOfKnowingStep extends React.Component {

  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/firstproposals`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/valueplace`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Por qu&eacute; es importante saber que Utop&iacute;a existe?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"left"}}>
              <Radio.Group
                name="importance_of_knowing"
                value={formik.values.importance_of_knowing}
                onChange={formik.handleChange}
              >
                <div style={{display:"flex"}}>
                  <Radio value="nature" className="blockstyleradio" ></Radio>
                  <div><h3>Es importante que sus recursos apoyan la supervivencia de la flora y fauna de ese lugar.</h3></div>
                </div>
                <div style={{display:"flex", marginTop:"30px"}}>
                  <Radio value="resources" className="blockstyleradio" ></Radio>
                  <div><h3>Es importante saber que ese lugar proporciona aire fresco y agua limpia a mi comunidad.</h3></div>
                </div>
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

export default ImportanceOfKnowingStep;
