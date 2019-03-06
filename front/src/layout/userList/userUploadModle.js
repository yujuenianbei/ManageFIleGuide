import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Modal, Form, Select, Input, Button, DatePicker, Upload, Icon, message } from 'antd';
import moment from 'moment';
// const dateFormat = 'YYYY-MM-DD';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  uploadOk = (e) => {
    e.preventDefault();
    // 表单提交
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const values = {
          ...value,
          'userbirthday': value['userbirthday'].format('YYYY-MM-DD')
        }
        const data = JSON.stringify({
          id: this.props.addSong.userList.modleData.id ? this.props.addSong.userList.modleData.id : '',
          username: values.username,
          password: values.password,
          userrealname: values.userrealname,
          userbirthday: values.userbirthday,
          userid: values.userid
        });
        if(this.props.addSong.userList.modleName === 'add') {
          this.props.onaddUser(data);
        }
        if(this.props.addSong.userList.modleName === 'edit') {
          this.props.onupdateUser(data);
        }
        this.props.onUserModle(false);
        this.props.onModleUserData({});
        // 提交之后置空内容
        this.props.form.resetFields();
      }
    });
  }

  uploadCancel = () => {
    this.props.onUserModle(false);
    this.props.onModleUserData({});
  }


  // 设置初始化值
  defalutValue = () => {
    if (!!this.props.addSong.userList.modleData.userName) {
      return {
        userName: this.props.addSong.userList.modleData.userName,
        userPassword: this.props.addSong.userList.modleData.userPassword,
        realName: this.props.addSong.userList.modleData.realName,
        userBirthday: this.props.addSong.userList.modleData.userBirthday,
        userId: this.props.addSong.userList.modleData.userId
      }
    }
    return {
      userName: '',
      userPassword: '',
      realName: '',
      userBirthday: "1970-01-01",
      userId: ''
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title={this.props.addSong.userList.modleName === 'add' ? '新增人员' : '编辑人员'}
        visible={this.props.addSong.userList.addUserModle && (this.props.addSong.userList.modleName === 'add' || this.props.addSong.userList.modleName === 'edit')}
        onOk={this.uploadOk}
        onCancel={this.uploadCancel}
        centered
        confirmLoading={this.state.confirmLoading}
        okText="确认"
        cancelText="取消">
        <Form>
          <FormItem
            label="用户名"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }} >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
              initialValue: this.defalutValue().userName
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="密码"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
              initialValue: this.defalutValue().userPassword
            })(
              <Input />
            )}
          </FormItem>
          {this.props.addSong.userList.modleName === 'add'
            ? <FormItem
              label="确认密码"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('repeatpassword', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input />
              )}
            </FormItem>
            : ''}
          <FormItem
            label="姓名"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('userrealname', {
              rules: [{ required: true, message: '请输入姓名!' }],
              initialValue: this.defalutValue().realName
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="生日"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('userbirthday', {
              rules: [{ required: true, message: '请选择生日!' }],
              initialValue: moment(this.defalutValue().userBirthday, 'YYYY-MM-DD')
            })(
              <DatePicker style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            label="身份证号"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('userid', {
              rules: [{ required: true, message: '请输入身份证号!' }],
              initialValue: this.defalutValue().userId
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const UserUploadModle = Form.create()(App);


const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserModle: (bool) => { dispatch(Actions.UserModle(bool)) },
    onaddUser: (params) => { dispatch(Actions.addUser(params)) },
    onupdateUser: (params) => { dispatch(Actions.updateUser(params)) },
    onModleUserData: (data) => { dispatch(Actions.modleUserData(data)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserUploadModle);