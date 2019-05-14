import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
import Slider from "react-slick";
import ProductListMain from '../ProductListMain/index'
import ProductListBanner from '../ProductListBanner/index'
import styles from './Main.module.less';
import { Icon } from '@material-ui/core';
import './Main.css';
class Main extends Component {
    render() {
        var dots = [
            {
                title: "PAVILION星系列"
            },
            {
                title: "星14微边框轻薄本"
            },
            {
                title: "战66二代"
            },
            {
                title: "暗影精灵4代游戏本"
            },
        ]
        var settings = {
            customPaging: function (i) {
                return (
                    <a>
                        {dots[i].title}
                    </a>
                );
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000
        };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/pavilon_0219_pc_nx.jpg" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/XINGPC-20190508.jpg" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/BannerZHAN66-20190426PC.jpg" />
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/20190403_nx.jpg" />
                    </div>
                </Slider>
                <div className={styles.commonadds}>
                    <ul className={styles.topStaticAdds}>
                        <li>
                            <a>
                                <img src="https://adbutler-fermion.com/getad.img/;libID=653547"></img>
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="https://adbutler-fermion.com/getad.img/;libID=653547"></img>
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="https://adbutler-fermion.com/getad.img/;libID=653547"></img>
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="https://adbutler-fermion.com/getad.img/;libID=653547"></img>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.promiseing}>
                    <ul className={styles.promise_ul}>
                        <li>
                            <Icon className={styles.promise_icon}>search</Icon>
                            <h4>专属客服</h4><br />
                            <span className={styles.promise_info}>致电 <a href="tel:400-820-1015">400-820-1015</a></span>
                        </li>
                        <li>
                            <Icon className={styles.promise_icon}>search</Icon>
                            <h4>极速发货</h4><br />
                            <span className={styles.promise_info}>多仓直发</span>
                        </li>
                        <li>
                            <Icon className={styles.promise_icon}>search</Icon>
                            <h4>快捷支付</h4><br />
                            <span className={styles.promise_info}>多种支付方式</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.productContent}>
                    <div className={styles.productList}>
                        <h2>特色产品</h2>
                        <ProductListMain />
                        <ProductListMain />
                        <ProductListMain />
                        <ProductListMain />
                    </div>
                </div>
                <div className={styles.product}>
                    <ProductListBanner />
                </div>
            </div>
        );
    }
}
export default classify()(Main);