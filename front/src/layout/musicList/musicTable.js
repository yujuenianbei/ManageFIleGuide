import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Table, Icon, Divider, Button } from 'antd';

const { Column, ColumnGroup } = Table;


class MusicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: document.body.clientHeight - 250
    }
    this.addSongTolist = this.addSongTolist.bind(this);
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
  // 添加歌曲到播放列表
  addSongTolist(record) {
    this.props.onAddSongToList(record)
    console.log(record)
  }
  // 编辑音乐
  handleEdit = (record) => {
    this.props.onModelName('edit');
    this.props.onSongModle(true);
    this.props.onModleData(record)
    console.log(record)
  }
  // 删除音乐
  handleDelet= (record) => {
    this.props.onModelName('del');
    this.props.onSongModle(true);
    this.props.onModleData(record)
    console.log(record)
  }
  showLyric =(record) =>{
    this.props.onModelName('lyric');
    this.props.onSongModle(true);
    this.props.onModleData(record);
    console.log(record)
  }
  render() {
    const data = this.props.addSong.musicList.searchMusicList.map((item) => {
      const data = {
        songId: item.song_id,
        songName: item.song_name,
        authorName: item.author_name,
        songUrl: item.song_url,
        songAlbum: item.album_name,
        songAlbumdate: item.album_data,
        songImg: item.song_img,
        // songTime: item.song_time
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
          dataIndex="songName"
          key="songName"
          width= {500}
          sorter={(a, b) => a.songName - b.songName}
          render={(text, record) => (
            <span className='songName' onClick={()=>{this.addSongTolist(record)}}>
              {record.songName}
            </span>
          )}
        />
        <Column
          title="歌手名"
          dataIndex="authorName"
          key="authorName"
          width= {300}
          sorter={(a, b) => a.authorName - b.authorName}
        />
        <Column
          title="专辑名称"
          dataIndex="songAlbum"
          width= {400}
          key="songAlbum"
        />
        <Column
          title="专辑封面"
          dataIndex="songImg"
          key="songImg"
          width= {110}
          render={(text, record) => (
            <span>
              <img src={"http://localhost:3000/api/img/" + record.songImg} style={{ width: 70, height: 70 }} />
            </span>
          )}
        />
        {/* <Column
          title="时长"
          dataIndex="songTime"
          key="songTime"
          width= {60}
        /> */}
        <Column
          title="发专时间"
          dataIndex="songAlbumdate"
          key="songAlbumdate"
          width= {105}
        />
        <Column
          title="操作"
          key="action"
          width= {350}
          render={(text, record) => (
            <div className='userOperation'>
              <Button type="primary" size={'default'} onClick={text => { this.addSongTolist(record) }}>播放</Button>
              <Button type="dashed" size={'default'} onClick={text => { this.showLyric(record) }}>歌词</Button>
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
    onAddSongToList: (data) => {
      dispatch(Actions.addSongToList(data));
    },
    onModelName: (data)=>{
      dispatch(Actions.modleName(data));
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    onSongModle: (bool) => {
      dispatch(Actions.songModle(bool));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicTable);