import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
// import { Icon } from '@material-ui/core';
import styles from './footer.module.less';
import FooterContract from './footerContact'

class FooterLinks extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.links}>
                    <ul className={styles.links_ul}>
                        <div className={styles.footer_links}>
                            <div className={styles.block_title}>
                                <strong>购买产品</strong>
                            </div>
                            <ul>
                                <li><a href="https://www.hpstore.cn/laptops-tablets.html">笔记本及平板</a></li>
                                <li><a href="https://www.hpstore.cn/desktops.html">台式及一体机</a></li>
                                <li><a href="https://www.hpstore.cn/printers.html">打印机</a></li>
                                <li><a href="https://www.hpstore.cn/ink-toner.html">硒鼓和墨盒</a></li>
                                <li><a href="https://www.hpstore.cn/monitors.html">显示屏</a></li>
                                <li><a href="https://www.hpstore.cn/accessories.html">配件</a></li>
                                <li><a href="https://support.hp.com/cn-zh/" target="_blank" rel="noopener noreferrer">支持</a></li>
                                <li><a href="https://www.hpstore.cn/promotion/offer">最新优惠</a></li>
                                <li><a href="https://www.hpstore.cn/latest-products.html">最新产品</a></li>
                            </ul>
                        </div>
                        <div className={styles.footer_links}>
                            <div className={styles.block_title}>
                                <strong>客户服务</strong>
                            </div>
                            <ul>
                                <li><a href="http://www8.hp.com/cn/zh/hp-information/index.html">关于我们</a></li>
                                <li><a href="https://support.hp.com/cn-zh/" target="_blank" rel="noopener noreferrer">技术支持</a></li>
                                <li><a href="https://support.hp.com/cn-zh/drivers" target="_blank" rel="noopener noreferrer">软件驱动程序</a></li>
                                <li><a href="https://www.hpstore.cn/shipping-policies/">条款条件</a></li>
                                <li><a href="https://www.hpstore.cn/helper/">帮助中心</a></li>
                                <li><a href="https://www.hpstore.cn/contact/index/index/">联系我们</a></li>
                                <li><a href="https://www.hpstore.cn/contact-us/" target="_blank" rel="noopener noreferrer">反馈投诉</a></li>
                            </ul>
                        </div>
                        <div className={styles.footer_links}>
                            <div className={styles.block_title}>
                                <strong>我的惠普</strong>
                            </div>
                            <ul>
                                <li><a href="https://www.hpstore.cn/customer/account/edit">我的帐户</a></li>
                                <li><a href="https://www.hpstore.cn/sales/guest/form">我的订单</a></li>
                                <li><a href="https://www.hpstore.cn/reward/customer/info/">我的积分</a></li>
                                <li><a href="https://www.hpstore.cn/click-n-collect">零售网点</a></li>
                                <li><a href="https://www.hpstore.cn/buying-guides">购买指南</a></li>
                            </ul>
                        </div >
                        <div className={styles.footer_links}>
                            <div className={styles.block_title}>
                                <strong>专项计划</strong>
                            </div>
                            <ul>
                                <li><a href="https://epp.hpstore.cn/" target="_blank" rel="noopener noreferrer">HP员工计划</a></li>
                                <li><a href="https://smbclub.hpstore.cn" target="_blank" rel="noopener noreferrer">企业会员</a></li>
                                <li><a href={null} target="_blank" rel="noopener noreferrer">公司员工计划</a></li>
                                <li><a href={null} target="_blank" rel="noopener noreferrer">原始奖励计划</a></li>
                            </ul >
                        </div >
                    </ul>
                    <FooterContract />
                </div >
            </Fragment>
        );
    }
}
export default classify(styles)(FooterLinks);