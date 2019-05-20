import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './headerInt.module.less';

class Footer extends Component {
    render() {
        return (
            <div className={styles.headerint}>

            </div>
        );
    }
}
export default classify(styles)(Footer);