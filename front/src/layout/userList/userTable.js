import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Table, Button, Radio, Icon, Divider } from 'antd';
import './userList.less';
const { Column, ColumnGroup } = Table;
const confirm = Modal.confirm;


class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: document.body.clientHeight - 250
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
  }
  componentDidMount() {
    this.props.onlist();
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize = () => {
    this.setState({ window: document.body.clientHeight - 250 })
  }
  // 编辑按钮
  handleEdit(data) {
    this.props.onModleUserData(data);
    this.props.onUserModle(true);
    this.props.onModleName('edit');
  }
  // 删除弹框
  showConfirm(data) {
    this.props.onModleUserData(data);
    this.props.onUserModle(true);
    this.props.onModleName('del');
  }
  render() {
    const data = this.props.addSong.userList.searchUserList.map((item) => {
      const data = {
        id: item.id,
        userName: item.user_name,
        userPassword: item.user_password,
        realName: item.user_realname,
        userBirthday: item.user_birthday,
        userId: item.user_id,
      }
      return data
    })
    return (
      <Table
        dataSource={data}
        scroll={{ y: this.state.window }}
      >
        <Column
          title="用户名"
          dataIndex="userName"
          key="userName"
          width= {150}
        />
        <Column
          title="真实姓名"
          dataIndex="realName"
          key="realName"
          width= {150}
        />
        <Column
          title="出生年月"
          dataIndex="userBirthday"
          key="userBirthday"
          width= {150}
        />
        <Column
          title="密码"
          dataIndex="userPassword"
          key="userPassword"
          width= {500}
        />
        <Column
          title="身份证号"
          dataIndex="userId"
          key="userId"
          width= {400}
        />
        <Column
          title="操作"
          key="userOperation"
          width= {300}
          render={(text, record) => (
            <div className='userOperation'>
              <Button type="primary" size={'default'} onClick={text => { this.handleEdit(record) }}>修改</Button>
              <Button type="danger" size={'default'} onClick={text => { this.showConfirm(record) }}>删除</Button>
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
    onlist: () => { dispatch(Actions.getUserList()); },
    onUserModle: (bool) => { dispatch(Actions.UserModle(bool)) },
    onModleName: (data) => { dispatch(Actions.modleName(data)) },
    onAddList: (data) => { dispatch(Actions.addUserList(data)) },
    onModleUserData: (data) => { dispatch(Actions.modleUserData(data)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);