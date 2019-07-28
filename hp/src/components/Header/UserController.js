import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './UserController.module.less';
import { Link } from 'react-router-dom';
import { deleteCartProduct, postCart, getUserCart, getQRcode, verifyQRcode, deleteQRcode } from '../../fetch/cart';
import { Badge, Icon, InputNumber, Spin } from 'antd';
// http
import { http } from '../../http';
let timeout, interval;
class UserController extends PureComponent {
    state = {
        cartToggle: false,
        userToggle: false,
        qrToggle: false,
        uid_img: '',
        qrcode: '',
        scanner: '请扫描二维码'
    }
    componentDidMount() {
        getUserCart(this.afterFetchProduct);
    }
    componentWillUpdate(nextPorps) {
        if (!this.props.state.user.loginState && nextPorps.state.user.loginState !== this.props.state.user.loginState) {
            getUserCart(this.afterFetchProduct);
        }
    }
    // 显示购物车
    showCart = () => {
        this.setState({ cartToggle: !this.state.cartToggle, userToggle: false, qrToggle: false })
    }
    // 显示用户
    showUser = () => {
        this.setState({ userToggle: !this.state.userToggle, cartToggle: false, qrToggle: false })
    }
    // 显示二维码
    showQr = () => {
        this.setState({ qrToggle: !this.state.qrToggle, cartToggle: false, userToggle: false })
        if (this.state.qrToggle) {
            clearInterval(interval);
            clearTimeout(timeout);
        } else {
            this.loadQRcode();
        }
    }
    // 加载二维码
    loadQRcode = () => {
        this.setState({ uid_img: http.ip + "/loginByPhone?" + new Date() })
        timeout = setTimeout(() => {
            getQRcode(this.verifying)
        }, 100)
    }
    // 校验扫码状态
    verifying = (c) => {
        this.setState({ qrcode: c.reqUid.hex }, () => {
            interval = setInterval(() => {
                verifyQRcode(this.scanState, this.state.qrcode)
            }, 1000)
        })
    }

    // 扫码状态
    scanState = (c) => {
        if (c.state === 1) {
            this.setState({ scanner: "请扫描二维码" })
        } else if (c.state === 2) {
            this.setState({ scanner: "请在手机上确认登录" })
        } else if (c.state === 3) {
            this.setState({ scanner: "已登录" });
            setTimeout(() => {
                this.login(c.uuid)
                deleteQRcode(this.deleteQrcode, c.uid)
            }, 500)
        } else if (c.state === 4) {
            this.setState({ scanner: "请重新扫描二维码" })
        }
    }

    // 触发登录
    login = (uuid) => {
        var query = `mutation loginUuid($uuid: String){
            loginUuid(uuid: $uuid){
                id
                name,
                state,
                token
            } 
          }
          `;
        fetch( http.ip + '/graphql', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'login': localStorage.getItem('loginState'),
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                query,
                variables: {
                    uuid: uuid,
                }
            })
        })
            .then(r => r.json())
            .then(result => {
                if (result.data.loginUuid && result.data.loginUuid[0].state === "1") {
                    clearInterval(interval);
                    clearTimeout(timeout);
                    localStorage.setItem("token", result.data.loginUuid[0].token);
                    localStorage.setItem("id", result.data.loginUuid[0].id);
                    this.props.changeLoginstate(1);
                    this.props.changeUsername(result.data.loginUuid[0].name)
                    this.hideToggle();
                } else {
                    this.openNotification()
                }
            });
    }
    // 
    deleteQrcode = (r) => {
        console.log(r)
    }
    // 收起所有状态
    hideToggle = () => {
        this.setState({ userToggle: false, cartToggle: false, qrToggle: false })
    }
    signOut = () => {
        this.props.addProductInCart([]);
        this.props.addProductNumInCart(0);

        this.props.changeLoginstate(0);
        this.props.changeUsername('');
        this.hideToggle();
    }
    // 请求购物车内容
    afterFetchProduct = (result) => {
        if (result.data.queryUserCartProducts[0].state) {
            let productInfos = [];
            let productNum = 0;
            const infos = Object.assign([], result.data.queryUserCartProducts);
            infos.map((item, index) => {
                productInfos.push({
                    id: item.id,
                    img: item.img,
                    num: item.productNum,
                    price: item.nowPrice,
                    promotionMessage: item.promotionMessage,
                    productName: item.productName
                })
                productNum += item.productNum
            })
            this.props.addProductInCart(productInfos);
            this.props.addProductNumInCart(productNum);
        }
    }
    // 后台删除产品后，前台更新状态
    afterChangeNum = (result, id) => {
        if (result) {
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
            this.props.loadingOnHeader(false);
        }
    }
    // 修改数量
    changeNum = (id, value) => {
        this.props.loadingOnHeader(true)
        postCart(id, value, this.afterChangeNum);
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
            console.log(productList)
            productList.splice(listIndex, 1);
            this.props.addProductNumInCart(num);
            this.props.addProductInCart(productList);
            this.props.loadingOnHeader(false);
        } else {
            console.log(1);
        }
    }
    // 点击删除产品按钮
    onDelete = (id) => {
        this.props.loadingOnHeader(true)
        deleteCartProduct(id, this.afterDeleteProduct)
    }

    DeleteFetch = () => {

    }
    render() {
        return (
            <Fragment>
                <div className={styles.userController}>
                    <ul>
                        <li><Icon className={styles.userIcon} type="phone" /></li>
                        <li>
                            <Badge className={styles.userIcon} count={this.props.state.cart.productNum}>
                                <Icon className={styles.default} onClick={this.showCart} type="shopping" />
                            </Badge>
                            <div className={this.state.cartToggle ? styles.minCart : styles.disno}>
                                <Icon className={styles.close} onClick={this.hideToggle} type="close" title="close" />
                                <div className={styles.items}>
                                    <Spin spinning={this.props.state.main.headerLoading}>
                                        {this.props.state.cart.productNum === 0 && <div className={styles.noneCart}>暂无商品</div>}
                                        {this.props.state.cart.productNum > 0 &&
                                            <Fragment>
                                                <div className={styles.mincartTop}>
                                                    <div className={styles.count}>
                                                        <span className={styles.productNum}>{this.props.state.cart.productNum}</span>
                                                        <span className={styles.docOne}>件商品</span>
                                                    </div>
                                                    <div className={styles.title}>
                                                        <span className={styles.docTwo}>购物车小计:</span>
                                                    </div>
                                                    <Link to={'/checkout/cart'} className={styles.edit}>
                                                        <button title="查看和编辑购物车" className={styles.prime + " " + styles.edit} onClick={this.hideToggle}>查看和编辑购物车</button>
                                                    </Link>
                                                </div>
                                                {this.props.state.cart.productInfo.map((item, index) => {
                                                    return <div className={styles.productInCrat} key={index + 'cartproductInfo1231231'}>
                                                        <div className={styles.left}>
                                                            <img src={item.img} />
                                                        </div>
                                                        <div className={styles.right}>
                                                            <div className={styles.productName}>
                                                                <Link to={`/productInfo/` + item.id} onClick={this.hideToggle}>
                                                                    {item.productName}
                                                                </Link>
                                                            </div>
                                                            <div className={styles.controllPrice}>
                                                                <span className={styles.price}>{item.price}</span>
                                                            </div>
                                                            <div className={styles.controllNum}>
                                                                <InputNumber min={1} defaultValue={item.num} value={item.num} onChange={(value) => this.changeNum(item.id, value)} />
                                                                <button title="删除" className={styles.prime + " " + styles.delete} onClick={() => this.onDelete(item.id)}>删除</button>
                                                            </div>
                                                            <span className={styles.id}>{item.id}</span>
                                                        </div>
                                                    </div>
                                                })}
                                            </Fragment>
                                        }
                                    </Spin>
                                </div>

                            </div>
                        </li>
                        <li><Icon className={styles.userIcon} type="environment" /></li>
                        <li>
                            <Icon className={styles.userIcon} onClick={this.showUser} type="user" />
                            <div className={this.state.userToggle ? styles.userAccount : styles.disno}>
                                {!this.props.state.user.loginState && <div className={styles.userAccountNoLogin}>
                                    <Link to={"/account/login"}>
                                        <button className={styles.prime + ' ' + styles.login} onClick={this.hideToggle}>登录</button>
                                    </Link>
                                    <Link to={"/account/register"}>
                                        <button className={styles.prime + ' ' + styles.login} onClick={this.hideToggle}>注册</button>
                                    </Link>
                                </div>
                                }
                                {!!this.props.state.user.loginState && <div className={styles.userAccountLogin}>
                                    <h5>欢迎</h5>
                                    <h5 className={styleMedia.username}>{this.props.state.user.userName}</h5>
                                    <div className={styles.userControllerList}>
                                        <ul>
                                            <li>
                                                <Link to={"/customer/account"}>
                                                    我的账户
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/customer/order"}>
                                                    我的订单
                                            </Link>
                                            </li>
                                            <li>
                                                <Link to={"/customer/booking"}>
                                                    我的预约
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/customer/coupon"}>
                                                    我的优惠券
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/customer/integral"}>
                                                    用户积分
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/customer/subscribe"}>
                                                    订阅
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/customer/bill"}>
                                                    发票设置
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <button className={styles.prime + ' ' + styles.login} onClick={this.signOut}>退出登录</button>
                                </div>}
                            </div>
                        </li>
                        {!this.props.state.user.loginState &&
                            <li>
                                <Icon className={styles.userIcon} onClick={this.showQr} type="qrcode" title="扫码登录" />
                                <div className={this.state.qrToggle ? styles.userAccount : styles.disno}>
                                    <img className={styles.qrcode} src={this.state.uid_img} />
                                    <span className={styleMedia.qrcodeState}>{this.state.scanner}</span>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </Fragment>
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
        changeLoginstate: (data) => { dispatch(Actions.loginstate(data)); },
        changeUsername: (data) => { dispatch(Actions.usernanme(data)); },
        loadingOnHeader: (data) => { dispatch(Actions.loadingHeader(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(UserController));
