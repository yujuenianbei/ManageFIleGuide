import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl, Route } from '@magento/venia-concept/esm/drivers';
import styles from './NavHeader.module.less';
// import Icon from '@material-ui/core/Icon';

class NavHeader extends Component {
    render() {
        return (
            <Fragment>
                <ul className={styles.navHeader}>
                    <li>
                        <span>企业解决方案</span>
                        <div className={styles.menu}>
                        企业解决方案
                        </div>
                    </li>
                    <li>
                        <span>笔记本及平板</span>
                        <div className={styles.menu}>
                        笔记本及平板
                        </div>
                    </li>
                    <li>
                        <span>台式及一体机</span>
                        <div className={styles.menu}>
                        台式及一体机
                        </div>
                    </li>
                    <li>
                        <span>打印机</span>
                        <div className={styles.menu}>
                        打印机
                        </div>
                    </li>
                    <li>
                        <span>硒鼓和墨盒</span>
                        <div className={styles.menu}>
                        硒鼓和墨盒
                        </div>
                    </li>
                    <li>
                        <span>显示屏</span>
                        <div className={styles.menu}>
                        显示屏
                        </div>
                    </li>
                    <li>
                        <span>配件</span>
                        <div className={styles.menu}>
                        配件
                        </div>
                    </li>
                    <li>
                        <span>优惠销售</span>
                        <div className={styles.menu}>
                        优惠销售
                        </div>
                    </li>
                    <li>
                        <span>产品支援</span>
                        <div className={styles.menu}>
                        产品支援
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}
export default classify(styles)(NavHeader);