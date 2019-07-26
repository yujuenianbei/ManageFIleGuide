import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListInfo.module.less';
class ProductInfo extends Component {
    postCart = (productNum) => {
        var query = `mutation addToCart($userId: Int,$productId: Int, $productNum : Int){
            addToCart(userId: $userId,productId: $productId,productNum: $productNum){
                productId
                productNum
            } 
          }`;
        fetch('http://localhost:3004/graphql', {
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
                    "userId": parseInt(localStorage.getItem('id')),
                    "productId": this.props.id,
                    "productNum": productNum
                }
            })
        })
            .then(r => r.json())
            .then(result => {
                console.log(result);
                this.props.loadingOnHeader(false);
            });
    }
    addToCart = () => {
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
            this.props.loadingOnHeader(true)
            this.postCart(product.num);
        } else {
            var productNum;
            let productInfo = Object.assign([], this.props.state.cart.productInfo);
            const num = productInfo.findIndex((v, index) => {
                return product.id === v.id
            })
            if (num === -1) {
                productInfo.push(product);
                productNum = product.num;
                this.props.addProductInCart(productInfo);
            } else {
                ++productInfo[num].num;
                productNum = productInfo[num].num
                this.props.addProductInCart(productInfo)
            }
            this.props.loadingOnHeader(true);
            this.postCart(productNum);
        }
        this.props.addProductNumInCart(this.props.state.cart.productNum + 1);
    }
    render() {
        return (
            <div className={styles.productInfo}>
                <div className={styles.productImg}>
                    <Link to={'/productInfo/' + this.props.id}>
                        <img src={this.props.img} alt={this.props.productName} />
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
                            {JSON.parse(this.props.features).map((item, index) => {
                                return <li key={index + 'features'}>{item}</li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.promotion_message_secondly}>{this.props.promotionMessageSecond}</div>
                </div>
                <div className={styles.price}>
                    <span className={styles.used_price}>{this.props.usedPrice && '￥ ' + this.props.usedPrice}</span><br />
                    <span className={styles.now_price}>￥ {this.props.nowPrice}</span>
                </div>
                <div className={styles.discount}>
                    <span className={styles.price_label_title}>{this.props.usedPrice && "节省了:"}</span>
                    <span className={styles.dec_price}>{this.props.usedPrice &&
                        <span>￥ {this.props.usedPrice - this.props.nowPrice} ({(Math.floor((this.props.usedPrice - this.props.nowPrice) / this.props.usedPrice * 100))}%)</span>
                    }</span>
                </div>
                <div className={styles.addToCart}>
                    <button className={styles.addToCartButton + " " + styles.prime} onClick={this.addToCart}>添加到购物车</button>
                </div>
                <div className={styles.compare}>
                    <span>比较</span><input type="checkbox" name="category" value="１" />
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ProductInfo));