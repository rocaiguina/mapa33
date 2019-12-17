import React from 'react';
import { Col, Input, Row } from 'antd';
import Button from '../../ui/Button';
import { ErrorMessage } from 'formik';

class RegisterStep extends React.Component {

  handleOnSubmit = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/propose`);
  }
  renderSwitch(param, errors, initialValues) {
    if(param == initialValues){
      return <Button type="secondary" size="large" block disabled >Someter vacío</Button>;
    }else if (errors){
      if (errors.u_name) {
        return <Button type="secondary" size="large" block disabled >Someter uname </Button>;
      }else if (errors.u_lastname) {
        return <Button type="secondary" size="large" block disabled >Someter lastname </Button>;
      } else if (errors.u_email) {
        return <Button type="secondary" size="large" block disabled >Someter email </Button>;
      }else if (errors.u_username) {
        return <Button type="secondary" size="large" block disabled >Someter username </Button>;
      }else if (errors.u_zip) {
        return <Button type="secondary" size="large" block disabled >Someter zipcode </Button>;
      }else if (errors.u_password) {
        return <Button type="secondary" size="large" block disabled >Someter password </Button>;
      }else{
        return <Button type="secondary" size="large" block onClick={this.handleOnSubmit}>Someter</Button>;
      }
    }
  }

  render() {
    const { formik } = this.props;
    return (
      <div className="m-b-20">
          <Row>
              <Col md={4}/>
              <Col md={8} style={{paddingLeft:"20px"}}>
                  <h1>Regístrate: </h1>
              </Col>
          </Row>
          <Row>
              <Col md={4}/>
              <Col id="propcol1" md={8} >
                  <Input
                    name="u_name"
                    className="inputprop"
                    size="large"
                    placeholder="Nombre:"
                    value={formik.values.u_name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.u_name ? <div>{formik.errors.u_name}</div> : null}
                  <Input
                    name="u_lastname"
                    className="inputprop"
                    size="large"
                    placeholder="Apellido:"
                    value={formik.values.u_lastname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.u_lastname ? <div>{formik.errors.u_lastname}</div> : null}
                  <Input
                    name="u_username"
                    className="inputprop"
                    size="large"
                    placeholder="Usuario:"
                    value={formik.values.u_username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.u_username ? <div>{formik.errors.u_username}</div> : null}
              </Col>
              <Col id="propcol2" md={8} >
                  <Input
                    name="u_password"
                    className="inputprop"
                    size="large"
                    type="password"
                    placeholder="Password:"
                    value={formik.values.u_password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.u_password ? <div>{formik.errors.u_password}</div> : null}
                  <Input
                    name="u_email"
                    className="inputprop"
                    size="large"
                    placeholder="Email:"
                    value={formik.values.u_email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.u_email ? <div>{formik.errors.u_email}</div> : null}
                  <Input
                    name="u_zip"
                    className="inputprop"
                    size="large"
                    placeholder="ZipCode:"
                    value={formik.values.u_zip}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.u_zip ? <div>{formik.errors.u_zip}</div> : null}
              </Col>
              <Col md={4}/>
          </Row>
          <br/>
          <br/>
          <Row>
              <Col lg={{ span: 6, offset: 9 }}>
                {this.renderSwitch(formik.values, formik.errors, formik.initialValues)}
              </Col>
          </Row>
      </div>
    );
  }
}

export default RegisterStep;
