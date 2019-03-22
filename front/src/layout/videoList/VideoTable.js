import React, { Component } from 'react';
import * as Actions from './redux/action';
import { link, index } from '../../left/redux/action';
import { connect } from 'react-redux';
import { Table, Icon, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'

const { Column, ColumnGroup } = Table;


class VideoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: document.body.clientHeight - 250
    }
    this.videoShow = this.videoShow.bind(this);
  }
  componentDidMount() {
    this.props.onlist();
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize = () => {
    this.setState({window: document.body.clientHeight - 250})
  }
  videoShow(record) {
    this.props.onChangeindex(2);
    this.props.onChangeLink("/about");
    // window.location.replace("#/about/"+record.videoUrl+"/"+record.videoImg);
  }
  // 编辑音乐
  handleEdit = (record) => {
    this.props.onModelName('edit');
    this.props.onvideoModle(true);
    this.props.onModleData(record)
    console.log(record)
  }
  // 删除音乐
  handleDelet = (record) => {
    this.props.onModelName('del');
    this.props.onvideoModle(true);
    this.props.onModleData(record)
    console.log(record)
  }
  render() {
    const data = this.props.addSong.videoList.searchVideoList.map((item) => {
      const data = {
        videoId: item.video_id,
        videoName: item.video_name,
        authorName: item.author_name,
        videoUrl: item.video_url,
        videoAlbum: item.album_name,
        videoAlbumdate: item.album_data,
        videoImg: item.video_img,
        videoTime: item.video_time
      }
      return data
    })
    return (
      <Table
        scroll = {{ y: this.state.window }}
        dataSource={data}
        pagination={{  //分页
          pageSize: 7,  //显示几条一页
          defaultPageSize: 7, //默认显示几条一页
          showSizeChanger: false,  //是否显示可以设置几条一页的选项
        }}>
        <Column
          title="歌曲名称"
          dataIndex="videoName"
          key="videoName"
          defaultSortOrder='ascend'
          sorter={(a, b) => a.videoName - b.videoName}
          width={400}
          render={(text, record) => (
            <span className='songName' onClick={() => { this.addvideoTolist(record) }}>
              {record.videoName}
            </span>
          )}
        />
        <Column
          title="歌手名"
          dataIndex="authorName"
          key="authorName"
          defaultSortOrder='ascend'
          sorter={(a, b) => a.authorName - b.authorName}
        />
        <Column
          title="专辑名称"
          dataIndex="videoAlbum"
          key="videoAlbum"
        />
        <Column
          title="专辑封面"
          dataIndex="videoImg"
          key="videoImg"
          width={110}
          render={(text, record) => (
            <span>
              <img src={"http://localhost:3000/api/img/" + record.videoImg} style={{ width: 70, height: 70 }} />
            </span>
          )}
        />
        <Column
          title="时长"
          dataIndex="videoTime"
          key="videoTime"
          width={60}
        />
        <Column
          title="发专时间"
          dataIndex="videoAlbumdate"
          key="videoAlbumdate"
          width={105}
        />
        <Column
          title="操作"
          key="action"
          width={250}
          render={(text, record) => (
            <div className='userOperation'>
              <Link to={"/about/" + record.videoUrl + "/" + record.videoImg} onClick={text => { this.videoShow(record) }}><Button type="primary" size={'default'} onClick={text => { this.videoShow(record) }}>播放</Button></Link>
              <Button size={'default'} onClick={text => { this.handleEdit(record) }}>修改</Button>
              <Button type="danger" size={'default'} onClick={text => { this.handleDelet(record) }}>删除</Button>
            </div>
          )}
        />
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onlist: () => {
      dispatch(Actions.getList());
    },
    onAddvideoToList: (data) => {
      dispatch(Actions.addvideoToList(data));
    },
    onModelName: (data) => {
      dispatch(Actions.modleName(data));
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    onvideoModle: (bool) => {
      dispatch(Actions.videoModle(bool));
    },
    onChangeLink: (data) => {
      dispatch(link(data))
    },
    onChangeindex: (data) => {
      dispatch(index(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoTable));