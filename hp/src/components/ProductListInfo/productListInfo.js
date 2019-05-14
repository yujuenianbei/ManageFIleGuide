import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListInfo.module.less';
class ProductInfo extends Component {
    render() {
        return (
            <div className={styles.productInfo}>
                <div className={styles.productImg}>
                    {/* <Link to={{ pathname: '/productInfo',state:{ day: 'Friday' }}}> */}
                    <Link to={`/productInfo/`+ 2313213}>
                        <img src="https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/6/K/6KL73PA-1_T1552906332.png" />
                    </Link>
                </div>
                <div className={styles.productInfo_details}>
                    <div className={styles.product_review_rating}></div>
                    <div className={styles.product_item_name}>
                        惠普（HP）暗影精灵4代 OMEN Laptop 15-dc0153TX 15.6英寸游戏笔记本电脑  (i5-8300H 8G 512G GTX1050Ti 4G独显 IPS FHD）
                    </div>
                    <div className={styles.product_promotion_message}>日常销售价6199抢购价5799</div>
                    <div className={styles.product_desc_features}>
                        <ul>
                            <li>第八代英特尔® 酷睿™ i5处理器</li>
                            <li>Windows 10 家庭版 64</li>
                            <li>512 GB PCIe® NVMe™ M.2 SSD</li>
                            <li>8 GB DDR4-2666 SDRAM</li>
                            <li>NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）</li>
                            <li>15.6 英寸（对角）WLED 背光 FHD IPS 防眩光超窄边框显示屏 (1920 x 1080)</li>
                        </ul>
                    </div>
                    <div className={styles.promotion_message_secondly}>5月10日11点-5月11日11点，限时抢购使用优惠券:Flashsale201905106KL73PA400，数量有限，售完即止，不与其他优惠同享！</div>
                </div>
                <div className={styles.price}>
                    <span className={styles.used_price}>￥ 6599</span><br />
                    <span className={styles.now_price}>￥ 6199</span>
                </div>
                <div className={styles.discount}>
                    <span className={styles.price_label_title}>节省了: </span>
                    <span className={styles.dec_price}>￥ 400 (6%)</span>
                </div>
                <div className={styles.addToCart}>
                    <button className={styles.addToCartButton + " " + styles.prime}>添加到购物车</button>
                </div>
                <div className={styles.compare}>
                    <span>比较</span><input type="checkbox" name="category" value="１" />
                </div>

            </div>
        );
    }
}
export default classify(styles)(ProductInfo);