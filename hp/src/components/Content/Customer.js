import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import CustomerRouters from '../../router/customerRouters';
import styles from './Customer.module.less';
import { states, changeCrumbs } from '../../fetch/links';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Customer extends Component {
    

    render() {
        const props = this.props;
        return (
            <div className={styles.customer}>
                <Crumbs links={[{
                    link: '/',
                    name: changeCrumbs(props)
                }]} />
                <div className={styles.customerContent}>
                    <div className={styles.left}>
                        <ul>
                            {states.links.map((item, index) => {
                                return <Link key={'qweqweqwe' + index} to={`${props.match.path}/` + item.link}>
                                    <li className={this.props.location.pathname.split('/')[2] === item.link ? styles.active : ''}>
                                        <strong>{item.name}</strong>
                                    </li>
                                </Link>
                            })}
                            <Link to={'/customer/account'}>
                                <li>
                                    <strong>退出</strong>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className={styles.right}>
                        <CustomerRouters prop={props} name={changeCrumbs(props)}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(Customer);
