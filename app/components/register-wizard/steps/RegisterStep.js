import React from 'react';
import { Col, Input, Row } from 'antd';
import Button from '../../ui/Button';

class RegisterStep extends React.Component {

  handleOnSubmit = (event) => {
    const { basename, history } = this.props;
    history.push(`${basename}/owner`);
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
                  <Input 
                    name="u_lastname"
                    className="inputprop"
                    size="large"
                    placeholder="Apellido:"
                    value={formik.values.u_lastname}
                    onChange={formik.handleChange}
                  />
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
                  <Input
                    name="u_password"
                    className="inputprop"
                    size="large"
                    type="password"
                    placeholder="Password:"
                    value={formik.values.u_password}
                    onChange={formik.handleChange}
                  />
                  <Input
                    name="u_email"
                    className="inputprop"
                    size="large"
                    placeholder="Email:"
                    value={formik.values.u_email}
                    onChange={formik.handleChange}
                  />
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