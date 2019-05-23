import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
// import { Icon } from '@material-ui/core';
import { Icon } from 'antd';
import styles from './footer.module.less';

class FooterContract extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.contract}>
                    <div className={styles.block_title}>
                        <strong>保持联系</strong>
                    </div>
                    <div className={styles.share}>
                        <ul>
                            <li>
                                <a title="惠普电脑微博" target="_blank" href="https://www.weibo.com/hppsg" rel="noopener noreferrer">
                                    <Icon className={styles.icon} type="weibo-square" />
                                </a>
                            </li>
                            <li>
                                <a title="惠普打印微博" target="_blank" href="https://www.weibo.com/hpprint" rel="noopener noreferrer">
                                    <Icon className={styles.icon} type="weibo-square" />
                                </a>
                            </li>
                            <li>
                                <a title="惠普中国优酷" target="_blank" href="http://i.youku.com/hpsupportchina" rel="noopener noreferrer">
                                    <Icon className={styles.icon} type="youtube" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.block_title}>
                        <strong>订阅我们的资讯:</strong>
                    </div>
                    <div className={styles.block_title}>
                        <input className={styles.input} name="email" type="email" placeholder="输入你的电子邮箱地址" />
                    </div>
                    <div className={styles.block_title}>
                        <button title="订阅" className={styles.prime + " " + styles.subscribe}>订阅</button>
                    </div>
                </div >
            </Fragment>
        );
    }
}
export default classify(styles)(FooterContract);