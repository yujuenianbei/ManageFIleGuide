import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './UserController.module.less';
import { Link } from 'react-router-dom';
// import Icon from '@material-ui/core/Icon';
import { Badge, Icon, InputNumber } from 'antd';

class UserController extends PureComponent {
    state = {
        cartToggle: false,
        userToggle: false,
    }
    showCart = () => {
        this.setState({ cartToggle: !this.state.cartToggle })
    }
    showUser = () => {
        this.setState({ userToggle: !this.state.userToggle })
    }
    changeNum = (id, value) => {
        const productList = Object.assign([], this.props.state.cart.productInfo);
        let num = 0;
        productList.map((item, index) => {
            if (item.id === id) {
                item.num = value;
            }
            num += item.num
        })
        this.props.addProductNumInCart(num);
        this.props.addProductInCart(productList)
    }
    onDelete = (id) => {
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
                                <div className={styles.items}>
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
                                                <button title="查看和编辑购物车" className={styles.prime + " " + styles.edit}>查看和编辑购物车</button>
                                            </div>
                                            {this.props.state.cart.productInfo.map((item, index) => {
                                                return <div className={styles.productInCrat} key={index + 'cartproductInfo1231231'}>
                                                    <div className={styles.left}>
                                                        <img src={item.img} />
                                                    </div>
                                                    <div className={styles.right}>
                                                        <div className={styles.productName}>
                                                            <Link to={`/productInfo/` + item.id}>
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
                                </div>

                            </div>
                        </li>
                        <li><Icon className={styles.userIcon} type="environment" /></li>
                        <li>
                            <Link to={"/account/login"}>
                                <Icon className={styles.userIcon} onClick={this.showUser} type="user" />
                            </Link>
                        </li>
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(UserController));