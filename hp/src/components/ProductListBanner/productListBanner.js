import React, { Component } from 'react';
import Slider from "react-slick";
import classify from '@magento/venia-concept/esm/classify';
import { Link } from 'react-router-dom';
import styles from './productListBanner.module.less';
import './Main.css';
class ProductListBanner extends Component {
    render() {
        var dots = [
            {
                src: "https://media.hpstore.cn/wysiwyg/CN_OLS/whats_new/OMEN20190415MMQ.jpg"
            },
            {
                src: "https://media.hpstore.cn/wysiwyg/CN_OLS/whats_new/IPGM227fdw20190415.jpg"
            },
            {
                src: "https://media.hpstore.cn/wysiwyg/CN_OLS/whats_new/zhan66-20190415mmq.jpg"
            }
        ]
        var settings = {
            customPaging: function (i) {
                return (
                    <div>
                        <img src={dots[i].src} alt="" />
                    </div>
                );
            },
            dots: true,
            dotsClass: "slick-pdots slick-pthumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000
        };
        return (
            <div className={styles.productListBanner + " productListBanner"}>
            <h2>最新产品</h2>
                <Slider {...settings}>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/whats_new/OMEN20190415MMQ.jpg" alt="" />
                        <div className={styles.WordSection}>
                            <p className={styles.title}><span>惠普战66二代高性能轻薄商务本</span></p>
                            <p className={styles.content}><span>惠普战66二代笔记本电脑纤薄、轻巧、坚固的设计为专业人士移动办公提供了强大支持，为中小企业助力！高端模具，180°开合屏幕，随需而变；通过13项严苛军标认证，多重防护，保护数据与屏幕安全。 </span></p>
                            <Link to={'/'}><button className={styles.addToCartButton + " " + styles.prime}>立即购买</button></Link>
                        </div>
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/whats_new/IPGM227fdw20190415.jpg" alt="" />
                        <div className={styles.WordSection}>
                            <p className={styles.title}><span>惠普战66二代高性能轻薄商务本</span></p>
                            <p className={styles.content}><span>惠普战66二代笔记本电脑纤薄、轻巧、坚固的设计为专业人士移动办公提供了强大支持，为中小企业助力！高端模具，180°开合屏幕，随需而变；通过13项严苛军标认证，多重防护，保护数据与屏幕安全。 </span></p>
                            <Link to={'/'}><button className={styles.addToCartButton + " " + styles.prime}>立即购买</button></Link>
                        </div>
                    </div>
                    <div>
                        <img src="https://media.hpstore.cn/wysiwyg/CN_OLS/whats_new/zhan66-20190415mmq.jpg" alt="" />
                        <div className={styles.WordSection}>
                            <p className={styles.title}><span>惠普战66二代高性能轻薄商务本</span></p>
                            <p className={styles.content}><span>惠普战66二代笔记本电脑纤薄、轻巧、坚固的设计为专业人士移动办公提供了强大支持，为中小企业助力！高端模具，180°开合屏幕，随需而变；通过13项严苛军标认证，多重防护，保护数据与屏幕安全。 </span></p>
                            <Link to={'/'}><button className={styles.addToCartButton + " " + styles.prime}>立即购买</button></Link>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}
export default classify(styles)(ProductListBanner);