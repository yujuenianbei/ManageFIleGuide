import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import styles from './Cart.module.less';
import Crumbs from '../Crumbs';
import Message from '../Message';
import ProductWatched from '../ProductWtched';
import { Link } from 'react-router-dom';
import { Icon, Collapse, Radio } from 'antd';
import { createForm } from 'rc-form';
// 请求函数
import { deleteCartProduct, postCart } from '../../fetch/cart';
import Product from '../../data/product';
const Panel = Collapse.Panel;
class CheckoutCart extends Component {
    state = {
        value: 1,
        rightTop: 0,
        totalCost: 0,
        productMayLike: Product.productMayLike,
        productWatched: Product.productWatched
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
    componentDidMount() {
        window.addEventListener('scroll', this.rightScrollListener);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.rightScrollListener);
    }
    rightScrollListener = (e) => {
        console.log(this.product, this.form)
        if (this.product && this.form) {
            if (document.documentElement.scrollTop >= 94) {
                if (document.documentElement.scrollTop - 94 + 17 + this.product.clientHeight >= this.form.clientHeight) {

                } else {
                    this.setState({ rightTop: document.documentElement.scrollTop - 94 })
                }
            } else {
                this.setState({ rightTop: 0 })
            }
        }
    }
    // 增加数量
    addNum = (id, input) => {
        this.refs[input].value = ++this.refs[input].value;
        const value = parseInt(this.refs[input].value)


        this.props.loadingOnHeader(true)
        postCart(id, value, this.afterChangeNum);

        // const productList = Object.assign([], this.props.state.cart.productInfo);
        // let num = 0;
        // productList.map((item, index) => {
        //     if (item.id === id) {
        //         item.num = value;
        //     }
        //     num += item.num
        //     return num;
        // })
        // this.props.addProductNumInCart(num);
        // this.props.addProductInCart(productList);
        // this.countCost(productList);
    }

    // 减少数量
    reduceNum = (id, input) => {
        this.refs[input].value = --this.refs[input].value;
        console.log(this.refs[input].value)
        const value = parseInt(this.refs[input].value)

        this.props.loadingOnHeader(true)
        postCart(id, value, this.afterChangeNum);
        // const productList = Object.assign([], this.props.state.cart.productInfo);
        // let num = 0;
        // productList.map((item, index) => {
        //     if (item.id === id) {
        //         item.num = value;
        //     }
        //     num += item.num
        //     return num;
        // })
        // this.props.addProductNumInCart(num);
        // this.props.addProductInCart(productList);
        // this.countCost(productList);
    }
    // 修改数量
    changeNum = (id, input) => {
        console.log(id, this.refs[input].value);
        let value;
        if (this.refs[input].value === "") {
            value = this.refs[input].value
        } else {
            value = parseInt(this.refs[input].value)
        }

        this.props.loadingOnHeader(true)
        postCart(id, value, this.afterChangeNum);
        // const productList = Object.assign([], this.props.state.cart.productInfo);
        // let num = 0;
        // productList.map((item, index) => {
        //     if (item.id === id) {
        //         item.num = value;
        //     }
        //     num += item.num;
        //     return num;
        // })
        // this.props.addProductNumInCart(num);
        // this.props.addProductInCart(productList);
        // this.countCost(productList);
    }

    // 后台删除产品后，前台更新状态
    afterChangeNum = (result, id) => {
        // console.log(result.data.addToCart[0].productNum)
        const productList = Object.assign([], this.props.state.cart.productInfo);
        let num = 0;
        productList.map((item, index) => {
            if (item.id === id) {
                item.num = result.data.addToCart[0].productNum;
            }
            num += item.num;
        })
        this.props.addProductNumInCart(num);
        this.props.addProductInCart(productList);
        this.countCost(productList);
        this.props.loadingOnHeader(false);
    }

    // 删除产品
    onDelete = (id) => {
        this.props.loadingOnHeader(true)
        deleteCartProduct(id, this.afterDeleteProduct)
    }
    // 后台删除产品后，前台更新状态
    afterDeleteProduct = (result, id) => {
        if (result.data.deleteAProductInCart[0].state) {
            const productList = Object.assign([], this.props.state.cart.productInfo);
            let num = 0, listIndex = 0;
            productList.map((item, index) => {
                if (item.id === id) {
                    listIndex = index;
                    num += 0;
                } else {
                    num += item.num;
                }
            })
            productList.splice(listIndex, 1);
            this.props.addProductNumInCart(num);
            this.props.addProductInCart(productList);
            this.countCost(productList);
            this.props.loadingOnHeader(false);
        } else {
            console.log(1);
        }
    }

    // 修改配送方式
    onChangeExpress = e => {
        console.log('radio checked', e.target.value);
        this.props.changeExpress(e.target.value)
    };

    // 
    callback = (key) => {
        console.log(key);
    }
    // 
    confirmDiscounts = (rule, value, callback) => {
        // console.log(this.props.form.getFieldValue('password'))
        if (value.length === 10 && value !== '') {
            callback()
        } else {
            callback('false')
        }
    }
    confirmDiscountsCode = () => {
        this.props.form.validateFields(['confirmDiscounts'], (error, value) => {
            if (!error) {
                console.log(value);
                // 发送手机号然后得到验证码
            }
            console.log(error, value);
        });
    }

    classChange = (errors, name, yes, no) => {
        const { getFieldError } = this.props.form;
        if (errors = getFieldError(name)) {
            return yes
        } else {
            return no
        }
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
            <div className={styles.checkoutcart}>
                <Crumbs links={[{
                    link: '/',
                    name: '购物车'
                }]} />
                <div className={styles.cart}>
                    <h3>购物车</h3>
                    <div className={styles.cartContent}>
                        {this.props.state.cart.productInfo.length > 0 &&
                            <Fragment>
                                <div className={styles.form} ref={ref => { this.form = ref }}>
                                    <Message type="warn">立即结账并获得该订单的4649积分。 这仅适用于注册用户，并且在用户登录时可能会有所不同。</Message>
                                    {/* <Message type="success">6666</Message>
                                    <Message type="alert">6666</Message> */}
                                    <div className={styles.productList}>
                                        {this.props.state.cart.productInfo.map((item, index) => {
                                            return <div className={styles.product} key={index + "cart_produc_123asdas"}>
                                                <Icon className={styles.delete} type="close" onClick={() => this.onDelete(item.id)} />
                                                <div className={styles.productImg}>
                                                    <img src={item.img} alt={item.productName} />
                                                </div>
                                                <div className={styles.productInfo}>
                                                    <Link to={'/productInfo/' + item.id} className={styles.productName}>{item.productName}</Link>
                                                    <p className={styles.id}>产品编号：{item.id}</p>
                                                    <span className={styles.promotion}>{item.promotionMessage}</span>
                                                </div>
                                                <div className={styles.productNum}>
                                                    <input type="text" ref={index + "input"} className={styles.productNumber} value={item.num} onChange={() => this.changeNum(item.id, index + "input")} />
                                                    <div className={styles.numControll}>
                                                        <button className={styles.albedo + " " + styles.controller} onClick={() => this.addNum(item.id, index + "input")}>
                                                            <span>+</span>
                                                        </button>
                                                        <button disabled={item.num > 1 ? false : "disabled"} className={styles.albedo + " " + styles.controller} onClick={() => this.reduceNum(item.id, index + "input")}>
                                                            <span>-</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className={styles.totalNum}>
                                                    <p>小计</p>
                                                    <h3>￥ {item.price * item.num}</h3>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div className={styles.sendMethod + " " + styles.collapse}>
                                        <Collapse
                                            defaultActiveKey={['1']}
                                            bordered={false}
                                            expandIconPosition={"right"}
                                            expandIcon={({ isActive }) => <Icon type={isActive ? "minus" : "plus"} />}>
                                            <Panel header="配送方式" key="1" className={styles.panel}>
                                                <Radio.Group onChange={this.onChangeExpress} value={this.props.state.cart.express}>
                                                    <Radio style={radioStyle} value={1}>
                                                        菜鸟配送
                                                    </Radio>
                                                    <Radio style={radioStyle} value={2}>
                                                        京东配送
                                                    </Radio>
                                                    <Radio style={radioStyle} value={3}>
                                                        顺丰快递
                                                    </Radio>
                                                </Radio.Group>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                    <div className={styles.discounts + " " + styles.collapse}>
                                        <Collapse
                                            bordered={false}
                                            expandIconPosition={"right"}
                                            expandIcon={({ isActive }) => <Icon type={isActive ? "minus" : "plus"} />}>
                                            <Panel header="使用优惠券代码" key="1" className={styles.panel}>
                                                <div className={styles.inputs}>
                                                    <div className={styles.inputsContent}>
                                                        {getFieldDecorator('confirmDiscounts', {
                                                            initialValue: '',
                                                            validate: [{
                                                                trigger: ['onBlur', 'onChange'],
                                                                rules: [{
                                                                    required: true,
                                                                    validator: (rule, value, cb) => this.confirmDiscounts(rule, value, cb),
                                                                    message: '优惠券代码不正确',
                                                                }],
                                                            }],
                                                        })(<input type="text" onChange={this.userNameChange} placeholder="请输入优惠券代码" className={this.classChange(errors, 'confirmDiscounts', styles.input_error, styles.input_normal)} />)}
                                                        <button className={styles.confirmDiscountsBtn + " " + styles.prime} onClick={this.confirmDiscountsCode}>应用折扣</button>
                                                    </div>
                                                    {(errors = getFieldError('confirmDiscounts')) ? <div className={styles.error}>{errors.join(',')}</div> : null}
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </div>
                                <div className={styles.cartInfo} ref={ref => { this.product = ref }} style={{ top: this.state.rightTop }}>
                                    <p>总金额</p>
                                    <div className={styles.minPrice}>
                                        <div className={styles.infoTitle}>小计</div>
                                        <div className={styles.infoPrice}>￥{this.state.totalCost}</div>
                                    </div>
                                    <Message type="warn">实际运费请以结算页为准</Message>
                                    <div className={styles.totalCount}>
                                        <div className={styles.infoTitle}>总金额</div>
                                        <div className={styles.infoPrice}>￥{this.state.totalCost}</div>
                                    </div>
                                    <Link to={"/onestepcheckout"}>
                                        <button className={styles.confirmDiscountsBtn + " " + styles.prime}>
                                            进行结算
                                        </button>
                                    </Link>
                                </div>
                            </Fragment>
                        }
                        {this.props.state.cart.productInfo.length === 0 &&
                            <Fragment>
                                <Link to={'/'}>点击此处添加产品</Link>
                            </Fragment>
                        }
                    </div>
                    <div className={styles.mayLike}>
                        <h2>为你推荐:</h2>
                        <div className={styles.likeContent}>
                            {this.state.productMayLike.map((item, index) => {
                                return <ProductWatched key={index + 'productMayLike'}
                                    name={item.name}
                                    img={item.img}
                                    link={item.link}
                                    message={item.message}
                                    price={item.price}
                                />
                            })}
                        </div>
                    </div>
                    <div className={styles.mayLike}>
                        <h2>您最近浏览的产品:</h2>
                        <div className={styles.likeContent}>
                            {this.state.productWatched.map((item, index) => {
                                return <ProductWatched key={index + 'productMayLike'}
                                    name={item.name}
                                    img={item.img}
                                    link={item.link}
                                    message={item.message}
                                    price={item.price}
                                />
                            })}
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
        loadingOnHeader: (data) => { dispatch(Actions.loadingHeader(data)); },
        changeExpress: (data) => { dispatch(Actions.expressInCart(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createForm()(CheckoutCart)));
