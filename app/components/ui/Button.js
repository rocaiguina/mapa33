import React from 'react';
import { Button } from 'antd';
import ClassNames from 'classnames';

export default function (props) {
  const buttonclass = ClassNames({
    'm33-btn': true,
  });

  const buttonWrapperClass = ClassNames({
    'm33-btn-bordered': props.bordered ? true : false,
    'm33-btn-bordered-lg': props.size == 'large',
  });

  return (
    <div className={buttonWrapperClass}>
      <Button className={buttonclass} {...props}>{props.children}</Button>
    </div>
  )
}
