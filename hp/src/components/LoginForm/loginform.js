import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './loginform.module.less';
import { createForm } from 'rc-form';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const POST_VERIFYUSER = gql`
query login($email: String,$name: String, $password: String){
  login(email: $email,name: $name, password: $password){
    state
  } 
}`
class Form extends React.Component {
    componentWillMount() {
        // this.NameDecorator = this.props.form.getFieldDecorator('username', {
        //     rules: [{ required: true, message: '请输入用户名' }],
        // });
    }

    submit = (addTodo) => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            // 登录成功跳转首页
            if (error) {
                // 获取单个值
                addTodo({ variables: { name: value.username, password: value.password} });
                this.props.props.history.push('/');
            }
        });

    }

    userNameChange = (e) => {
        // console.log(e.target.value)
    }
    validateUserNameTimely = (rule, value, callback) => {
        // console.log(value)
        // var regu = /^[1][3][0-9]{9}$/;
        // var re = new RegExp(regu);
        // if (re.test(value)) {
            callback()
        // } else {
        //     callback('false')
        // }
    }

    render() {
        let errors;
        const { getFieldError, getFieldDecorator } = this.props.form;
        return (
            <Query mutation={POST_VERIFYUSER} >
                {(addTodo, { loading, error }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        <Fragment>
                            {getFieldDecorator('username', {
                                initialValue: '',
                                validateFirst: true,
                                validate: [{
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [{
                                        // required: true,
                                        // type: 'string',

                                        // 可以通过这种方式实时校验（自定义校验规则）
                                        message: '请输入正确的用户名',
                                        validator: (rule, value, cb) => this.validateUserNameTimely(rule, value, cb),
                                    }],
                                }],
                                // rules: [{ required: true, message: '请输入用户名' }],
                            })(<input type="text" onChange={this.userNameChange} placeholder="电子邮件地址或手机号" className={(errors = getFieldError('username')) ? styles.input_error : styles.input_normal} />)}
                            {(errors = getFieldError('username')) ? <div className={styles.error}>{errors.join(',')}</div> : null}

                            {getFieldDecorator('password', {
                                initialValue: '',
                                validate: [{
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [{
                                        required: true,
                                        type: 'string',
                                        message: '请输入正确的密码',
                                    }],
                                }],
                                // rules: [{ required: true, message: '请输入密码' }],
                            })(<input type="password" onChange={this.userNameChange} placeholder="密码" className={(errors = getFieldError('password')) ? styles.input_error : styles.input_normal} />)}
                            {(errors = getFieldError('password')) ? <div className={styles.error}>{errors.join(',')}</div> : null}

                            <button className={styles.loginBtn + " " + styles.prime} onClick={() => {
                                this.props.form.validateFields((error, value) => {
                                    console.log(error, value);
                                    // 登录成功跳转首页
                                    if (error) {
                                        // 获取单个值
                                        addTodo({ variables: { name: value.username, password: value.password} });
                                        // this.props.props.history.push('/');
                                    }
                                });
                            }}>登录</button>
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default classify(styles)(createForm()(Form));

