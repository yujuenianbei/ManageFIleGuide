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
import { deleteCartProduct, postCart, getDeliveryMethod } from '../../fetch/cart';
import Product from '../../data/product';
const Panel = Collapse.Panel;
class CheckoutCart extends Component {
    state = {
        value: 1,
        rightTop: 0,
        totalCost: 0,
        productMayLike: Product.productMayLike,
        productWatched: Product.productWatched,
        productInOreder: []
    }
    countCost = (data) => {
        let cost = 0;
        data.map((item, index) => {
            cost = cost + item.num * item.price;
            return cost;
        })
        this.props.changeCartCountPrice(cost)
        // this.setState({ totalCost: cost });
        return false;
    }
    componentWillMount() {
        this.props.changeCartError(false)
        this.props.changeMessageInProduct('');
        this.props.changeMessageInExpress('');
        getDeliveryMethod(this.setDeliveryMethod)
    }
    // 设置配送方式
    setDeliveryMethod = (result) => {
        this.props.changeCartDeliveryList(result.data.queryDeliveryMethod)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.rightScrollListener);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.rightScrollListener);
    }

    // 右侧内容跟随滚动
    rightScrollListener = (e) => {
        // console.log(this.product, this.form)
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
    }

    // 减少数量
    reduceNum = (id, input) => {
        this.refs[input].value = --this.refs[input].value;
        // console.log(this.refs[input].value)
        const value = parseInt(this.refs[input].value)
        this.props.loadingOnHeader(true)
        postCart(id, value, this.afterChangeNum);
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
    }

    // 后台删除产品后，前台更新状态
    afterChangeNum = (result, id) => {
        // 修改总金额
        const orderProduct = this.props.state.cart.cartToOrder;
        const orderProducts = this.props.state.order.orderProductList;
        var indexs = () => {
            for (let [index, items] of orderProduct.entries()) {
                if (items.id === id) {
                    console.log(index)
                    return index;
                }
            }
        }

        const productList = Object.assign([], this.props.state.cart.productInfo);
        let num = 0;
        productList.map((item, index) => {
            if (item.id === id) {
                item.num = result.data.addToCart[0].productNum;

                orderProduct[indexs()].num = result.data.addToCart[0].productNum
                orderProducts[indexs()].num = result.data.addToCart[0].productNum
            }
            num += item.num;
        })
        this.props.addProductNumInCart(num);
        this.props.addProductInCart(productList);
        this.props.loadingOnHeader(false);



        // 添加在本页
        this.props.changeCartToOrder(orderProduct)
        // 添加到订单中
        this.props.changeOrderProductList(orderProducts)
        this.countCost(orderProduct)
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
            this.changeError();
            this.toCheckout();
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

    // 跳转checkout
    toCheckout = () => {
        const delivery = this.props.state.order.delivery;
        const order = this.props.state.order.orderProductList.length;
        this.changeError(order, delivery);
        if (order && delivery) {
            this.props.history.push('/onestepcheckout');
            this.props.changeMessageInProduct('');
            this.props.changeMessageInExpress('');
        } else if (!order && delivery) {
            console.log(1)
            this.props.changeMessageInProduct('请添加产品到订单');
            this.props.changeMessageInExpress('');
        } else if (order && !delivery) {
            console.log(2)
            this.props.changeMessageInProduct('');
            this.props.changeMessageInExpress('请选择配送方式');
        } else if (!order && !delivery) {
            console.log(3)
            this.props.changeMessageInProduct('请添加产品');
            this.props.changeMessageInExpress('请选择配送方式');
        }
    }

    // 错误信息提示
    changeError = (order, delivery) => {
        if (order && delivery) {
            this.props.changeCartError(false)
        } else {
            this.props.changeCartError(true)
        }
    }

    // 将购物车中的产品添加到订单中
    addProductToOrder = (item, index) => {
        const orderProduct = this.props.state.cart.cartToOrder;
        const orderProducts = this.props.state.order.orderProductList;
        const cartToOrderItem = this.props.state.cart.cartToOrderItem;
        // 是否存在与订单中
        var result = orderProducts.some(function (items) {
            if (!!items && items.id && items.id === item.id) {
                return true;
            }
        })
        if (result) {
            // 从订单中删除
            var indexs = () => {
                for (let [index, items] of orderProduct.entries()) {
                    if (!!items && items.id && items.id === item.id) {
                        return index;
                    }
                }
            }
            orderProducts.splice(indexs(), 1)
            cartToOrderItem.splice(indexs(), 1)
            orderProduct.splice(indexs(), 1)
        } else {
            // 添加到订单中
            orderProduct.push({ id: item.id, num: item.num, price: item.price, index })
            orderProducts.push({ id: item.id, num: item.num })
            cartToOrderItem.push(index)
        }
        // 添加在本页
        this.props.changeCartToOrder(orderProduct)
        // 添加到订单中
        this.props.changeOrderProductList(orderProducts)
        // 添加在本页 无index
        this.props.changeCartToOrderItem(cartToOrderItem)
        // 计算总价
        this.countCost(orderProduct);
        // console.log(orderProduct);
        // console.log(orderProducts);
        // console.log(cartToOrderItem);
    }
    // 显示添加到订单中的产品
    productInOrder = (index) => {
        for (let i of this.props.state.cart.cartToOrderItem) {
            if (index === i) {
                return i
            }
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
        // for of 可以使用index
        // for (const [i, v] of ['a', 'b', 'c'].entries()) {
        //     console.log(i, v)
        //   }
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
                                    <div className={styles.productList}>
                                        {
                                            this.props.state.cart.cartError && this.props.state.cart.messageProduct &&
                                            <Message type="warn">{this.props.state.cart.messageProduct}</Message>
                                        }
                                        {this.props.state.cart.productInfo.map((item, index) => {
                                            return <div className={this.productInOrder(index) === index ? styles.product + ' ' + styles.productSelected : styles.product} key={index + "cart_produc_123asdas"}>
                                                <Icon className={styles.delete} type="close" onClick={() => this.onDelete(item.id)} />
                                                <div className={styles.productImg}>
                                                    <img src={item.img} alt={item.productName} />
                                                </div>
                                                <div className={styles.productInfo}>
                                                    <Link to={'/productInfo/' + item.id} className={styles.productName}>{item.productName}</Link>
                                                    <p className={styles.id}>产品编号：{item.id}</p>
                                                    <p className={styles.promotion}>{item.promotionMessage}</p>
                                                    <p className={styles.promotion}>{item.productPromotionMessageSecond}</p>
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
                                                    <button className={styles.confirmDiscountsBtn + " " + styles.prime} onClick={() => this.addProductToOrder(item, index)}>
                                                        {this.productInOrder(index) === index ? '移出订单' : '加入订单'}
                                                    </button>
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
                                                {
                                                    this.props.state.cart.cartError && this.props.state.cart.messageExpress &&
                                                    <Message type="warn">{this.props.state.cart.messageExpress}</Message>
                                                }
                                                <Radio.Group onChange={this.onChangeExpress} value={this.props.state.order.delivery}>
                                                    {this.props.state.cart.deliveryList.length !== 0 &&
                                                        this.props.state.cart.deliveryList.map((item, index) => (
                                                            <Radio style={radioStyle} key={'asdq312313' + index} value={parseInt(item.id)}>
                                                                {item.name}
                                                            </Radio>
                                                        ))
                                                    }
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
                                        <div className={styles.infoPrice}>￥{this.props.state.cart.productOrderPrice}</div>
                                    </div>
                                    <Message type="warn">实际运费请以结算页为准</Message>
                                    <div className={styles.totalCount}>
                                        <div className={styles.infoTitle}>总金额</div>
                                        <div className={styles.infoPrice}>￥{this.props.state.cart.productOrderPrice}</div>
                                    </div>
                                    <button className={styles.confirmDiscountsBtn + " " + styles.prime} onClick={this.toCheckout}>
                                        进行结算
                                        </button>
                                </div>
                            </Fragment>
                        }
                        {(this.props.state.cart.productInfo.length === 0 && this.props.state.user.loginState === 1) &&
                            <Fragment>
                                <Message type="warn">请添加产品</Message>
                                <Link to={'/'}>点击此处添加产品</Link>
                            </Fragment>
                        }
                        {(this.props.state.cart.productInfo.length === 0 && this.props.state.user.loginState === 0) &&
                            <Fragment>
                                <Message type="warn">请先<Link to={'/account/login'}>登录</Link>后再添加产品</Message>
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
        changeExpress: (data) => { dispatch(Actions.orderDelivery(data)); },
        changeCartError: (data) => { dispatch(Actions.cartError(data)); },
        changeMessageInProduct: (data) => { dispatch(Actions.messageInProduct(data)); },
        changeMessageInExpress: (data) => { dispatch(Actions.messageInExpress(data)); },
        changeCartToOrder: (data) => { dispatch(Actions.cartToOrder(data)); },
        changeCartDeliveryList: (data) => { dispatch(Actions.cartDeliveryList(data)); },
        changeOrderProductList: (data) => { dispatch(Actions.orderProductList(data)); },
        changeCartToOrderItem: (data) => { dispatch(Actions.cartToOrderItem(data)); },
        changeCartCountPrice: (data) => { dispatch(Actions.cartCountPrice(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createForm()(CheckoutCart)));
