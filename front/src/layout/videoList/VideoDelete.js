import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

class VideoDelete extends Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }
  handleCancel = () => {
    this.props.onvideoModle(false);
    this.props.onModleData({});
  }
  handleOk = () => {
    this.props.onDeletSongInfo(JSON.stringify(this.props.addSong.videoList.modleData));
    this.props.onvideoModle(false);
    this.props.onModleData({});
  }
  render() {
    return (
      <Modal
        title="删除视频"
        centered
        visible={this.props.addSong.videoList.videoModle && this.props.addSong.videoList.modleName === 'del'}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
        okText="确认"
        cancelText="取消"
      >
      <h3>确认删除  {this.props.addSong.videoList.modleData.videoName}  ?</h3>
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
    onDeletSongInfo: (data) => {dispatch(Actions.deletvideoInfo(data))},
    onvideoModle: (bool) => {dispatch(Actions.videoModle(bool))},
    onModleData: (bool) => {dispatch(Actions.modleData(bool))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoDelete);