import React, { Component } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './drawer.module.less';

import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/fontawesome-free-solid';

import hp from '../../img/hp.png';

const Drawer = (props) => {
    console.log(props.show)
    const className = props.show ? styles.show : styles.hide;
    return (<div className={className + ' ' + styles.root} >
        <FontAwesomeIcon icon={faUserAlt} onClick = { props.drawer } />
    </div >);
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
