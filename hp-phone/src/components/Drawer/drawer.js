import React, { Component, useEffect } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './drawer.module.less';

import { Link, withRouter } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';

import { Close, ArrowBack } from '@material-ui/icons';

const Drawer = (props) => {
    const { direct, header, show, drawer, headerContent, style } = props;
    let className;
    if (direct === 'left') {
        className = show ? styles.leftshow : styles.lefthide;
    } else if (direct === 'right') {
        className = show ? styles.rightshow : styles.righthide;
    }

    return (<div className={className + ' ' + styles.root} style={style} >
        {header &&
            <div className={styles.header}>
                <button className={styles.headerBtn}>
                    <span>
                        <ArrowBack onClick={drawer}></ArrowBack>
                    </span>
                </button>
                <span>{headerContent}</span>
                <button className={styles.headerBtn}>
                    <span>
                        <Close onClick={drawer}></Close>
                    </span>
                </button>
            </div>
        }
        <div>
            1231
            123
            12
            312
            31
            231
            23
            21
            312
            3
        </div>
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
