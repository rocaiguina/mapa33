import React from 'react';
import Button from '../ui/Button';
import BaseLayout from '../layout/base';
import Icon from '../ui/Icon';

export default (props) => {
  return (
    <BaseLayout
      header={
        <div className="page-title">
          { props.title }
          <ul className="actions">
            <li>
              <Button size="large" type="link" onClick={props.onClose}><Icon type="close"/></Button>
            </li>
          </ul>
        </div>
      }
      footerRightComponent={ props.footerRightComponent }
    >
      <div className="m33-wizard">
        <div className="m33-wizard-vcenter">
          { props.component }
        </div>
      </div>
    </BaseLayout>
  );
}
