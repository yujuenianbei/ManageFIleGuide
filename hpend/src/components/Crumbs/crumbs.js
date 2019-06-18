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
                            <span title="首页">首页</span>
                        </Link>
                    </li>
                    {this.props.links.map((item, index) => {
                        if (index < this.props.links.length -1) {
                            return <li key={index + 'Crumbs_links_sdazxad'}>
                                <Link to={item.link}>
                                    <span title={item.name}>{item.name}</span>
                                </Link>
                            </li>
                        } else {
                            return <li key={index + 'Crumbs_links_asdqwex'}>
                                    <span title={item.name}>{item.name}</span>
                                </li>
                        }
                    })}
                </ul>
            </div>
        );
    }
}
export default classify(styles)(Crumbs);