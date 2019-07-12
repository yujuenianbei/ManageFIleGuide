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
                <div className={styles.menuIcon}>
                    <img src="https://media.hpstore.cn/static/version1559772150/frontend/HPOLS/default/zh_Hans_CN/images/logo.svg" alt="hp" />
                    <div className={styles.leftTitle}><span>HP</span></div>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['9']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>订单管理</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>数据分析</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3">订单分析</Menu.Item>
                        <Menu.Item key="4">产品销量</Menu.Item>
                        <Menu.Item key="5">用户浏览</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>个人信息</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6">用户中心</Menu.Item>
                        <Menu.Item key="8">个人设置</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Link to="/product">
                            <Icon type="team" />
                            <span>产品管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">
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