import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

class DeletModle extends Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
  }
  handleCancel = () => {
    this.props.onUserModle(false);
    this.props.onModleUserData({});
  }
  handleOk = () => {
    this.props.ondeletUser(this.props.addSong.userList.modleData.id);
    this.props.onUserModle(false);
    this.props.onModleUserData({});
  }
  render() {
    return (
      <Modal
        title="删除人员"
        centered
        visible={this.props.addSong.userList.addUserModle && this.props.addSong.userList.modleName === 'del'}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
        okText="确认"
        cancelText="取消"
      >
      <h3>确认删除{this.props.addSong.userList.modleData.userName}?</h3>
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
    onUserModle: (bool) => { dispatch(Actions.UserModle(bool)) },
    ondeletUser: (params) => { dispatch(Actions.deletUser(params)) },
    onModleUserData: (data) => { dispatch(Actions.modleUserData(data)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeletModle);