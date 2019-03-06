import React, { Component } from 'react';
import { Row, Col } from 'antd';
import HomeTab from './HomeTab';
import HomeCarousel from './Carousel';
import NewSongList from './NewSongList'
import NewVideoList from './NewVideoList'
import './tab.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className='content' style={{ margin: 5, padding: 6, background: '#fff' }}>
        <Row>
          <Col span={12}>
            <HomeCarousel />
          </Col>
          <Col span={12}>
            <Col span={12} style={{ padding: 6, background: '#fff' }}>
              <NewSongList />
            </Col>
            <Col span={12} style={{ padding: 6, background: '#fff' }}>
              <NewVideoList />
            </Col>
          </Col>
          <Col span={24}>
            <HomeTab />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;