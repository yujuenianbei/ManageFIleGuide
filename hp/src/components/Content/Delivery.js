import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import styles from './Delivery.module.less';
import Crumbs from '../Crumbs';
import Message from '../Message';
import DeliveryAddress from '../DeliveryAddress';
import DeliveryAddressItem from '../DeliveryAddressItem';
import DeliveryProduct from '../DeliveryProduct';
import { Link } from 'react-router-dom';
import { Icon, Collapse, Checkbox, Radio, Input } from 'antd';
import { createForm } from 'rc-form';

import { getGoodsResInfo, addGoodsResInfo } from '../../fetch/goodsResInfo';
import { getProductsInOrder, addUserOrder } from '../../fetch/order';

const RadioGroup = Radio.Group;

class Delivery extends Component {
    state = {
        createAccount: false,
        paymentMessage: false,
        billMethod: 1,
        billType: 1,
        rulesChecked: false,
        smsChecked: true,
        totalCost: 0,
        rightTop: 0,
        // 登录用户的收货地址是否有
        loginGoodsResInfo: false,
        // 用户具体收货地址
        GoodsResInfoItems: []
    }
    componentDidMount() {
        window.addEventListener('scroll', this.rightScrollListener);
        getGoodsResInfo(this.props.state.user.useremail, this.getGoodsResInfoData)

        // 请求订单中的产品信息
        var dd = this.props.state.order.orderProductList.map(item => {
            return item.id
        })
        getProductsInOrder(JSON.stringify(dd), this.changeProductListOfOrder)

        // // 根据购物车里面的内容生成订单产品列表
        // let productList = []
        // this.props.state.cart.productInfo.map(item => {
        //     productList.push({ id: item.id, number: item.num })
        // })
        // this.props.changeOrderProductList(productList)
    }

    // 将产品信息加入订单产品中
    changeProductListOfOrder = (result) => {
        // 将产品数量进行修改
        var products = result.data.queryProductInOrder.map(items => {
            for (let [index, item] of this.props.state.order.orderProductList.entries()) {
                if (item.id === items.id) {
                    items.num = item.num;
                    console.log(items)
                    return items
                }
            }
        })
        this.props.changeOrderProducts(products)
        this.countCost(products)
    }

    // 获取收货地址后
    getGoodsResInfoData = (result) => {
        if (result.data.queryGoodsResInfoByEmail.length === 0) {
            this.props.getOrderAddress(result.data.queryGoodsResInfoByEmail)
            // 用户已注册但是没有添加收货地址
            this.props.form.setFieldsValue({
                email: this.props.state.user.useremail,
            })
        } else {
            this.props.getOrderAddress(result.data.queryGoodsResInfoByEmail)
            this.setState({
                loginGoodsResInfo: true
            })
        }
        console.log(result)
    }

    // 取消绑定
    componentWillUnmount() {
        window.removeEventListener('scroll', this.rightScrollListener);
    }

    // 右侧滚动
    rightScrollListener = (e) => {
        const data = this.product.clientHeight + this.state.rightTop
        // console.log(document.documentElement.scrollTop - 94 + this.product.clientHeight)
        if (document.documentElement.scrollTop >= 94) {
            // console.log(document.documentElement.scrollTop - 94 + this.product.clientHeight, this.form.clientHeight)
            if (document.documentElement.scrollTop - 94 + 145 + this.product.clientHeight >= this.form.clientHeight) {

            } else {
                this.setState({ rightTop: document.documentElement.scrollTop - 94 })
            }
        } else {
            this.setState({ rightTop: 0 })
        }
    }

    // 计算总价
    countCost = (data) => {
        let cost = 0;
        data.map((item, index) => {
            cost = cost + item.num * item.nowPrice;
            return cost;
        })
        this.props.changeOrderTotalCost(cost)
    }

    // 
    componentWillMount() {

        // this.countCost(this.props.state.cart.productInfo);
    }

    // 下单
    check = () => {
        if (this.props.state.order.orderPayment > 4 || this.props.state.order.orderPayment === 0) {
            this.setState({ paymentMessage: true })
        }
        if (this.state.createAccount && !this.state.loginGoodsResInfo) {
            this.props.form.validateFields((error, value) => {
                console.log(error, value);
                // value为子组件的值　子组件改了父组件的内容
            });
        } else if (!this.state.createAccount && !this.state.loginGoodsResInfo) {
            this.props.form.validateFields(
                ['email', 'lastname', 'firstname', 'address', 'phone',
                    'phoneCode', 'province', 'city', 'district', 'postCode'], (error, value) => {
                        if (!error) {
                            console.log(value);
                            addGoodsResInfo(value, this.addGoodsResInfo);
                        }
                        console.log(error, value);
                    });
        } else if (!this.state.createAccount && this.state.loginGoodsResInfo) {
            const data = {
                email: this.props.state.user.useremail,
                payMethod: this.props.state.order.orderPayment,
                deliveryMethod: this.props.state.order.delivery,
                deliveryHopeTime: "2019-7-23",
                goodsResAddress: parseInt(this.props.state.order.orderAddressItem),
                productList: JSON.stringify(this.props.state.order.orderProductList)
            }
            addUserOrder(data, this.finishAddOrder);
        }
    }

    // 添加收货地址结束
    addGoodsResInfo = (result) => {
        if (result.data.regGoodsResInfo.length === 0) {
            console.log(result)
        } else {
            this.setState({ loginGoodsResInfo: true })
        }
    }

    // 提交订单后
    finishAddOrder = (result) => {
        console.log(result)
        if (result.data.addUserOrder.state) {
            console.log(1)
            this.props.addProductNumInCart('');
            this.props.addProductInCart('');
            this.props.changeOrderProductList('');
            this.props.history.push('/');
        }
    }

    // 是否进行注册
    regCheck = (e) => {
        this.setState({ createAccount: e.target.checked })
    }

    // 密码重复验证
    confirmPassword = (rule, value, callback) => {
        if (this.props.form.getFieldValue('password') === value && value !== '') {
            callback()
        } else {
            callback('false')
        }
    }

    // 确认收货地址
    selectAddress = (index) => {
        this.props.setOrderAddressItem(index)
    }

    // 修改支付方式
    changePaymentMethod = e => {
        console.log(e.target.value)
        this.props.changePaymentMethod(e.target.value)
        this.setState({
            paymentMessage: false
        });
    };

    // 发票方式
    changeBillMethod = (e) => {
        this.setState({
            billMethod: e.target.value,
        });
    }

    // 发票类型
    changeBillType = (type) => {
        this.setState({
            billType: type,
        });
    }

    // 
    rulesChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ rulesChecked: e.target.checked })
    }

    // 优惠码
    smsChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ smsChecked: e.target.checked })
    }

    render() {
        let errors;
        const { getFieldError, getFieldDecorator } = this.props.form;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className={styles.delivery}>
                <Crumbs links={[{
                    link: '/',
                    name: '结账'
                }]} />
                <h3>结账</h3>
                <div className={styles.deliveryContent}>
                    <div className={styles.userInfo} ref={ref => { this.form = ref }}>
                        <div className={styles.leftContent + " " + styles.deliveryAddress}>
                            <h2>收货地址</h2>
                            {!this.state.loginGoodsResInfo && this.props.state.user.loginState &&
                                <DeliveryAddress form={this.props.form} loginGoodsResInfo={this.state.loginGoodsResInfo} />
                            }
                            {!this.props.state.user.loginState &&
                                <div className={styles.deliveryPwd}>
                                    <div className={styles.deliveryAddressList}>
                                        <Checkbox className={styles.createAccountCheck} onChange={this.regCheck} checked={this.state.createAccount}>创建账号</Checkbox>
                                    </div>
                                    {this.state.createAccount && <Fragment>
                                        <div className={styles.deliveryAddressList}>
                                            <label className={styles.labels} required>电子邮件地址</label>
                                            {getFieldDecorator('password', {
                                                initialValue: '',
                                                validate: [{
                                                    trigger: ['onBlur', 'onChange'],
                                                    rules: [{
                                                        required: true,
                                                        type: 'string',
                                                        message: '密码不能为空',
                                                    }],
                                                }],
                                            })(
                                                <input type="password" placeholder="请输入密码" className={(errors = getFieldError('password')) ? styles.userInput_error : styles.userInput} />
                                            )}
                                            {(errors = getFieldError('password')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                                        </div>
                                        <div className={styles.deliveryAddressList}>
                                            <label className={styles.labels} required>电子邮件地址</label>
                                            {getFieldDecorator('confirmPassword', {
                                                initialValue: '',
                                                validate: [{
                                                    trigger: ['onBlur', 'onChange'],
                                                    rules: [{
                                                        required: true,
                                                        validator: (rule, value, cb) => this.confirmPassword(rule, value, cb),
                                                        message: '密码不一致',
                                                    }],
                                                }],
                                            })(
                                                <input type="PASSWORD" placeholder="请再次输入密码" className={(errors = getFieldError('confirmPassword')) ? styles.userInput_error : styles.userInput} />
                                            )}
                                            {(errors = getFieldError('confirmPassword')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                                        </div>
                                    </Fragment>}
                                </div>
                            }
                            {this.state.loginGoodsResInfo && this.props.state.user.loginState &&
                                this.props.state.order.orderAddress.map((item, index) => (
                                    <DeliveryAddressItem
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
                        </div>
                        <div className={styles.leftContent + " " + styles.deliveryAddress}>
                            <h2>安全付款方式</h2>
                            {this.state.paymentMessage && <Message type="warn">请指定付款方式。</Message>}
                            <RadioGroup onChange={this.changePaymentMethod} value={this.props.state.order.orderPayment}>
                                <Radio style={radioStyle} value={1}>
                                    微信支付
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    支付宝支付
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    银行转账
                                </Radio>
                                <Radio style={radioStyle} value={4}>
                                    货到付款
                                </Radio>
                            </RadioGroup>
                        </div>
                        <div className={styles.leftContent + " " + styles.deliveryAddress}>
                            <h2>发票设置</h2>
                            <RadioGroup onChange={this.changeBillMethod} value={this.state.billMethod}>
                                <Radio style={radioStyle} value={1}>
                                    电子发票
                                </Radio>
                                {this.state.billMethod === 1 && <Fragment>
                                    <div className={styles.paymethod}>
                                        <div className={styles.paycheck}>
                                            <button className={this.state.billType === 1 ? styles.paycheckChange + " " + styles.prime : styles.paycheckChange + " " + styles.primed} onClick={() => this.changeBillType(1)}>个人普通发票</button>
                                            <button className={this.state.billType === 2 ? styles.paycheckChange + " " + styles.prime : styles.paycheckChange + " " + styles.primed} onClick={() => this.changeBillType(2)}>公司普通发票</button>
                                        </div>
                                        <div className={styles.paycheck}>
                                            {this.state.billType === 1 &&
                                                <input placeholder="个人"></input>
                                            }
                                            {this.state.billType === 2 &&
                                                <Fragment>
                                                    <input placeholder="公司发票抬头"></input><br />
                                                    <input placeholder="纳税人识别号"></input>
                                                </Fragment>
                                            }
                                        </div>
                                    </div>
                                </Fragment>
                                }
                                <Radio style={radioStyle} value={2}>
                                    增值税发票
                                </Radio>
                                {this.state.billMethod === 2 && <p>首次开具增值税专用发票的顾客，请填写开具增值税专用发票所需信息，具体操作路径：我的账户-发票设置-增值税发票</p>}
                            </RadioGroup>
                        </div>
                        <div>
                            <Checkbox checked={this.state.rulesChecked} onChange={this.rulesChange}></Checkbox>  我已阅读并接受 条款和条件 和 隐私政策
                        </div>
                        <div>
                            <Checkbox checked={this.state.smsChecked} onChange={this.smsChange}></Checkbox>  是的，请向我发送惠普的促销，新闻和产品支援更新。请查看惠普隐私声明，了解有关自动数据收集工具和惠普隐私惯例的更多信息。
                        </div>
                        <div className={styles.submit}>
                            <button disabled={this.state.rulesChecked ? false : 'disabled'} className={styles.submitBtn + " " + styles.prime} onClick={this.check}>提交订单</button>
                        </div>
                    </div>
                    <div className={styles.productInfo} ref={ref => { this.product = ref }} style={{ top: this.state.rightTop }}>
                        <h3>商品清单</h3>
                        {this.props.state.order.orderProducts.length > 0 && this.props.state.order.orderProducts.map((item, index) => {
                            return <DeliveryProduct key={'sdacdsfa' + index} items={item} />
                        })}
                        <div className={styles.productPrice}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>折扣</th>
                                        <th>-￥250</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>京东配送</th>
                                    </tr>
                                    <tr>
                                        <th><span className={styles.pricename}>总金额</span></th>
                                        <th><span className={styles.pricename}>￥{this.props.state.order.orderTotalCost}</span></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.gobackCart}>
                            <Link to={'/checkout/cart'}>
                                <button className={styles.submitBtn + " " + styles.prime}>返回购物车</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderAddressItem: (data) => { dispatch(Actions.orderAddressItem(data)); },
        getOrderAddress: (data) => { dispatch(Actions.orderAddress(data)); },
        changePaymentMethod: (data) => { dispatch(Actions.orderPaymentMethod(data)); },
        changeOrderProductList: (data) => { dispatch(Actions.orderProductList(data)); },
        changeOrderProducts: (data) => { dispatch(Actions.orderProducts(data)); },
        changeOrderTotalCost: (data) => { dispatch(Actions.orderTotalCost(data)); },
        // 产品相关
        addProductNumInCart: (data) => { dispatch(Actions.productNumInCart(data)); },
        addProductInCart: (data) => { dispatch(Actions.productInCart(data)); },


    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createForm()(Delivery)));
