import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';
// import { Link } from '@magento/venia-concept/esm/drivers';
import { Link } from 'react-router-dom';
import SerchInput from './SearchInput';
import NavHeader from './NavHeader';
import UserController from './UserController';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './header.module.less';

class Header extends PureComponent {
    render() {
        // const { searchOpen, classes, toggleSearch } = this.props;
        return (
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <Link to={'/'}>
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