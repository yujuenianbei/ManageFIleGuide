import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Account.module.less';
import { changeCrumbs } from '../../fetch/links';
import { createForm } from 'rc-form';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Account extends Component {
    state = {
        phoneChange: false,
        phonePWD: false
    }
    changedPhone = () => {
        this.setState({ phoneChange: !this.state.phoneChange })
    }
    changedPWD = () => {
        this.setState({ phonePWD: !this.state.phonePWD })
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

    validateUserNameTimely = (rule, value, callback) => {
        console.log(value)
        var regu = /^[1][0-9]{10}$/;
        var re = new RegExp(regu);
        if (re.test(value)) {
            callback()
        } else {
            callback('false')
        }
    }
    // 对比密码
    confirmPassword = (rule, value, callback) => {
        // console.log(this.props.form.getFieldValue('password'))
        if (this.props.form.getFieldValue('newPWD') === value && value !== '') {
            callback()
        } else {
            callback('false')
        }
    }

    render() {
        const props = this.props;
        let errors;
        const { getFieldError, getFieldDecorator } = this.props.form;
        return (
            <div className={styles.account}>
                <h3>{changeCrumbs(props)}</h3>
                <div className={styles.infomation}>
                    <h3>账户信息</h3>
                    <div className={styles.infos}>
                        <div className={styles.contents}>
                            <label>上次登录时间</label>
                            <div className={styles.labcontent}>
                                <span>2019年6月10日 下午3:27:32</span>
                            </div>
                        </div>
                        <div className={styles.contents}>
                            <label required>电子邮件地址</label>
                            <div className={styles.labcontent}>
                                <span>wangad@shinetechchina.com</span>
                            </div>
                        </div>
                        <div className={styles.contents}>
                            <label>电话</label>
                            <div className={styles.labcontent}>
                                <span>+86-18966823501</span>
                                <span className={styles.changePhone} onClick={this.changedPhone}>更改您的电话...</span>
                            </div>
                        </div>
                        {
                            this.state.phoneChange && <Fragment><div className={styles.phones}>
                                <div className={styles.contents}>
                                    <label required>新的电话号码</label>
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
                                <div className={styles.contents}>
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
                                <div className={styles.padding} />
                            </Fragment>
                        }
                        <div className={styles.contents}>
                            <label>公司名称</label>
                            <div className={styles.labcontent}>
                                <input type="text" ref="companyName" placeholder="公司名称" className={styles.labelInput} />
                            </div>
                        </div>
                        <div className={styles.contents}>
                            <label required>姓</label>
                            <div className={styles.labcontent}>
                                <input type="text" ref="lastName" placeholder="姓" className={styles.labelInput} />
                            </div>
                        </div>
                        <div className={styles.contents}>
                            <label required>名字 </label>
                            <div className={styles.labcontent}>
                                <input type="text" ref="firstName" placeholder="名字" className={styles.labelInput} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.infomation}>
                    <h3>密码</h3>
                    <div className={styles.infos}>
                        {!this.state.phonePWD && <div className={styles.contents}>
                            <label>密码</label>
                            <div className={styles.labcontent}>
                                <span className={styles.changePhone} onClick={this.changedPWD}>更改密码...</span>
                            </div>
                        </div>}
                        {this.state.phonePWD && <Fragment>
                            <div className={styles.contents}>
                                <label required>旧密码</label>
                                <div className={styles.inputs}>
                                    {getFieldDecorator('oldPWD', {
                                        initialValue: '',
                                        validate: [{
                                            trigger: ['onBlur', 'onChange'],
                                            rules: [{
                                                required: true,
                                                type: 'string',
                                                message: '请输入正确的旧密码',
                                            }],
                                        }],
                                    })(<input type="text" placeholder="原密码" className={(errors = getFieldError('oldPWD')) ? styles.input_error : styles.input_normal} />)}
                                    {(errors = getFieldError('oldPWD')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                                </div>
                            </div>
                            <div className={styles.contents}>
                                <label required>新密码</label>
                                <div className={styles.inputs}>
                                    {getFieldDecorator('newPWD', {
                                        initialValue: '',
                                        validate: [{
                                            trigger: ['onBlur', 'onChange'],
                                            rules: [{
                                                required: true,
                                                type: 'string',
                                                message: '请输入正确格式的密码',
                                            }],
                                        }],
                                    })(<input type="text" placeholder="新密码" className={(errors = getFieldError('newPWD')) ? styles.input_error : styles.input_normal} />)}
                                    {(errors = getFieldError('newPWD')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                                </div>
                            </div>
                            <div className={styles.contents}>
                                <label required>确认密码</label>
                                <div className={styles.inputs}>
                                    <div className={styles.messageCode}>
                                        {getFieldDecorator('confirmPWD', {
                                            initialValue: '',
                                            validate: [{
                                                trigger: ['onBlur', 'onChange'],
                                                rules: [{
                                                    required: true,
                                                    validator: (rule, value, cb) => this.confirmPassword(rule, value, cb),
                                                    message: '两次密码不一致',
                                                }],
                                            }],
                                        })(<input type="text" placeholder="请重复输入新密码" className={(errors = getFieldError('confirmPWD')) ? styles.input_error : styles.input_normal} />)}
                                    </div>
                                    {(errors = getFieldError('confirmPWD')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                                </div>
                            </div>
                            <div className={styles.PWDBtns}>
                                <button className={styles.left + ' ' + styles.prime}>确定</button>
                                <button className={styles.right + ' ' + styles.primed} onClick={this.changedPWD}>取消</button>
                            </div>
                        </Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(createForm()(Account));
