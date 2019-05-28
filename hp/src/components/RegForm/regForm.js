import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './regForm.module.less';
import { createForm } from 'rc-form';
import { Checkbox } from 'antd';

class Form extends React.Component {
    state = {
        rulesChecked: false,
        smsChecked: true
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            if(!error){
                var query = `mutation reg($email: String,$name: String, $phonecode: Int! $password: String){
                    reg(email: $email,name: $name, password: $password){
                      state
                    } 
                  }`;
                fetch('http://localhost:3004/graphql', {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: {
                            email: value.email,
                            phonecode: value.phonecode,
                            phone:  value.phone,
                            password: value.password,
                        }
                    })
                })
                    .then(r => r.json())
                    .then(result => {
                        if(result.data.login && result.data.login[0].state === "1"){
                            this.props.props.history.push('/');
                        } else {
                            this.openNotification()
                        }
                    });
            }
        });
        // 获取单个值
        // console.log(this.props.form.getFieldValue('password'))
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
    confirmPassword = (rule, value, callback) => {
        // console.log(this.props.form.getFieldValue('password'))
        if (this.props.form.getFieldValue('password') === value && value !== '') {
            callback()
        } else {
            callback('false')
        }
    }
    // 发送验证码
    postMessageCode = () => {
        this.props.form.validateFields(['phoneCode', 'phone'], (error, value) => {
            if (!error) {
                console.log(value);
                // 发送手机号然后得到验证码
            }
            console.log(error, value);
        });
    }
    // 
    rulesChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ rulesChecked: e.target.checked })
    }
    // 
    smsChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ smsChecked: e.target.checked })
    }
    render() {
        let errors;
        const { getFieldError, getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <div className={styles.userInfo}>
                    <div className={styles.regform}>
                        <label required>电子邮件</label>
                        <div className={styles.inputs}>
                            {getFieldDecorator('email', {
                                initialValue: '',
                                validateFirst: true,
                                validate: [{
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [{
                                        message: '请输入正确的用户名',
                                        validator: (rule, value, cb) => this.validateUserNameTimely(rule, value, cb),
                                    }],
                                }],
                                // rules: [{ required: true, message: '请输入用户名' }],
                            })(<input type="text" onChange={this.userNameChange} placeholder="请输入电子邮箱" className={(errors = getFieldError('email')) ? styles.input_error : styles.input_normal} />)}
                            {(errors = getFieldError('email')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                        </div>
                    </div>
                    <div className={styles.regform}>
                        <label required>电话</label>
                        <div className={styles.inputs}>
                            {getFieldDecorator('phoneCode', {
                                initialValue: '',
                                validate: [{
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [{
                                        required: true,
                                        type: 'string',
                                        message: '请输入正确的区号',
                                    }],
                                }],
                            })(
                                <select className={(errors = getFieldError('phone') || getFieldError('phoneCode')) ? styles.phoneCode_error : styles.phoneCode_normal}>
                                    <option value=""></option>
                                    <option value="+86">+86</option>
                                </select>
                            )}
                            {getFieldDecorator('phone', {
                                initialValue: '',
                                validate: [{
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [{
                                        required: true,
                                        validator: (rule, value, cb) => this.validateUserNameTimely(rule, value, cb),
                                        message: '请输入正确的手机号',
                                    }],
                                }],
                            })(
                                <input type="text" onChange={this.userNameChange} placeholder="请收入手机号" className={(errors = getFieldError('phone') || getFieldError('phoneCode')) ? styles.input_error_phone : styles.input_normal_phone} />
                            )}
                            {(errors = getFieldError('phoneCode') || getFieldError('phone')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                        </div>
                    </div>
                    <div className={styles.regform}>
                        <label required>短信验证码</label>
                        <div className={styles.inputs}>
                            <div className={styles.messageCode}>
                                {getFieldDecorator('messageCode', {
                                    initialValue: '',
                                    validate: [{
                                        trigger: ['onBlur', 'onChange'],
                                        rules: [{
                                            required: true,
                                            type: 'string',
                                            message: '请输入验证码',
                                        }],
                                    }],
                                })(<input type="text" onChange={this.userNameChange} placeholder="请输入验证码" className={(errors = getFieldError('messageCode')) ? styles.input_messageCode_error : styles.input_messageCode_normal} />)}
                                <button className={styles.getMessageBtn + " " + styles.prime} onClick={this.postMessageCode}>获取验证码</button>
                            </div>
                            {(errors = getFieldError('messageCode')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                        </div>
                    </div>
                </div>
                <div className={styles.pwd}>
                    <div className={styles.regform}>
                        <label required>密码</label>
                        <div className={styles.inputs}>
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
                            })(<input type="password" onChange={this.userNameChange} placeholder="请输入密码" className={(errors = getFieldError('password')) ? styles.input_error : styles.input_normal} />)}
                            {(errors = getFieldError('password')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                        </div>
                    </div>
                    <div className={styles.regform}>
                        <label required>确认密码</label>
                        <div className={styles.inputs}>
                            {getFieldDecorator('confirmPassword', {
                                initialValue: '',
                                validate: [{
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [{
                                        required: true,
                                        validator: (rule, value, cb) => this.confirmPassword(rule, value, cb),
                                        message: '两次密码不一致',
                                    }],
                                }],
                            })(<input type="password" onChange={this.userNameChange} placeholder="请再次输入密码" className={(errors = getFieldError('confirmPassword')) ? styles.input_error : styles.input_normal} />)}
                            {(errors = getFieldError('confirmPassword')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                        </div>
                    </div>
                </div>
                <div className={styles.rules}>
                    <Checkbox checked={this.state.rulesChecked} onChange={this.rulesChange}></Checkbox>  我已阅读并接受 条款和条件 和 隐私政策
                </div>
                <div className={styles.rules}>
                    <Checkbox checked={this.state.smsChecked} onChange={this.smsChange}></Checkbox>  是的，请向我发送惠普的促销，新闻和产品支援更新。请查看惠普隐私声明，了解有关自动数据收集工具和惠普隐私惯例的更多信息。
                </div>
                <button disabled={this.state.rulesChecked ? false : 'disabled'} className={styles.regBtn + " " + styles.prime} onClick={this.submit}>登录</button>
            </Fragment>
        );
    }
}

export default classify(styles)(createForm()(Form));