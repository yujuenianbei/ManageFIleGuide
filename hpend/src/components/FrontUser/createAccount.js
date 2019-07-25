import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { getUserInfo, createAccount, updateAccount, validateAccount, searchAccount, searchAccountTotal } from '../../fetch/account'
import { transSex, editTransToSex, transToSex } from '../../func/account'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon } from 'antd';
const { Option } = Select;

let myClear, clearData, modelData = {
    email: '',
    userName: '',
    password: '',
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
                userName: data.name,
                password: data.password,
                phoneCode: data.phoneCode,
                phone: data.phone,
                sex: transSex(data.sex),
                company: data.company,
            })
        } else if (this.props.state.account.modelName == 'delete') {

        }
    }

    componentWillUnmount() {
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
                    phoneCode: '',
                    phone: '',
                    sex: transSex(0),
                    company: '',
                })
            } else if (nextPorps.state.account.modelName == 'edit') {
                const data = nextPorps.state.account.modelData;
                this.props.form.setFieldsValue({
                    email: data.email,
                    userName: data.name,
                    password: data.password,
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
        console.log(this.props.form.getFieldValue('sex'))
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changeConfirmLoading(true);
                if (this.props.state.account.modelName === 'add') {
                    values.sex = transToSex(this.props.form.getFieldValue('sex'));
                    createAccount(values, this.createFinish)
                } else if (this.props.state.account.modelName == 'edit') {
                    // 将id添加到请求内容中
                    values.id = parseInt(this.props.state.account.modelData.key);
                    // 将性别转换格式
                    editTransToSex(values);
                    updateAccount(values, this.createFinish)
                }
            }
        });
    };

    // 取消提交
    cancelSubmit = () => {
        this.props.changeModleState(false);
        this.props.changeConfirmLoading(false);
        clearData = setTimeout(() => {
            myClear = setTimeout(this.props.form.resetFields, 0);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            clearTimeout(clearData);
        }, 0);
    }

    // 提交数据后返回
    createFinish = (result) => {
        if (this.props.state.account.modelName === 'add') {
            if (result.data.regFrontUser[0].state === 1) {
                this.props.changeConfirmLoading(false);
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
                // 更新数据
                this.props.changeAccountDataLoading(true);

                // 加载上一次的配置
                let data = {};
                data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
                data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
                data.pageSize = this.props.state.account.pageSize;
                data.start = this.props.state.account.pageNow;
                data.sort = this.props.state.account.pageSort;
                // 如果搜索性别需要装换
                if (data.searchType === "sex") {
                    data.search = transToSex(this.props.state.account.searchValue);
                }
                searchAccountTotal(data, this.setPageTotal)
                searchAccount(data, this.searchData);
            } else {
                this.props.changeModleState(false);
            }
        } else if (this.props.state.account.modelName == 'edit') {
            if (result.data.updateFrontUser[0].state === 1) {
                this.props.changeConfirmLoading(false);
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
                // 更新数据
                this.props.changeAccountDataLoading(true);

                // 加载上一次的配置
                let data = {};
                data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
                data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
                data.pageSize = this.props.state.account.pageSize;
                data.start = this.props.state.account.pageNow;
                data.sort = this.props.state.account.pageSort;
                // 如果搜索性别需要装换
                if (data.searchType === "sex") {
                    data.search = transToSex(this.props.state.account.searchValue);
                }
                searchAccountTotal(data, this.setPageTotal)
                searchAccount(data, this.searchData);
            } else {
                this.props.changeModleState(false);
            }
        }
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.frontUserTotal.total)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchFrontUser.map((item, index) => (
            data[index] = {
                key: item.id,
                userName: item.name,
                sex: item.sex,
                email: item.email,
                phoneCode: item.phoneCode,
                phone: item.phone,
                company: item.company,
                password: item.password,
            }
        ))
        this.props.changeAccountData(data)
        this.props.changeAccountDataLoading(false)
    }


    // 验证密码是否一致
    confirmPassword = (rule, value, callback) => {
        if (value !== "") {
            if (this.props.form.getFieldValue('password') === value) {
                callback()
            } else {
                callback('false')
            }
        } else {
            callback()
        }
    }

    // 验证用户名
    confirmUserName = (rule, value, callback) => {
        // 调用查询用户名的接口进行返回
        // this.props.form.getFieldValue('userName')
        if (value !== "") {
            if (this.props.state.account.modelName === 'edit' && value === this.props.state.account.modelData.userName) {
                callback()
            } else {
                this.setState({ userNameFeedback: true })
                // 校验用户名是否存在
                validateAccount(value, (data) => {
                    this.setState({ userNameFeedback: false })
                    if (data.data.validateAccount[0].state === 1) {
                        callback()
                    } else if (data.data.validateAccount[0].state === 0) {
                        callback('false')
                    }
                })
            }
        } else {
            this.setState({ userNameFeedback: false })
            callback()
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
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ],
                        })(<Input type="password" placeholder="请输入密码" disabled={this.props.state.account.modelName === 'edit' ? "disabled" : ""} />)}
                    </Form.Item>
                    {this.props.state.account.modelName === 'add' && <Form.Item label="重复密码" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('confirmPassword', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请再次输入密码',
                                },
                                {
                                    validator: (rule, value, cb) => this.confirmPassword(rule, value, cb),
                                    message: '请输入正确的密码',
                                }
                            ],
                        })(<Input type="password" placeholder="请再次输入密码" />)}
                    </Form.Item>
                    }
                    <Form.Item label="区号" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('phoneCode', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
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
                            validateTrigger: 'onBlur',
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
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别',
                                },
                            ],
                        })(<Select placeholder="请选择性别">
                            <Option value="0">男</Option>
                            <Option value="1">女</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="公司名" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('company', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
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
        changeModleState: (data) => { dispatch(Actions.frontUserModleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.frontUserDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.frontUserData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.frontUserModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.frontUserModelData(data)); },
        changeConfirmLoading: (data) => { dispatch(Actions.frontUserConfirmLoading(data)); },

        changePageSize: (data) => { dispatch(Actions.frontUserPageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.frontUserPageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.frontUserPageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.frontUserSearchUserValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.frontUserSearchUserType(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(CreateAccount));