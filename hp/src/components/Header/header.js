import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';
import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
import SerchInput from './SearchInput';
import NavHeader from './NavHeader';
import UserController from './UserController';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './header.module.less';

class Header extends Component {
    render() {
        // const { searchOpen, classes, toggleSearch } = this.props;
        return (
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <Link to={resourceUrl('/')}>
                            <img className={styles.logoImg} src="https://media.hpstore.cn/static/version1556143026/frontend/HPOLS/default/zh_Hans_CN/images/logo.svg" alt="HP"/>
                        </Link>
                    </div>
                    <div className={styles.content}>
                        <SerchInput />
                    </div>
                    <div className={styles.content}>
                        <NavHeader />
                        <UserController />
                    </div>
                </div>
            </header>
        );
    }
}
export default classify(styles)(Header);