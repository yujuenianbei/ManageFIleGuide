import React, { Component } from 'react';
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
class NewSongList extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>最新歌曲</div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design"
              />
            </List.Item>
          )}
        />,
      </div>
    )
  }
}

export default NewSongList;