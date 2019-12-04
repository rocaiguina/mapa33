import React from 'react';
import { Button } from 'antd';
import ClassNames from 'classnames';

export default function (props) {
  const buttonclass = ClassNames({
    'm33-btn': true,
    'ant-btn-xlarge': props.size == 'xlarge'
  });

  return (
    <Button className={buttonclass} {...props}>{props.children}</Button>
  )
}
