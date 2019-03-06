import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import './musicList.less';
import moment from 'moment';

import { Modal, Input } from 'antd';

const { TextArea } = Input;

class MusicLyric extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  uploadCancel = () => {
    this.props.onSongModle(false);
    this.props.onModleData({});
  }
  uploadLyric =()=>{
      console.log(123123)
  }
  render() {
    return (
      <Modal
        title={this.props.addSong.musicList.modleName === 'lyric' ? '歌曲歌词' : '编辑歌曲'}
        visible={this.props.addSong.musicList.songModle && this.props.addSong.musicList.modleName === 'lyric'}
        onOk={this.uploadLyric}
        onCancel={this.uploadCancel}
        okText="确认"
        cancelText="取消"
      >
        <TextArea rows={10} />
    </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSongModle: (bool) => {
      dispatch(Actions.songModle(bool));
    },
    onlist: () => {
      dispatch(Actions.getList());
    },
    onModleData: (bool) => {
      dispatch(Actions.modleData(bool));
    },
    // 修改歌曲信息
    onEditSongInfo: (data) => {
      dispatch(Actions.editSongInfo(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicLyric);