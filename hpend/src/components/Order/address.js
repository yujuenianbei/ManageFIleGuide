import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
import { searchOrderAddress } from '../../fetch/order'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon } from 'antd';
let myClear, clearData;
class ShowAddressForm extends PureComponent {

    componentDidMount() {
        this.props.onAdr(this);
        searchOrderAddress(this.props.state.order.modelData.goodsResAddress, this.getAddressData)
    }

    getAddressData = (result) => {
        const res = result.data.searchAddress
        this.props.changeOrderAddress(res);
        if (!!res) {
            this.props.form.setFieldsValue({
                email: res.email,
                userName: res.userName,
                lastName: res.lastName,
                firstName: res.firstName,
                phoneCode: res.phoneCode,
                phone: res.phone,
                province: res.province,
                address: res.address,
                postCode: res.postCode
            })
        }
    }
    componentWillUpdate(nextPorps) {
        if (nextPorps.state.order.modelData !== '' && nextPorps.state.order.modelName !== '' && this.props.state.order.modelName !== nextPorps.state.order.modelName) {
            searchOrderAddress(nextPorps.state.order.modelData.goodsResAddress, this.getAddressData)
        }
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.changeOrderEdit(false);
        // deleteOrder(this.props.state.order.modelData, this.deleteFinish)
    };

    // 取消提交
    cancelSubmit = () => {
        this.props.changeModleState(false);
        clearData = setTimeout(() => {
            myClear = setTimeout(this.props.form.resetFields, 0);
            this.props.changeOrderAddress('')
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            this.props.changeOrderExchange(false);
            this.props.changeOrderEdit(false);
            clearTimeout(clearData);
        }, 0);
    }

    // 创建新的临时地址替换原先的地址
    editAddress = () => {
        this.props.changeOrderEdit(true);
        this.props.changeModleTitle('创建收货地址');
    }

    // 
    changeAddress = () => {
        this.props.changeOrderExchange(true);
        this.props.changeModleTitle('切换收货地址');
    }
    // // 提交数据后返回
    // deleteFinish = (result) => {
    //     // 根据接口返回状态判断成功与否
    //     if (result.data.deleteOrder[0].state === 1) {
    //         this.props.changeModleState(false);
    //         this.props.changeModelData('');
    //         this.props.changeModleTitle('');
    //         this.props.changeModleName('');
    //         // 更新数据
    //         this.props.changeOrderDataLoading(true);

    //         // 加载上一次的配置
    //         let data = {};
    //         data.search = this.props.state.order.searchValue ? this.props.state.order.searchValue : ""
    //         data.searchType = this.props.state.order.searchType ? this.props.state.order.searchType : "";
    //         data.pageSize = this.props.state.order.pageSize;
    //         data.start = this.props.state.order.pageNow;
    //         data.sort = this.props.state.order.pageSort;
    //         // 如果搜索性别需要装换
    //         if (data.searchType === "sex") {
    //             data.search = transToSex(this.props.state.order.searchValue);
    //         }
    //         searchOrderTotal(data, this.setPageTotal)
    //         searchOrder(data, this.searchData);
    //     }
    // }

    // // 修改总数
    // setPageTotal = (result) => {
    //     this.props.changePageTotal(result.data.total.total)
    // }
    // // 搜索结果写入表中
    // searchData = (result) => {
    //     // 删除最后一条数据
    //     if (result.data.searchOrder.length === 0) {
    //         const pageNow = this.props.state.order.pageNow - 1;
    //         this.props.changePageNow(pageNow);

    //         // 加载上一次的配置
    //         let data = {};
    //         data.search = this.props.state.order.searchValue ? this.props.state.order.searchValue : ""
    //         data.searchType = this.props.state.order.searchType ? this.props.state.order.searchType : "";
    //         data.pageSize = this.props.state.order.pageSize;
    //         data.start = pageNow;
    //         data.sort = this.props.state.order.pageSort;
    //         // 如果搜索性别需要装换
    //         if (data.searchType === "sex") {
    //             data.search = transToSex(this.props.state.order.searchValue);
    //         }
    //         searchOrderTotal(data, this.setPageTotal);
    //         searchOrder(data, this.searchData);
    //     } else {
    //         let data = []
    //         result.data.searchOrder.map((item, index) => (
    //             data[index] = {
    //                 key: item.id,
    //                 userName: item.userName,
    //                 sex: item.sex,
    //                 email: item.email,
    //                 firstName: item.firstName,
    //                 lastName: item.lastName,
    //                 phoneCode: item.phoneCode,
    //                 phone: item.phone,
    //                 company: item.company,
    //                 password: item.password,
    //             }
    //         ))
    //         this.props.changeOrderData(data);
    //         this.props.changeOrderDataLoading(false);
    //     }
    // }



    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <Fragment>
                {!this.props.state.order.orderEdit && !this.props.state.order.orderExchange &&
                    <Fragment>
                        <Button type="primary" onClick={this.editAddress}>创建地址</Button>
                        <Button type="primary" onClick={this.changeAddress}>更换地址</Button>
                    </Fragment>
                }
                {!this.props.state.order.orderExchange &&
                    <Form layout="horizontal" onSubmit={this.handleSubmit} labelAlign="left">
                        <Form.Item label="用户名" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('userName', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ],
                            })(<Input placeholder="请输入用户名" disabled="disabled" />)}
                        </Form.Item>
                        <Form.Item label="邮箱" {...formItemLayout} style={{ marginBottom: '10px' }}>
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
                            })(<Input placeholder="请输入邮箱" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                        <Form.Item label="姓" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('lastName', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入姓氏',
                                    },
                                ],
                            })(<Input placeholder="请输入姓氏" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                        <Form.Item label="名" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('firstName', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入名字',
                                    },
                                ],
                            })(<Input placeholder="请输入名字" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                        <Form.Item label="区号" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('phoneCode', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入区号',
                                    },
                                ],
                            })(<Input type="number" placeholder="请输入区号" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
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
                            })(<Input type="number" placeholder="请输入手机号" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                        <Form.Item label="省市区" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('province', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入省市区',
                                    },
                                ],
                            })(<Input placeholder="请输入省市区" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                        <Form.Item label="详细地址" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('address', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入详细地址',
                                    },
                                ],
                            })(<Input placeholder="请输入详细地址" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                        <Form.Item label="邮编" {...formItemLayout} style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('postCode', {
                                initialValue: '',
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入邮编',
                                    },
                                ],
                            })(<Input placeholder="请输入邮编" disabled={!this.props.state.order.orderEdit ? "disabled" : ""} />)}
                        </Form.Item>
                    </Form >
                }
            </Fragment>
        );
    }
}

const ShowAddress = Form.create({ name: 'ShowAddressForm' })(ShowAddressForm);
const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeModleState: (data) => { dispatch(Actions.orderModleState(data)); },
        changeOrderDataLoading: (data) => { dispatch(Actions.orderDataLoading(data)); },
        changeOrderData: (data) => { dispatch(Actions.orderData(data)); },
        changeOrderAddress: (data) => { dispatch(Actions.orderAddress(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.orderModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.orderModelData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        changePageTotal: (data) => { dispatch(Actions.orderPageTotal(data)); },
        changePageNow: (data) => { dispatch(Actions.orderPageNow(data)); },
        changeOrderEdit: (data) => { dispatch(Actions.orderEdit(data)); },
        changeOrderExchange: (data) => { dispatch(Actions.orderExchange(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ShowAddress));