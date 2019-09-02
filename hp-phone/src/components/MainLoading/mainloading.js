import React, { Component, Fragment } from 'react';
// import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
// import { connect } from 'react-redux';
import styles from './mainloading.module.less';
// import { Link, withRouter } from 'react-router-dom';

import hp from '../../img/hp.png';
class MainLoading extends Component {
    render() {
        return (<div className={styles.MainLoading}>
            <div className={styles.loading}>
                <img
                    className={styles.indicator}
                    src={hp}
                    width="64"
                    height="64"
                    alt="Loading indicator"
                />
                <span className={styles.message}>{'Loading...'}</span>
            </div>
        </div>);
    }
}
export default classify(styles)(MainLoading);
