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
                        <Link to="/order">
                            <Icon type="desktop" />
                            <span>订单管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/cart">
                            <Icon type="desktop" />
                            <span>购物车管理</span>
                        </Link>
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
                        <Menu.Item key="4">订单分析</Menu.Item>
                        <Menu.Item key="5">产品销量</Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/cartchart">
                                <Icon type="team" />
                                <span>购物车</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">用户浏览</Menu.Item>
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
                        <Menu.Item key="8">用户中心</Menu.Item>
                        <Menu.Item key="9">个人设置</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="10">
                        <Link to="/product">
                            <Icon type="team" />
                            <span>产品管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link to="/productType">
                            <Icon type="team" />
                            <span>产品分类管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Link to="/frontUser">
                            <Icon type="team" />
                            <span>前台用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="13">
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