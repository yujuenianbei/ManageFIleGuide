import React, { Component } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './loading.module.less';

import { Link, withRouter } from 'react-router-dom';

import hp from '../../img/hp.png';

class Loading extends Component {
    render() {
        return (<div className={styles.root}>
            <img
                className={styles.indicator}
                src={hp}
                width="64"
                height="64"
                alt="Loading indicator"
            />
            <span className={styles.message}>{'Fetching Data'}</span>
        </div>);
    }
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
)(withRouter(classify(styles)(Loading)));
