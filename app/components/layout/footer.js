import React, { Component } from 'react';
import { Col, Row } from 'antd';
import ClassNames from 'classnames';

class Footer extends Component {
  render () {
    const logo = this.props.dark ? 'logo-white.png' : 'logo-black.png';

    const footerClass = ClassNames('footer', {
      'footer-dark': this.props.dark
    });

    return (
      <footer className={footerClass}>
        <div className="container">
          <Row gutter={0}>
            <Col md={8} xs={16}>
              <div className="first-column">
                <img src={'/images/' + logo} />
              </div>
            </Col>
            <Col md={12} xs={0}>
              <div className="second-column">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore</p>
              </div>
            </Col>
            <Col md={4} xs={8}>
              <div className="third-column">
                { this.props.rightComponent ?
                  this.props.rightComponent :
                  <img src="/images/naturaleza.png"/>
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
