import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

class MusicDelete extends Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }
  handleCancel = () => {
    this.props.onSongModle(false);
    this.props.onModleData({});
  }
  handleOk = () => {
    this.props.onDeletSongInfo(JSON.stringify(this.props.addSong.musicList.modleData));
    this.props.onSongModle(false);
    this.props.onModleData({});
  }
  render() {
    return (
      <Modal
        title="删除音乐"
        centered
        visible={this.props.addSong.musicList.songModle && this.props.addSong.musicList.modleName === 'del'}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
        okText="确认"
        cancelText="取消"
      >
      <h3>确认删除  {this.props.addSong.musicList.modleData.songName}  ?</h3>
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
    onDeletSongInfo: (data) => {dispatch(Actions.deletSongInfo(data))},
    onSongModle: (bool) => {dispatch(Actions.songModle(bool))},
    onModleData: (bool) => {dispatch(Actions.modleData(bool))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicDelete);