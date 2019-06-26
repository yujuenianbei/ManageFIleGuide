import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 请求
import { loginAccount } from '../../fetch/login'
// 插件
import { Form, Icon, Input, Button, Checkbox } from 'antd';

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
        if(result.data.login.state){
            // 登陆成功
            localStorage.setItem("uuid", result.data.login.uuid);
            localStorage.setItem("token", result.data.login.token);
            this.props.changeLoginstate(result.data.login.state)
        } else {
            // 用户名密码不对
            this.props.changeLoginstate(result.data.login.state)
        }
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
                            })(<Checkbox>Remember me</Checkbox>)}
                            
                            <Button type="primary" htmlType="submit" className={styles.submitLogin}>
                                Log in
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(LoginForm));