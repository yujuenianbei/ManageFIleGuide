import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Layout, Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor() {
    super();
  }
  Login = (e) => {
    e.preventDefault();
    // 表单提交
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const values = {
          ...value,
        }
        const data = JSON.stringify({
          username: values.userName,
          password: values.password
        });
        this.props.checkLogin(data);
        // 提交之后置空内容
        this.props.form.resetFields();
      }
    });
  }
  render() {
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='loginform'>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" onClick={this.Login} htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const Login = Form.create()(LoginForm);
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (data) => {dispatch(Actions.checkLogin(data)) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);