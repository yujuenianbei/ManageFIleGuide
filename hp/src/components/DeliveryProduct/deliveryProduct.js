import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './deliveryProduct.module.less';
import { Link } from 'react-router-dom';
class DeliveryProduct extends Component {
    render() {
        const item = this.props.items;
        return (
            <div className={styles.deliveryProduct}>
                <div className={styles.productImg}>
                    <img src={item.img} alt="" />
                </div>
                <div className={styles.price}>
                    <span>￥{item.nowPrice}</span>
                </div>
                <div className={styles.num}>
                    <span>x {item.num}</span>
                </div>
                <div className={styles.productInfo}>
                    <Link to="/">
                        {item.productName} 
                    </Link>
                    <p><span>(商品编码：{item.id})</span><span>有货</span></p>
                    <p className={styles.message}>{item.promotionMessage}</p>
                </div>
            </div>
        );
    }
}
export default classify(styles)(DeliveryProduct);