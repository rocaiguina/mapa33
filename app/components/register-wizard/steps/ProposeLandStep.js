import React from 'react';
import { withRouter } from 'react-router';
import { Col, Radio, Row } from 'antd';
import Pager from '../../ui/Pager';

class ProposeLandStep extends React.Component {
  
  handleOnNext = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/location`);
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/owner`);
  }

  render() {
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
              <Radio.Group buttonStyle="solid">
                <Radio.Button className="inputprop radioprop radiosi form1" value="Si">Si</Radio.Button>
                <Radio.Button className="inputprop radioprop radiono form1" value="No">No</Radio.Button>
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