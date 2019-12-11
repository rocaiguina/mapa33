import React from 'react';
import { Col, Radio, Row, Checkbox } from 'antd';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

class  extends React.Component {

  handleOnChange = (event) => {
    this.props.wizard.next();
  }

  handleOnNext = (event) => {
    this.props.wizard.next();
  }

  handleOnPrevious = (event) => {
    this.props.wizard.previous();
  }

  render() {
    return (
      <div className="m-t-20">
        <br/>
        <br/>
        <br/>
        <Row>

        </Row>
        <br/>
        <br/>
        <br/>
        <Row>

        </Row>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default ProposeLandStep;
