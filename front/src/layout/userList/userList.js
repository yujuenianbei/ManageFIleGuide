import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import UserTable from './userTable'
import UserControll from './userControll'
import { Spin } from 'antd';
class UserList extends Component {
  constructor() {
    super();
  }
  render() {
    const state = this.state;
    return (
      <Spin wrapperClassName='userContent' spinning={this.props.addSong.userList.userLoading}>
        <div style={{ margin: 5, padding: 6, background: '#fff' }}>
          <UserControll />
          <UserTable />
        </div>
      </Spin>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      addSong: state
  }
}
export default connect(mapStateToProps)(UserList);