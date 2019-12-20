import React from 'react';
import { Button } from 'antd';
import ClassNames from 'classnames';

export default function (props) {
  const buttonclass = ClassNames({
    'm33-btn': true,
    'm33-btn-blue': props.color == 'blue' ? true : false,
    'm33-btn-orange': props.color == 'orange' ? true : false,
    'm33-btn-white': props.color == 'white' ? true : false,
    'ant-btn-xlg': props.xlg ? true : false,
    'ant-btn-xxlg': props.xxlg ? true : false
  });

  const buttonWrapperClass = ClassNames({
    'm33-btn-bordered': props.bordered ? true : false,
    'm33-btn-bordered-lg': props.size == 'large'
  });

  return (
    <div className={buttonWrapperClass}>
      <Button className={buttonclass} {...props}>{props.children}</Button>
    </div>
  )
}
