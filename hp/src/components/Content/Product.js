import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Main.module.less';
import Crumbs from '../Crumbs';
import ProductImg from '../ProductImg';
import ProductDetailInfo from '../ProductDetailInfo'
class Main extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        type: 0,
        productTitle: [
            { "title": "概述" },
            { "title": "产品规格" },
            { "title": "特价" },
            { "title": "推荐产品" },
            { "title": "评论" },
            { "title": "向我们提问" },
        ]
    }
    changeProductDetails = (index) => {
        this.setState({type: index})
    }
    render() {
        return (
            <div className={styles.productInfo}>
                <Crumbs />
                <div className={styles.product}>
                    <div className={styles.productImg}>
                        <h1>惠普暗影精灵4代- 15-dc0006tx 15.6 英寸游戏笔记本电脑</h1>
                        <ProductImg />
                    </div>
                    <div className={styles.productDetailInfo}>
                        <ProductDetailInfo />
                    </div>
                </div>
                <div className={styles.productDetail}>
                    <div className={styles.productDetailHeader}>
                        <ul>
                            {this.state.productTitle.map((item, index) => {
                                return <li key={index} onClick={() => this.changeProductDetails(index)}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.productDetailContent}>

                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(Main);