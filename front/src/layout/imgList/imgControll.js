import React, { Component } from 'react';
import * as Actions from './redux/action';
import {exportCsv} from '../userList/redux/action';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';

import ImgControllForm from './imgUploadModle';
import ImgDelete from './imgDelete';
const Search = Input.Search;

class ImgControll extends Component {
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
    this.props.onImgModle(true);
  }
  // 搜索音乐
  search(value) {
    this.props.onSearchImgName(value);
    this.props.onGetSearchImgList(value);
  }
  // 搜索音乐名称
  changeSearchName = (value) => {
    this.props.onSearchImgName(value);
  }
    // 导出
    exportCsv = () => {
      this.props.onExportCsv('songlist');
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
          defaultValue={this.props.addSong.imgList.searchMusicName}
          onChange={this.changeSearchName}
          enterButton
        />
        <div className='add'>
          <ImgControllForm />
          <ImgDelete />
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
    onImgModle: (bool) => {
      dispatch(Actions.imgModle(bool));
    },
    onAddList: (data) => {
      dispatch(Actions.addList(data));
    },
    onGetSearchImgList: (data) => {
      dispatch(Actions.getSearchImgList(data));
    },
    onSearchImgName : (data) => {
      dispatch(Actions.searchImgName(data))
    },
    onExportCsv: (data) => { dispatch(exportCsv(data))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgControll);