import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productDetailInfo.module.less';
import Icon from '@material-ui/core/Icon';
import SelectCity from '../SelectCity';
class ProductDetailInfo extends Component {
    render() {
        const spreadPrice = this.props.state.product.productUsedPrice - this.props.state.product.productNowPrice;
        const spreadPricePercent = ((this.props.state.product.productUsedPrice - this.props.state.product.productNowPrice)* 100 /this.props.state.product.productUsedPrice).toFixed(0)
        return (
            <Fragment>
                <div className={styles.productDetailInfo_ad}>
                    <Link to={'/'}>
                        <img src="https://adbutler-fermion.com/getad.img/;libID=628417" alt="" />
                    </Link>
                </div>
                <div className={styles.productSelectInfo}>
                    <div className={styles.productSelect}>
                        <select>
                            <option value="1">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                            <option value="2">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                            <option value="3">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                            <option value="4">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                            <option value="5">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                            <option value="6">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                            <option value="7">Windows 10 家庭版/i5/8G/1TB+128GB【GeForce® GTX1050Ti 4G独显】双硬盘</option>
                        </select>
                    </div>
                    <div className={styles.productFeature}>
                        <ul>
                            <li>
                                <Icon className={styles.productIcon}>search</Icon><br />
                                <span className={styles.productIconName}>Intel Core i5</span>
                            </li>
                            <li>
                                <Icon className={styles.productIcon}>search</Icon><br />
                                <span className={styles.productIconName}> Windows 10 Home 64</span>
                            </li>
                            <li>
                                <Icon className={styles.productIcon}>search</Icon><br />
                                <span className={styles.productIconName}>1 TB SATA 硬盘 (7200 rpm)</span>
                            </li>
                            <li>
                                <Icon className={styles.productIcon}>search</Icon><br />
                                <span className={styles.productIconName}>15.6</span>
                            </li>
                            <li>
                                <Icon className={styles.productIcon}>search</Icon><br />
                                <span className={styles.productIconName}>NVIDIA GeForce</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.cost}>
                    <div className={styles.suggest}>
                        <span className={styles.suggestCost}>厂商指导价 <span className={styles.usedSuggestCost}>￥ {this.props.state.product.productUsedPrice}</span></span>
                        <span className={styles.nowCost}>￥{this.props.state.product.productNowPrice}</span>
                    </div>
                    <div className={styles.dis}>
                        <span className={styles.disCost}>节省了: <span className={styles.disCostMoney}>￥ {spreadPrice} ({spreadPricePercent}%)</span></span>
                    </div>
                    <button className={styles.addToCartButton + " " + styles.prime}>添加到购物车</button>
                </div>
                <div className={styles.pincode}>
                    <div className={styles.pincodeTitle}>
                        <span>产品库存</span>
                        <Icon className={styles.pincodeIcon}>search</Icon><br />
                    </div>
                    <div className={styles.pincodeContent}>
                        <div className={styles.pincodeCity}>
                            <SelectCity />
                        </div>
                        <div className={styles.pincodeReslut}>
                            <div className={styles.pincodeReslutProduct}>有货</div>
                            <span className={styles.pincodeDays}>23:00前下单，预计<b>明天(05月15日)</b></span>
                        </div>
                    </div>
                </div>
                <div className={styles.compare}>
                    <input type="checkbox" name="category" value="１" />
                    <span>比较</span>
                </div>
                <div className={styles.productSell}>
                     <p>{this.props.state.product.productPromotionMessageSecond}</p>
                     <span>因为专注，所以优异</span>
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
        // changeProductImg: (data) => { dispatch(Actions.productImg(data)); },
        // changeProductName: (data) => { dispatch(Actions.productName(data)); },
        // changeProductFeatrues: (data) => { dispatch(Actions.productFeatrues(data)); },
        // changeProductPromotionMessage: (data) => { dispatch(Actions.productPromotionMessage(data)); },
        // changeProductPromotionMessageSecond: (data) => { dispatch(Actions.productPromotionMessageSecond(data)); },
        // changeProductUsedPrice: (data) => { dispatch(Actions.productUsedPrice(data)); },
        // changeProductNowPrice: (data) => { dispatch(Actions.productNowPrice(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ProductDetailInfo));