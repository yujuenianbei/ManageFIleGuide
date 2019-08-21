import React, { Component } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './header.module.less';
import { Drawer, List, NavBar, Icon, Carousel, WingBlank, Grid, Popover } from 'antd-mobile';
import Router from '../../router/detailRouter';
import { Link, withRouter } from 'react-router-dom';
// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faBars } from '@fortawesome/fontawesome-free-solid';
import hp from '../../img/hp.png';
class Header extends Component {
    render() {
        const {drawer} = this.props;
        return (<div className={styles.header}>
            <div className={styles.headerContent}>
                <span className={styles.Icon} onClick={drawer}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <Link to={'/home'}>
                    <img className="header-logo" src={hp} height="36" alt="Venia" title="Venia" />
                </Link>
                <span className={styles.Icon}>
                    <FontAwesomeIcon icon={faUserAlt} />
                </span>
            </div>
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
)(withRouter(classify(styles)(Header)));
