import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import UserUploadModle from './userUploadModle';
import DeletModle from './deletModle';
import './userList.less';
const Search = Input.Search;


class UserControll extends Component {
  constructor() {
    super();
    this.state = {
      ModalText: 'Content of the modal',
      addVisible: false,
    }
    this.showModal = this.showModal.bind(this);
    this.search = this.search.bind(this);
    this.exportCsv = this.exportCsv.bind(this);
  }
  componentWillMount() {
    this.props.onsession();
  }
  showModal() {
    this.props.onUserModle(true);
    this.props.onModleName('add');
  }
  // 搜索名称
  search(data) {
    this.props.onsearchUserName(data);
    this.props.ongetSearchUserList(data);
  }
  // 搜索用户名称
  changeSearchName = (value) => {
    this.props.onsearchUserName(value);
  }
  // 导出
  exportCsv = () => {
    this.props.onExportCsv('userlist');
  }
  render() {
    const { addVisible } = this.state;
    return (
      <div>
        <div className='userTableTop'>
          <Button type="primary" onClick={this.showModal}>新增</Button>
          <Button type="primary" style={{marginLeft: 5}} onClick={this.exportCsv}>导出数据</Button>
          <Search
            style={{ width: 300, float: 'right' }}
            placeholder="搜索用户"
            onSearch={value => this.search(value)}
            defaultValue={this.props.addSong.userList.userSearch}
            onChange={this.changeSearchName}
            enterButton
          />
        </div>
        <div className='add'>
          <UserUploadModle />
          <DeletModle />
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
    onsession: (data) => { dispatch(Actions.session(data))},
    onModleName: (data) => { dispatch(Actions.modleName(data))},
    onUserModle: (bool) => { dispatch(Actions.UserModle(bool))},
    onAddList: (data) => { dispatch(Actions.addUserList(data))},
    onsearchUserName: (data) => { dispatch(Actions.searchUserName(data))},
    ongetSearchUserList: (data) => { dispatch(Actions.getSearchUserList(data))},
    onExportCsv: (data) => { dispatch(Actions.exportCsv(data))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserControll);