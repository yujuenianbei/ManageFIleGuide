import React, { Component } from 'react';
import { Carousel } from 'antd';

class HomeCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Carousel autoplay>
        <div>
          <div className='homeCarouselImg'>
            <img src='photo.jpg' />
          </div>
        </div>
        <div>
        <div className='homeCarouselImg'>
            <img src='photo.jpg' />
          </div>
        </div>
        <div>
        <div className='homeCarouselImg'>
            <img src='photo.jpg' />
          </div>
        </div>
        <div>
        <div className='homeCarouselImg'>
            <img src='photo.jpg' />
          </div>
        </div>
      </Carousel>
    )
  }
}

export default HomeCarousel;