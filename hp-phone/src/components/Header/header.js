import React, { Component } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './header.module.less';
import './header.css'
import { Drawer, List, NavBar, Icon, Carousel, WingBlank, Grid, Popover } from 'antd-mobile';
import Router from '../../router/detailRouter';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/fontawesome-free-solid'

import Main from '../Main'

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class Header extends Component {
    state = {
        visible: false,
        selected: '',
        open: false,
    }
    onSelect = (opt) => {
        console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    onOpenChange = (...args) => {
        // console.log(args);
        this.setState({ open: !this.state.open });
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

        return (<div>
            <NavBar
                icon={<Icon type="ellipsis" onClick={this.onOpenChange} />}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Popover
                        mask={false}
                        overlayClassName="fortest"
                        overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        overlay={[
                            (
                                <Link to='/login'>
                                    <Item key="4" value="login" icon={<FontAwesomeIcon icon={faUserAlt} />}>
                                        <span>登录</span>
                                    </Item>
                                </Link>
                            )
                        ]}
                        align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                        }}
                        onSelect={this.onSelect}
                    >
                        <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>,
                ]}
            >HP</NavBar>
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight - 45 }}
                enableDragHandle
                contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
                sidebar={sidebar}
                touch={false}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
                <Router />
                <Main />
            </Drawer>
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
