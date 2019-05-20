import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListInfoDetail.module.less';
class ProductInfoDetail extends Component {
    addToCart = () => {
        console.log(this.props.state.cart.productNum)
        const product = {
            id: this.props.id,
            img: this.props.img,
            productName: this.props.productName,
            promotionMessage: this.props.promotionMessage,
            price: this.props.nowPrice,
            num: 1
        }
        if (this.props.state.cart.productInfo.length === 0) {
            this.props.addProductInCart([product]);
        } else {
            let productInfo = Object.assign([], this.props.state.cart.productInfo);
            const num = productInfo.findIndex((v, index) => {
                return product.id === v.id
            })
            if(num === -1){
                productInfo.push(product);
                this.props.addProductInCart(productInfo);
            } else {
                ++productInfo[num].num;
                console.log(productInfo, productInfo[num].num);
                this.props.addProductInCart(productInfo)
            }
        }
        this.props.addProductNumInCart(this.props.state.cart.productNum + 1);
    }
    render() {
        return (
            <div className={styles.productInfo}>
                <div className={styles.productImg}>
                    {/* <Link to={{ pathname: '/productInfo',state:{ day: 'Friday' }}}> */}
                    <Link to={this.props.link}>
                        <img src={this.props.img} alt={this.props.productName}/>
                    </Link>
                </div>
                <div className={styles.productInfo_details}>
                    <div className={styles.product_review_rating}></div>
                    <div className={styles.product_item_name} title={this.props.productName}>
                        {this.props.productName}
                    </div>
                    <div className={styles.product_promotion_message}>{this.props.promotionMessage}</div>
                    <div className={styles.product_desc_features}>
                        <ul>
                            {this.props.featrues.map((item, index) => {
                                return <li key={index + 'features_asqewq'}>{item}</li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.promotion_message_secondly}>{this.props.promotionMessageSecond}</div>
                </div>
                <div className={styles.price}>
                    <span className={styles.used_price}>￥ {this.props.usedPrice}</span><br />
                    <span className={styles.now_price}>￥ {this.props.nowPrice}</span>
                </div>
                <div className={styles.discount}>
                    <span className={styles.price_label_title}>节省了: </span>
                    <span className={styles.dec_price}>￥ {this.props.usedPrice-this.props.nowPrice} ({Math.floor((this.props.usedPrice-this.props.nowPrice)/this.props.usedPrice*100)}%)</span>
                </div>
                <div className={styles.addToCart}>
                    <button className={styles.addToCartButton + " " + styles.prime} onClick={this.addToCart}>添加到购物车</button>
                </div>
                <div className={styles.compare}>
                    <span>比较</span><input type="checkbox" name="category" value="1" />
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
)(classify(styles)(ProductInfoDetail));