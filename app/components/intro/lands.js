import React from 'react';
import { Button } from 'antd';

export default (props) => {
  return (
    <div className="intro intro-text">
      <div>
        <Button onClick={props.onClose}><i className="m33-icon m33-icon-close"></i></Button>
      </div>
      <h1>LAND</h1>
    </div>
  );
}