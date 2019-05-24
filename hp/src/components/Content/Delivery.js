import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import styles from './Delivery.module.less';
import Crumbs from '../Crumbs';
import Message from '../Message';
import DeliveryAddress from '../DeliveryAddress';
import DeliveryProduct from '../DeliveryProduct';
import { Link } from 'react-router-dom';
import { Icon, Collapse, Checkbox, Radio, Input } from 'antd';
import { createForm } from 'rc-form';

const RadioGroup = Radio.Group;

class Delivery extends Component {
    state = {
        createAccount: true,
        paymentMethod: 0,
        paymentMessage: false,
        billMethod: 1,
        billType: 1,
        rulesChecked: false,
        smsChecked: true,
        totalCost: 0,
        rightTop: 0
    }
    componentDidMount() {
        window.addEventListener('scroll', this.rightScrollListener);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.rightScrollListener);
    }
    rightScrollListener = (e) => {
        const data = this.product.clientHeight + this.state.rightTop
        console.log(document.documentElement.scrollTop - 94 + this.product.clientHeight)
        if (document.documentElement.scrollTop >= 94) {
            console.log(document.documentElement.scrollTop - 94 + this.product.clientHeight, this.form.clientHeight, )
            if (document.documentElement.scrollTop - 94 + 145 + this.product.clientHeight >= this.form.clientHeight) {

            } else {
                this.setState({ rightTop: document.documentElement.scrollTop - 94 })
            }
        } else {
            this.setState({ rightTop: 0 })
        }
    }
    countCost = (data) => {
        let cost = 0;
        data.map((item, index) => {
            cost = cost + item.num * item.price;
            return cost;
        })
        this.setState({ totalCost: cost });
        return false;
    }
    componentWillMount() {
        this.countCost(this.props.state.cart.productInfo);
    }
    // 下单
    check = () => {
        if (this.state.paymentMethod > 3 || this.state.paymentMethod === 0) {
            this.setState({ paymentMessage: true })
        }
        if (this.state.createAccount) {
            this.props.form.validateFields((error, value) => {
                console.log(error, value);
                // value为子组件的值　子组件改了父组件的内容
            });
        } else {
            this.props.form.validateFields(
                ['email', 'lastname', 'firstname', 'address', 'phone',
                    'pin', 'province', 'city', 'district', 'pincode'], (error, value) => {
                        if (!error) {
                            console.log(value);
                        }
                        console.log(error, value);
                    });
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
    // 修改支付方式
    changePaymentMethod = e => {
        this.setState({
            paymentMethod: e.target.value,
            paymentMessage: false
        });
    };
    changeBillMethod = (e) => {
        this.setState({
            billMethod: e.target.value,
        });
    }
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
    // 
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
                            <DeliveryAddress form={this.props.form} />
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
                        </div>
                        <div className={styles.leftContent + " " + styles.deliveryAddress}>
                            <h2>安全付款方式</h2>
                            <RadioGroup onChange={this.changePaymentMethod} value={this.state.paymentMethod}>
                                <Radio style={radioStyle} value={1}>
                                    货到付款
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    在线支付
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    银行转账
                                </Radio>
                            </RadioGroup>
                            {this.state.paymentMessage && <Message type="warn">请指定付款方式。</Message>}
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
                                                    <input placeholder="公司发票抬头"></input>
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
                        {this.props.state.cart.productInfo.map((item, index) => {
                            return <DeliveryProduct items={item} />
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
                                        <th><span className={styles.pricename}>￥{this.state.totalCost}</span></th>
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
        addProductNumInCart: (data) => { dispatch(Actions.productNumInCart(data)); },
        addProductInCart: (data) => { dispatch(Actions.productInCart(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createForm()(Delivery)));
