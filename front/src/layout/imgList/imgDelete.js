import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

class MusicDelete extends Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.addSong.musicList.imgModle === false && !nextProps.addSong.imgList.modleData.imgId) {
      console.log(nextProps.props.addSong.musicList.imgModle);
      this.setState({
        fileList: [],
        fileName: []
      })
    }
  }
  handleCancel = () => {
    this.props.onImgModle(false);
    this.props.onModleData({});
    this.setState({
      fileList: [],
      fileName: []
    });
  }
  handleOk = () => {
    this.props.onDeletImgInfo(JSON.stringify(this.props.addSong.imgList.modleData));
    this.props.onImgModle(false);
    this.props.onModleData({});
    this.setState({
      fileList: [],
      fileName: []
    });
  }
  render() {
    return (
      <Modal
        title="删除图片"
        centered
        visible={this.props.addSong.imgList.imgModle && this.props.addSong.imgList.modleName === 'del'}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
        okText="确认"
        cancelText="取消"
      >
        <h3>确认删除  {this.props.addSong.imgList.modleData.imgName}  ?</h3>
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
    onDeletImgInfo: (data) => { dispatch(Actions.deletImgInfo(data)) },
    onImgModle: (bool) => { dispatch(Actions.imgModle(bool)) },
    onModleData: (bool) => { dispatch(Actions.modleData(bool)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicDelete);