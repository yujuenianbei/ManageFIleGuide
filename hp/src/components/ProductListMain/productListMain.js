import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListMain.module.less';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProductInfo from '../ProductListInfo/index'
class ProductListMain extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ul>
                    <li>
                        <Link to={'/'}>
                            <img className={styles.productAdds} src="https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/laptop001-20190319mmq.jpg"></img>
                        </Link>
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
export default classify(classify)(ProductListMain);