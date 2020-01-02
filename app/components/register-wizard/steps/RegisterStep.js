import React from 'react';
import { Col, Input, Row } from 'antd';
import Button from '../../ui/Button';
import { ErrorMessage } from 'formik';

class RegisterStep extends React.Component {

  handleOnSubmit = (event) => {
    const { basename, history, formik } = this.props;
    if(formik.values != formik.initialValues){
      if (!formik.errors.u_name || !formik.errors.u_lastname || !formik.errors.u_email || !formik.errors.u_username || !formik.errors.u_zip || !formik.errors.u_password) {
        history.push(`${basename}/propose`);
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
                  {formik.errors.u_name ? <label class="mensajerror">{formik.errors.u_name}</label> : null}
                  <Input
                    name="u_name"
                    className="inputprop"
                    size="large"
                    placeholder="Nombre:"
                    value={formik.values.u_name}
                    onChange={formik.handleChange}
                  />
                {formik.errors.u_lastname ? <label class="mensajerror">{formik.errors.u_lastname}</label> : null}
                  <Input
                    name="u_lastname"
                    className="inputprop"
                    size="large"
                    placeholder="Apellido:"
                    value={formik.values.u_lastname}
                    onChange={formik.handleChange}
                  />
                {formik.errors.u_username ? <label class="mensajerror">{formik.errors.u_username}</label> : null}
                  <Input
                    name="u_username"
                    className="inputprop"
                    size="large"
                    placeholder="Usuario:"
                    value={formik.values.u_username}
                    onChange={formik.handleChange}
                  />
              </Col>
              <Col id="propcol2" md={8} >
                  {formik.errors.u_password ? <label class="mensajerror">{formik.errors.u_password}</label> : null}
                  <Input
                    name="u_password"
                    className="inputprop"
                    size="large"
                    type="password"
                    placeholder="Password:"
                    value={formik.values.u_password}
                    onChange={formik.handleChange}
                  />
                {formik.errors.u_email ? <label class="mensajerror">{formik.errors.u_email}</label> : null}
                  <Input
                    name="u_email"
                    className="inputprop"
                    size="large"
                    placeholder="Email:"
                    value={formik.values.u_email}
                    onChange={formik.handleChange}
                  />
                {formik.errors.u_zip ? <label class="mensajerror">{formik.errors.u_zip}</label> : null}
                  <Input
                    name="u_zip"
                    className="inputprop"
                    size="large"
                    placeholder="ZipCode:"
                    value={formik.values.u_zip}
                    onChange={formik.handleChange}
                  />
              </Col>
              <Col md={4}/>
          </Row>
          <br/>
          <br/>
          <Row>
              <Col lg={{ span: 6, offset: 9 }}>
                <Button type="secondary" size="large" block onClick={this.handleOnSubmit}>Someter</Button>
              </Col>
          </Row>
      </div>
    );
  }
}

export default RegisterStep;
