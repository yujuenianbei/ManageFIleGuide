import React, { Component } from 'react';
import G2 from '@antv/g2';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    // G2 初始化图形代码
    this.chart = new G2.Chart({
      // this.containerRef.current 即为引用
      container: this.containerRef.current,
      width: 450,
      height: 300
    });

    // 下文会介绍
    this.refreshChart();
  }
  callback = (key) => {
    console.log(key);
  }

  refreshChart = () => {
    // 接收 data 属性作为数据源
    this.chart.source([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 1150 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
    // 此处为硬编码，配置源自 G2 官方示例： https://github.com/antvis/g2
    // 实际开发中需要封装，推荐直接使用 BizCharts。
    this.chart.interval().position('genre*sold').color('genre');
    this.chart.render();
  };

  render() {
    const state = this.state;
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Tab 1" key="1">
          <div ref={this.containerRef} />
        </TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    )
  }
}

export default HomeTab;