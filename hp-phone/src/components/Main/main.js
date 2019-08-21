import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './main.module.less';
import './main.css'
import { List, NavBar, Icon, Carousel, WingBlank, Grid, Popover } from 'antd-mobile';
import Router from '../../router/detailRouter';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/fontawesome-free-solid'

import { Route } from 'react-router-dom';
import Header from '../Header';
import Mask from '../Mask';
import Drawer from '../Drawer';
import FooterNav from '../FooterNav';

import Home from '../Home';
import Classify from '../Classify';
import Cart from '../Cart';
import User from '../User';

class Main extends Component {
    state = {
        visible: false,
        selected: '',
        open: false,
        drawerVisible: false,
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    onOpenChange = (...args) => {
        // console.log(args);
        this.setState({ open: !this.state.open });
    }
    toggleDrawer = () => {
        this.setState({ drawerVisible: !this.state.drawerVisible })
    }

    render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                        multipleLine
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);
        const { location } = this.props;
        return (<Fragment>
            <Header drawer={this.toggleDrawer} />
            <Drawer drawer={this.toggleDrawer} show={this.state.drawerVisible} />
            <Mask drawer={this.toggleDrawer} show={this.state.drawerVisible} />
            <div className={styles.main}>
                <Route path='/home' component={Home} />
                <Route path='/classify' component={Classify} />
                <Route path='/cart' component={Cart} />
                <Route path='/user' component={User} />
                <FooterNav location={location} />
            </div>
        </Fragment>);
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
)(withRouter(classify(styles)(Main)));
