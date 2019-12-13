import React from 'react';
import { Col, Input, Row } from 'antd';
import BaseLayout from '../../layout/base';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import MapEditor from '../../map-view/Editor';

class MapStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lands: []
    };
  }

  handleOnClose = (e) => {
    this.props.history.push('/map');
  }

  handleOnSelect = (data) => {
    this.setState({
      lands: data.lands
    });
    const { setFieldValue } = this.props.formik;
    setFieldValue('geojson', data.geojson);
  }

  handleOnSubmit = (e) => {
    const { basename, history, formik } = this.props;
    if (formik.values.geojson) {
      history.push(`${basename}/knowowner`);
    }
  }

  render() {
    const footerXs = [14, 0, 10];
    return (
      <BaseLayout
        header={
          <div className="page-title">
            <h2>ESCOGE TU<br/>TERRENO/PROPUESTA</h2>
            <ul className="actions">
              <li>
                <Button size="large" type="link" onClick={this.handleOnClose}><Icon type="close"/></Button>
              </li>
            </ul>
          </div>
        }
        subheader={
          <div className="page-subtitle">
            <h5>{this.state.lands.length} Parcelas escogidas</h5>
          </div>
        }
        footerXs={footerXs}
        footerRightComponent={
          <Button
            size="large"
            className="m33-btn ant-btn-xlg"
            style={{ fontSize: '16px' }}
            type="secondary"
            onClick={this.handleOnSubmit}
            block
          >Submit</Button>
        }
      >
        <div className="m33-wizard">
          <div className="m33-wizard-vcenter">
            <MapEditor onSelect={this.handleOnSelect}/>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default MapStep;