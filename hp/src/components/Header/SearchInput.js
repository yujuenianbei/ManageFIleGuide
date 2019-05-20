import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl, Route } from '@magento/venia-concept/esm/drivers';
import styles from './header.module.less';
import Icon from '@material-ui/core/Icon';

class SearchInput extends Component {
    render() {
        return (
            <div className={styles.search}>
                <input className={styles.searchinput} />
                <Icon className={styles.searchIcon}>search</Icon>
                <a className={styles.telephone} href="tel:400-820-1015">400-820-1015</a>
            </div>
        );
    }
}
export default classify(styles)(SearchInput);