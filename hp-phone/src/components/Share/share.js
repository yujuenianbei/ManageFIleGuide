import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './share.module.less';

import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeixin } from '@fortawesome/fontawesome-free-brands'

const Sharer = (props) => {
    const { show } = props;
    return (<Fragment>
        <div className={styles.share} style={{ bottom: show ? '0px' : '-100px' }} >
            <div className={styles.shareContent}>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
                <span className={styles.wx + ' ' + styles.shareIcon}>
                    <FontAwesomeIcon icon={faWeixin} />
                </span>
            </div>
        </div>
    </Fragment>)
}
const mapStateToProps = (state) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(classify(styles)(Sharer)));