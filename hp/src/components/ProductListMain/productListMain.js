import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListMain.module.less';
// import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProductInfo from '../ProductListInfo/index'
import Data from '../../data/main'
class ProductListMain extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ul>
                    <li>
                        <Link to={'/'}>
                            <img className={styles.productAdds} src="https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/laptop001-20190319mmq.jpg" alt=""></img>
                        </Link>
                    </li>
                    {Data.productListInfoOne.map((item, index) => {
                        return <li key={index + "mainProductListInfoOne"}>
                            <ProductInfo
                                id={item.id}
                                link={item.link}
                                img={item.img}
                                productName={item.productName}
                                promotionMessage={item.promotionMessage}
                                featrues={item.featrues}
                                promotionMessageSecond={item.promotionMessageSecond}
                                usedPrice={item.usedPrice}
                                nowPrice={item.nowPrice}
                            />
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}
export default classify(classify)(ProductListMain);