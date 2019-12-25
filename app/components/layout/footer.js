import React, { Component } from 'react';
import { Col, Row } from 'antd';
import ClassNames from 'classnames';

class Footer extends Component {
  render () {
    const logo = this.props.dark ? 'logo-white.png' : 'logo-black.png';

    const footerClass = ClassNames('footer', {
      'footer-dark': this.props.dark
    });

    const xs = this.props.xs || [16, 0, 8];

    return (
      <footer className={footerClass}>
        <div className="container">
          <Row gutter={0}>
            <Col md={8} xs={xs[0]}>
              <div className="first-column">
                <img src={'/images/' + logo} className="img-responsive" />
              </div>
            </Col>
            <Col md={12} xs={xs[1]}>
              <div className="second-column">
                <p>Nuestra meta es proteger el 33% de las islas de Puerto Rico para el 2033. Ayúdanos a hacer historia.</p>
              </div>
            </Col>
            <Col md={4} xs={xs[2]}>
              <div className="third-column">
                { this.props.rightComponent ?
                  this.props.rightComponent :
                  <img src="/images/naturaleza.png" className="img-responsive" />
                }
              </div>
            </Col>
          </Row>
          <div className="line"></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
