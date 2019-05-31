import React, { Component } from 'react';
import * as Actions from './redux/action';
import {exportCsv} from '../userList/redux/action';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';

import VideoControllForm from './VideoUploadModle';
import VideoDelete from './VideoDelete';
const Search = Input.Search;

class VideoControll extends Component {
  constructor() {
    super();
    this.state = {
      ModalText: 'Content of the modal',
      addVisible: false,
    }
    this.showModal = this.showModal.bind(this);
    this.search = this.search.bind(this);
  }
  // 显示新增弹框
  showModal() {
    this.props.onModelName('add')
    this.props.onvideoModle(true);
  }
  // 搜索音乐
  search(value) {
    this.props.onSearchVideoName(value);
    this.props.onGetSearchVideoList(value);
  }
  // 搜索音乐名称
  changeSearchName = (value) => {
    this.props.onSearchVideoName(value);
  }
  // 导出
  exportCsv = () => {
    this.props.onExportCsv('videoList');
  }
  render() {
    const { addVisible } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>新增</Button>
        <Button type="primary" style={{marginLeft: 5}} onClick={this.exportCsv}>导出数据</Button>
        <Search
          style={{ width: 300, float: 'right' }}
          placeholder="搜索歌曲名称"
          onSearch={value => this.search(value)}
          defaultValue={this.props.addSong.videoList.searchVideoName}
          onChange={this.changeSearchName}
          enterButton
        />
        <div className='add'>
          <VideoControllForm />
          <VideoDelete />
        </div>
      </div>
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
    onModelName: (data) => {
      dispatch(Actions.modleName(data));
    },
    onvideoModle: (bool) => {
      dispatch(Actions.videoModle(bool));
    },
    onAddList: (data) => {
      dispatch(Actions.addList(data));
    },
    onGetSearchVideoList: (data) => {
      dispatch(Actions.getSearchVideoList(data));
    },
    onSearchVideoName : (data) => {
      dispatch(Actions.searchVideoName(data))
    },
    onExportCsv: (data) => { dispatch(exportCsv(data))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoControll);