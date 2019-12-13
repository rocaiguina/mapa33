import React from 'react';
import { withRouter } from 'react-router';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ProposeLandStep extends React.Component {
  
  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;

    if (formik.values.want_propose === true) {
      history.push(`${basename}/map`);
    }

    if (formik.values.want_propose === false) {
      history.push('/map');
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}`);
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={4}/>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}} >
              <h1>
                ¿Quieres proponer un terreno?
              </h1>
          </Col>
          <Col md={8} style={{textAlign:"center", marginLeft:"auto", marginRight:"auto"}}>
              <Radio.Group
                name="want_propose"
                buttonStyle="solid"
                value={formik.values.want_propose}
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

export default withRouter(ProposeLandStep);