import React from 'react';
import Slider from 'react-slick';
import { Button, Card, Icon, Row, Col } from 'antd';
import ClassNames from 'classnames';

const { Meta } = Card;

class ListView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 1
    };
  }

  handleAfterChange = (index) => {
    this.setState({
      current: index + 1
    });
  }

  handleOnPrev = (event) => {
    this.slider.slickPrev();
  }

  handleOnNext = (event) => {
    this.slider.slickNext();
  }

  render () {
    const options = {
      centerMode: true,
      infinite: true,
      arrows: false,
      slidesToShow: 3,
      centerPadding: '60px',
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    };

    return (
      <div className="slick-slider-maplist">
        <Slider
          ref={slider => (this.slider = slider)}
          afterChange={this.handleAfterChange}
          {...options}>
          {
            this.props.items.map((item) => 
              <div key={item}>
                <Card 
                  className={ 
                    ClassNames(
                      'land-card',
                      { 
                        'land-protected': item.use_type == 'protected',
                        'land-proposed': item.use_type == 'proposed'
                      }
                    )
                  }
                  bordered={false}
                  cover={<img src="https://dummyimage.com/300x300/dddddd/ffffff"/>}
                  actions={[
                    <div className="text-left"><Icon type="heart" key="heart" /> 10,999</div>,
                    <div className="text-right"><Icon type="share-alt" key="share-alt" /></div>
                  ]}>
                  <Meta title={item.name} description={item.location}/>
                </Card>
              </div>
              )
          }
        </Slider>
        <p className="slick-slider-paginator">{ this.state.current }/{this.props.items.length}</p>
        <Row>
          <Col sm={24} xs={0}>
            <Button onClick={this.handleOnPrev}><i className="m33-icon m33-icon-arrow-left-2"></i></Button>
            <Button onClick={this.handleOnNext}><i className="m33-icon m33-icon-arrow-right-2"></i></Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListView;