import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { getUserInfo, createAccount, updateAccount, validateAccount } from '../../fetch/account'
import { transSex, editTransToSex } from '../../func/account'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon } from 'antd';
const { Option } = Select;

let myClear,myClear1, modelData = {
    email: '',
    userName: '',
    password: '',
    lastName: '',
    firstName: '',
    phoneCode: '',
    phone: '',
    sex: '男',
    company: '',
};
class AccountForm extends PureComponent {
    state = {
        userNameFeedback: false,
    }

    componentDidMount() {
        this.props.onRef(this);
        if (this.props.state.account.modelName == 'add') {
            this.props.form.setFieldsValue({
                email: '',
                userName: '',
                password: '',
                lastName: '',
                firstName: '',
                phoneCode: '',
                phone: '',
                sex: transSex(0),
                company: '',
            })
        } else if (this.props.state.account.modelName == 'edit') {
            const data = this.props.state.account.modelData;
            this.props.form.setFieldsValue({
                id: data.id,
                email: data.email,
                userName: data.userName,
                password: data.password,
                lastName: data.lastName,
                firstName: data.firstName,
                phoneCode: data.phoneCode,
                phone: data.phone,
                sex: transSex(data.sex),
                company: data.company,
            })
        } else if (this.props.state.account.modelName == 'delete') {

        }
    }

    componentWillUnmount() {
        console.log(11111)
        // 清除定时器
        clearTimeout(myClear);
    };

    // 组件更新
    componentWillUpdate(nextPorps) {
        if (this.props.state.account.modelName !== nextPorps.state.account.modelName) {
            if (nextPorps.state.account.modelName == 'add') {
                this.props.form.setFieldsValue({
                    email: '',
                    userName: '',
                    password: '',
                    lastName: '',
                    firstName: '',
                    phoneCode: '',
                    phone: '',
                    sex: transSex(0),
                    company: '',
                })
            } else if (nextPorps.state.account.modelName == 'edit') {
                const data = nextPorps.state.account.modelData;
                this.props.form.setFieldsValue({
                    email: data.email,
                    userName: data.userName,
                    password: data.password,
                    lastName: data.lastName,
                    firstName: data.firstName,
                    phoneCode: data.phoneCode,
                    phone: data.phone,
                    sex: transSex(data.sex),
                    company: data.company,
                })
            }
        }
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.state.account.modelName === 'add') {
                    createAccount(values, this.createFinish)
                } else if (this.props.state.account.modelName == 'edit') {
                    // 将id添加到请求内容中
                    values.id = parseInt(this.props.state.account.modelData.key);
                    editTransToSex(values);
                    updateAccount(values, this.createFinish)
                }
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
            }
        });
    };

    // 取消提交
    cancelSubmit = () => {
        // if (this.props.state.account.modelName !== 'delete') {
        //     myClear = setTimeout(this.props.form.resetFields, 0);
        // }
    }

    // 提交数据后返回
    createFinish = (result) => {
        if (this.props.state.account.modelName === 'add') {
            if (result.data.regAccount[0].state === 1) {
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 更新数据
                this.props.changeAccountDataLoading(true);
                getUserInfo(this.props.setData);
            } else {
                // this.props.changeModleState(false);
            }
        } else if (this.props.state.account.modelName == 'edit') {
            if (result.data.updateAccount[0].state === 1) {
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 更新数据
                this.props.changeAccountDataLoading(true);
                getUserInfo(this.props.setData);
            } else {
                // this.props.changeModleState(false);
            }
        }
    }

    // 验证密码是否一致
    confirmPassword = (rule, value, callback) => {
        if (this.props.form.getFieldValue('password') === value) {
            callback()
        } else {
            callback('false')
        }
    }

    // 验证用户名
    confirmUserName = (rule, value, callback) => {
        // 调用查询用户名的接口进行返回
        // this.props.form.getFieldValue('userName')
        if ( value !== null) {
            if(this.props.state.account.modelName === 'edit' && value === this.props.state.account.modelData.userName){
                callback()
            } else {
                this.setState({ userNameFeedback: true })
                validateAccount(value, (data) => {
                    if (data.data.validateAccount[0].state === 1) {
                        this.setState({ userNameFeedback: false })
                        callback()
                    } else if (data.data.validateAccount[0].state === 0) {
                        this.setState({ userNameFeedback: false })
                        callback('false')
                    }
                })
            }
        } else {
            this.setState({ userNameFeedback: false })
            callback('false')
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <Fragment>
                <Form layout="horizontal" onSubmit={this.handleSubmit} labelAlign="left">
                    <Form.Item label="邮箱"  {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('email', {
                            initialValue: '',
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    type: 'email',
                                    message: '请输入正确的邮箱格式',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                            ],
                        })(<Input placeholder="请输入邮箱" />)}
                    </Form.Item>
                    <Form.Item label="用户名" {...formItemLayout} hasFeedback={this.state.userNameFeedback} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('userName', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                                {
                                    validator: (rule, value, cb) => this.confirmUserName(rule, value, cb),
                                    message: '用户名已被注册',
                                }
                            ],
                        })(<Input placeholder="请输入用户名" />)}
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ],
                        })(<Input type="password" placeholder="请输入密码" />)}
                    </Form.Item>
                    {this.props.state.account.modelName === 'add' && <Form.Item label="重复密码" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请再次输入密码',
                                },
                                {
                                    message: '请输入正确的密码',
                                    validator: (rule, value, cb) => this.confirmPassword(rule, value, cb),
                                }
                            ],
                        })(<Input type="password" placeholder="请再次输入密码" />)}
                    </Form.Item>
                    }
                    <Form.Item label="姓" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('lastName', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入姓氏',
                                },
                            ],
                        })(<Input placeholder="请输入姓氏" />)}
                    </Form.Item>
                    <Form.Item label="名" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('firstName', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入名字',
                                },
                            ],
                        })(<Input placeholder="请输入名字" />)}
                    </Form.Item>
                    <Form.Item label="区号" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('phoneCode', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择区号',
                                },
                            ],
                        })(<Select placeholder="请选择区号">
                            <Option value="086">086</Option>
                            <Option value="007">007</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="手机号" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('phone', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                            ],
                        })(<Input type="number" placeholder="请输入手机号" />)}
                    </Form.Item>
                    <Form.Item label="性别" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('sex', {
                            initialValue: '1',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别',
                                },
                            ],
                        })(<Select placeholder="请选择性别">
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="公司名" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('company', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入公司名',
                                },
                            ],
                        })(<Input placeholder="请输入公司名" />)}
                    </Form.Item>
                </Form >
            </Fragment>
        );
    }
}

const CreateAccount = Form.create({ name: 'createAccount' })(AccountForm);

const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeModleState: (data) => { dispatch(Actions.modleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.accountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.accountData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.modleName(data)); },
        changeModelData: (data) => { dispatch(Actions.modelData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(CreateAccount));