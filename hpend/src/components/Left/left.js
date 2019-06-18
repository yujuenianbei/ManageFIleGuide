import React, { PureComponent } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';

// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import { Link } from 'react-router-dom';
import styles from './left.module.less';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Left extends PureComponent {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>Option 2</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>User</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Team</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Link to="/account">
                            <Icon type="team" />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state
    };
};
export default connect(
    mapStateToProps,
)(classify(styles)(Left));