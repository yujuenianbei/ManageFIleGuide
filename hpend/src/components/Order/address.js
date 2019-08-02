import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
import { timestampToTime } from '../../func/common'
import { searchOrderAddress, searchOrderUserAddress, regOrderUserAddress, searchOrder, searchOrderTotal, changeOrderAddress } from '../../fetch/order';
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon } from 'antd';
import UserAddressItem from './orderItems';

// 懒加载
// const UserAddressItem = React.lazy(() => import('./orderItems'));

const { Option } = Select;
let myClear, clearData;
class ShowAddressForm extends PureComponent {

    componentDidMount() {
        this.props.onAdr(this);
        searchOrderAddress(this.props.state.order.modelData.goodsResAddress, this.props.state.order.modelData.orderId, this.getAddressData)
        this.props.changeOrderAddressItem(this.props.state.order.modelData.goodsResAddress)
    }
    // 获取订单地址后
    getAddressData = (result) => {
        const res = result.data.searchAddress
        this.props.changeOrderAddress(res);
        if (!this.props.state.order.orderExchange) {
            // this.props.form.setFieldsValue({
            //     email: res.email,
            //     userName: res.userName,
            //     lastName: res.lastName,
            //     firstName: res.firstName,
            //     phoneCode: res.phoneCode,
            //     phone: res.phone,
            //     province: res.province,
            //     address: res.address,
            //     postCode: res.postCode
            // })
            this.props.form.setFieldsValue({
                email: "",
                userName: res.userName,
                lastName: "",
                firstName: "",
                phoneCode: "",
                phone: "",
                province: "",
                address: "",
                postCode: ""
            })
        }
    }

    componentWillUpdate(nextPorps) {
        if (nextPorps.state.order.modelData !== '' && nextPorps.state.order.modelName !== '' && this.props.state.order.modelName !== nextPorps.state.order.modelName) {
            searchOrderAddress(nextPorps.state.order.modelData.goodsResAddress, nextPorps.state.order.modelData.orderId, this.getAddressData)
            this.props.changeOrderAddressItem(this.props.state.order.modelData.goodsResAddress)
        }
    }

    // 提交数据
    handleSubmit = (e) => {
        e.stopPropagation();
        if (this.props.state.order.modelName === 'showResInfo') {
            this.cancelSubmit();
        } else if (this.props.state.order.modelName === 'regNewAddress') {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    regOrderUserAddress(values, this.regUserAddress);
                }
            });
        } else if (this.props.state.order.modelName == 'changeUserAddress') {
            const data = {
                id: this.props.state.order.modelData.orderId,
                goodsResAddress: this.props.state.order.orderAddressItem
            }
            changeOrderAddress(data, this.finishChangeAddress)
        }
    };

    regUserAddress = (result) => {
        // 成功后关闭窗口
        if (result.data.regGoodsResInfo.state === 1) {
            const data = {
                id: this.props.state.order.modelData.orderId,
                goodsResAddress: parseInt(result.data.regGoodsResInfo.id)
            }
            changeOrderAddress(data, this.finishChangeAddress)
        }
    }

    finishChangeAddress = (result) => {
        if (result.data.updateOrderAddress.state === 1) {
            this.cancelSubmit();
            this.searchOrderMount();
        }
    }

    // 取消提交
    cancelSubmit = () => {
        this.props.changeModleState(false);
        // clearData = setTimeout(() => {
        //     myClear = setTimeout(this.props.form.resetFields, 0);
        //     this.props.changeOrderAddress('')
        //     this.props.changeModelData('');
        //     this.props.changeModleTitle('');
        //     this.props.changeModleName('');
        //     this.props.changeOrderAddressItem('')
        //     this.props.changeOrderExchange(false);
        //     this.props.changeOrderEdit(false);
        //     clearTimeout(clearData);
        // }, 0);
        if (this.props.state.order.modelName !== 'changeUserAddress') {
            this.props.form.resetFields();
        }
        this.props.changeOrderAddress('');
        // this.props.changeModelData('');
        this.props.changeModleTitle('');
        this.props.changeModleName('');
        this.props.changeOrderAddressItem('');
        this.props.changeOrderExchange(false);
        this.props.changeOrderEdit(false);
    }

    // 创建新的地址替换原先的地址
    editAddress = () => {
        this.props.changeOrderEdit(true);
        this.props.changeOrderExchange(false);
        this.props.changeModleName('regNewAddress');
        this.props.changeModleTitle('创建收货地址');
    }

    // 在用户地址列表中选择更换的地址
    changeAddress = () => {
        this.props.changeOrderExchange(true);
        this.props.changeModleName('changeUserAddress');
        this.props.changeModleTitle('切换收货地址');
        this.props.changeOrderAddressItem(this.props.state.order.modelData.goodsResAddress)
        // 请求用户的地址列表
        searchOrderUserAddress(this.props.state.order.modelData.name, this.showUserAddress)
    }

    // 查询用户地址后的操作
    showUserAddress = (result) => {
        this.props.changeOrderUserAllAddress(result.data.searchUserAddress)
    }

    // 确认收货地址
    selectAddress = (index) => {
        this.props.changeOrderAddressItem(index);
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalOrderItem.total)
    }

    // 加载上一次的搜索
    searchOrderMount = (result) => {
        this.props.changeOrderDataLoading(true)
        // this.props.changeOrderTypeList(result.data.AllProductType)

        let searchValue;
        if (this.props.state.order.searchType === 'type' && !!this.props.state.order.searchValue) {
            searchValue = JSON.stringify(this.props.state.order.orderTypeList.filter(item => item.typeName === this.props.state.order.searchValue)[0].id);
        } else {
            searchValue = this.props.state.order.searchValue
        }
        let data = {
            search: this.props.state.order.searchValue ? searchValue : "",
            searchType: this.props.state.order.searchType ? this.props.state.order.searchType : "",
            pageSize: this.props.state.order.pageSize,
            start: this.props.state.order.pageNow,
            sort: this.props.state.order.pageSort,
        };
        searchOrderTotal(data, this.setPageTotal)
        searchOrder(data, this.searchData);
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalOrderItem.total);
        this.props.changeOrderDataLoading(false)
    }

    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchOrder.map((item, index) => {
            return data[index] = {
                key: index,
                id: item.id,
                name: item.name,
                phoneCode: item.phoneCode,
                phone: item.phone,
                email: item.email,
                productId: item.productId,
                productName: item.productName,
                productNum: item.productNum,
                productType: item.productType,
                productImg: item.productImg,
                usedPrice: item.usedPrice,
                nowPrice: item.nowPrice,
                orderOdd: item.orderOdd,
                payMethod: item.payMethod,
                payTime: item.payTime,
                payState: item.payState,
                deliveryMethod: item.deliveryMethod,
                deliveryHopeTime: item.deliveryHopeTime,
                expressOdd: item.expressOdd,
                goodsResAddress: item.goodsResAddress,
                fullPrice: item.fullPrice,
                orderState: item.orderState,
                orderId: item.orderId,
                createTime: timestampToTime(parseInt(item.createTime)),
                updateTime: timestampToTime(parseInt(item.updateTime)),

            }
        })
        this.props.changeOrderData(data)
        this.props.changeOrderDataLoading(false)
    }



    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <Fragment>
                {!this.props.state.order.orderEdit &&
                    !this.props.state.order.orderExchange &&
                    <Fragment>
                        {(this.props.state.order.orderAddress.orderState === 2 || this.props.state.order.orderAddress.orderState === 3) &&
                            <div className={styles.addressButton}>
                                <Button type="primary" onClick={this.editAddress}>创建地址</Button>
                                <Button type="primary" onClick={this.changeAddress}>更换地址</Button>
                            </div>
                        }
                        <UserAddressItem
                            id={this.props.state.order.orderAddress.id}
                            email={this.props.state.order.orderAddress.email}
                            firstaName={this.props.state.order.orderAddress.firstName}
                            lastName={this.props.state.order.orderAddress.lastName}
                            phoneCode={this.props.state.order.orderAddress.phoneCode}
                            phone={this.props.state.order.orderAddress.phone}
                            province={this.props.state.order.orderAddress.province}
                            address={this.props.state.order.orderAddress.address}
                            postCode={this.props.state.order.orderAddress.postCode}
                        />
                    </Fragment>
                }
                {!this.props.state.order.orderExchange && this.props.state.order.orderEdit && (this.props.state.order.modelData.orderStateNum === 2 || this.props.state.order.modelData.orderStateNum === 3) &&
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
                            })(<Input placeholder="请输入用户名" disabled={true} />)}
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
                            })(<Input placeholder="请输入邮箱" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
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
                            })(<Input placeholder="请输入姓氏" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
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
                            })(<Input placeholder="请输入名字" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
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
                            })(<Select placeholder="请选择区号" disabled={!this.props.state.order.orderEdit ? true : ""}>
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
                            })(<Input type="number" placeholder="请输入手机号" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
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
                            })(<Input placeholder="请输入省市区" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
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
                            })(<Input placeholder="请输入详细地址" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
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
                            })(<Input placeholder="请输入邮编" disabled={!this.props.state.order.orderEdit ? true : ""} />)}
                        </Form.Item>
                    </Form >
                }
                {this.props.state.order.orderExchange && (this.props.state.order.modelData.orderStateNum === 2 || this.props.state.order.modelData.orderStateNum === 3) &&
                    this.props.state.order.orderUserALLaddress.map((item, index) => (
                        <UserAddressItem
                            id={item.id}
                            index={index}
                            key={'sdasdqwe' + index}
                            email={item.email}
                            firstaName={item.firstName}
                            lastName={item.lastName}
                            phoneCode={item.phoneCode}
                            phone={item.phone}
                            province={item.province}
                            address={item.address}
                            postCode={item.postCode}
                            onClick={e => this.selectAddress(item.id)}
                        />
                    ))
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
        changeOrderUserAllAddress: (data) => { dispatch(Actions.orderUserAllAddress(data)); },
        changeOrderAddressItem: (data) => { dispatch(Actions.orderAddressItem(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ShowAddress));