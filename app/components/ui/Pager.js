import React from 'react';
import Button from './Button';
import Icon from './Icon';

export default (props) => {
  return (
    <ul className="pager">
      <li className="previous">
        <Button type="primary" onClick={props.onPrevious}><Icon type="arrow-left-2"/></Button>
      </li>
      <li className="next">
        <Button type="primary" onClick={props.onNext}><Icon type="arrow-right-2"/></Button>
      </li>
    </ul>
  );
}
