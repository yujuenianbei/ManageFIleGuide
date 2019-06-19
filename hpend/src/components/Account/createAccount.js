import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { createAccount } from '../../fetch/account'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon } from 'antd';
const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AccountForm extends PureComponent {

    componentDidMount() {
        this.props.onRef(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                createAccount(values, this.createFinish)
            }
        });
    };
    createFinish = (result)=> {
        if(result.data.regAccount[0].state === 1){
            this.props.changeModleState(false);
        } else {
            // this.props.changeModleState(false);
        }
    }

    // 验证密码是否一致
    confirmPassword = (rule, value, callback) => {
        if (this.props.form.getFieldValue('password') === value) {
            callback()
        } else if( value == '') {
            callback()
        } else {
            callback('false')
        }
    }

    // 验证用户名
    confirmUserName = (rule, value, callback) => {
        // 调用查询用户名的接口进行返回
        if (this.props.form.getFieldValue('userName')) {
            callback()
        } else if( value == '') {
            callback()
        } else {
            callback('false')
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        // const emailError = isFieldTouched('email') && getFieldError('email');
        // const passwordError = isFieldTouched('password') && getFieldError('password');

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        };
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit} labelAlign="left">
                <Form.Item label="邮箱"  hasFeedback={true} validateStatus="validating" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('email', {
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
                    })(<Input placeholder="请输入邮箱"  />)}
                </Form.Item>
                <Form.Item label="用户名" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('userName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                            {
                                message: '请输入正确的密码',
                                validator: (rule, value, cb) => this.confirmUserName(rule, value, cb),
                            }
                        ],
                    })(<Input placeholder="请输入用户名" />)}
                </Form.Item>
                <Form.Item label="密码" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ],
                    })(<Input type="password" placeholder="请输入密码" />)}
                </Form.Item>
                <Form.Item label="重复密码" {...formItemLayout} style={{marginBottom:'10px'}}>
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
                <Form.Item label="姓" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('lastName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入姓氏',
                            },
                        ],
                    })(<Input placeholder="请输入姓氏" />)}
                </Form.Item>
                <Form.Item label="名" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('firstName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入名字',
                            },
                        ],
                    })(<Input placeholder="请输入名字" />)}
                </Form.Item>
                <Form.Item label="区号" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('phoneCode', {
                        rules: [
                            {
                                required: true,
                                message: '请选择区号',
                            },
                        ],
                    })(<Select placeholder="请选择区号">
                    <Option value="086">086</Option>
                    <Option value="007">007</Option>
                  </Select>,)}
                </Form.Item>
                <Form.Item label="手机号" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                        ],
                    })(<Input type="number" placeholder="请输入手机号" />)}
                </Form.Item>
                <Form.Item label="性别" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('sex', {
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
                <Form.Item label="公司名" {...formItemLayout} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('company', {
                        rules: [
                            {
                                required: true,
                                message: '请输入公司名',
                            },
                        ],
                    })(<Input placeholder="请输入公司名" />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                </Form.Item>
            </Form >
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(CreateAccount));