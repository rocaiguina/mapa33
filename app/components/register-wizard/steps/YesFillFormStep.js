import React from 'react';
import { Col, Row, Input } from 'antd';
import Pager from '../../ui/Pager';

class YesFillFormStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error_name: false,
        error_value: false,
        error_message_email: '',
        error_message_name: ''
    }
  }

  handleOnNext = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values.know_owner){   
      if(formik.initialValues.owner_name == formik.values.owner_name){      
        console.log(formik.values.owner_name+ " value");    
        this.setState({
            error_name: true,
            error_message_name: 'Debe ingresar el nombre obligatoriamente'
        })
      }else{
          history.push(`${basename}/mainuses`);
      }
    }
  }

  handleOnPrevious = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/knowowner`);
  }

  requiredform(){
    const { formik } = this.props;
    if(!formik.values.owner_name || !formik.values.owner_email || !formik.values.owner_phone){
      return <label class="mensajerror">Rellene todos los espacios</label>;
    }
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-t-20">
        <Row>
          <Col md={8}/>
          <Col id="propcol1" md={8} >
              {this.state.error_name ? <label class="mensajerror">{this.state.error_message_name}</label> : null}
              <Input
                name="owner_name"
                className="inputprop"
                size="large"
                placeholder="Nombre:"
                value={formik.values.owner_name}
                onChange={formik.handleChange}
              />
              <Input
                name="owner_phone"
                className="inputprop"
                size="large"
                placeholder="Tel:"
                value={formik.values.owner_phone}
                onChange={formik.handleChange}
              />
              {this.state.error_value ? <label class="mensajerror">{this.state.error_message_email}</label> : null}
              <Input
                name="owner_email"
                className="inputprop"
                size="large"
                placeholder="@:"
                value={formik.values.owner_email}
                onChange={formik.handleChange}
              />
          </Col>
          <Col md={8}/>
        </Row>
        <Pager
          onPrevious={this.handleOnPrevious}
          onNext={this.handleOnNext}
        />
      </div>
    );
  }
}

export default YesFillFormStep;
