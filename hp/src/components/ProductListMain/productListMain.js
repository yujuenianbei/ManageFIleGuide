import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
import styles from './productListMain.module.less';
import { Icon } from '@material-ui/core';
import ProductInfo from '../ProductInfo/index'
class ProductListMain extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ul>
                    <li>
                        <img className={styles.productAdds} src="https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/laptop001-20190319mmq.jpg"></img>
                    </li>
                    <li>
                        <ProductInfo />
                    </li>
                    <li>
                        <ProductInfo />
                    </li>
                    <li>
                        <ProductInfo />
                    </li>
                    <li>
                        <ProductInfo />
                    </li>
                </ul>
            </div>
        );
    }
}
export default classify()(ProductListMain);