import React, { Component, useEffect } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './mask.module.less';

import { Link, withRouter } from 'react-router-dom';

import hp from '../../img/hp.png';

const Drawer = (props) => {
    const className = props.show ? styles.show : styles.hide;

    return (<div id="mask" className={className + ' ' + styles.root} onClick={props.click} ></div >);
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
)(withRouter(classify(styles)(Drawer)));
