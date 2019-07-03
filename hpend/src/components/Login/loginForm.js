import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 请求
import { loginAccount } from '../../fetch/login'
// 插件
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// socket
import io from 'socket.io-client'
const socket = io("http://192.168.1.128:3004", {
    // query: params,
    //此处大坑，设置为true才会开启新的连接
    forceNew: true
});
class LoginFormNormal extends PureComponent {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                loginAccount(values, this.loginCallback)
            }
        });
    };

    loginCallback = (result) => {
        const _this = this;
        if (result.data.login.state) {
            // 登陆成功
            localStorage.setItem("uid", result.data.login.uid);
            localStorage.setItem("token", result.data.login.token);
            this.props.changeLoginstate(result.data.login.state);
            this.props.changeUsername(result.data.login.userName);
            socket.emit('userList', {
                type: 'in',
                userName: result.data.login.userName
            });
        } else {
            // 用户名密码不对
            this.props.changeLoginstate(result.data.login.state)
        }
        socket.on('userList', function (data) {
            _this.props.changeUserOnlineList(data.userList)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <div className={styles.loginFormContent}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    style={{ height: '38px', lineHeight: '38px' }}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    style={{ height: '38px', lineHeight: '38px' }}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}

                            <Button type="primary" htmlType="submit" className={styles.submitLogin}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}
const LoginForm = Form.create({ name: 'accountLogin' })(LoginFormNormal);
const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginstate: (data) => { dispatch(Actions.loginstate(data)); },
        changeUsername: (data) => { dispatch(Actions.username(data)) },
        changeUserOnlineList: (data) => { dispatch(Actions.userOnlineList(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(LoginForm));