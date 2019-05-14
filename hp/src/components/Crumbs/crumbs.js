import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './crumbs.module.less';
import { Link } from 'react-router-dom';
class Crumbs extends Component {
    render() {
        return (
            <div className={styles.crumbs}>
                <ul>
                    <li>
                        <Link to={'/'}>
                            <span>首页</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'}>
                            <span>家用</span>
                        </Link>
                    </li>
                    <li>
                        <span>惠普暗影精灵4代- 15-dc0006tx 15.6 英寸游戏笔记本电脑</span>
                    </li>
                </ul>
            </div>
        );
    }
}
export default classify(styles)(Crumbs);