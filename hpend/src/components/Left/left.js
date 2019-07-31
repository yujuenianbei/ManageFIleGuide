import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';
// 控制跳转
import { withRouter } from "react-router-dom";
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import { Link } from 'react-router-dom';
import styles from './left.module.less';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Left extends PureComponent {
    rootSubmenuKeys = []
    state = {
        collapsed: false,
        openKeys: [],
        list: [
            {
                key: "1",
                title: "首页",
                icon: "pie-chart",
                path: "/"
            },
            {
                key: "2",
                title: "订单管理",
                icon: "desktop",
                path: "/order"
            },
            {
                key: "3",
                title: "购物车管理",
                icon: "desktop",
                path: "/cart"
            },
            {
                key: "4",
                title: "数据分析",
                icon: "user",
                path: "/catalogProduct",
                children: [
                    {
                        key: "5",
                        title: "订单分析",
                        icon: "desktop",
                        path: "/cart1"
                    }, {
                        key: "6",
                        title: "产品销量",
                        icon: "desktop",
                        path: "/cart2"
                    }, {
                        key: "7",
                        title: "购物车",
                        icon: "team",
                        path: "/cartchart"
                    }, {
                        key: "8",
                        title: "用户浏览",
                        icon: "team",
                        path: "/cart3"
                    }
                ]
            }, {
                key: "9",
                title: "个人信息",
                icon: "team",
                path: "/catalogProduct",
                children: [
                    {
                        key: "10",
                        title: "用户中心",
                        icon: "desktop",
                        path: "/cart4"
                    }, {
                        key: "11",
                        title: "个人设置",
                        icon: "user",
                        path: "/cart5"
                    }
                ]
            }, {
                key: "12",
                title: "产品管理",
                icon: "team",
                path: "/product"
            }, {
                key: "13",
                title: "产品分类管理",
                icon: "team",
                path: "/productType"
            }, {
                key: "14",
                title: "前台用户管理",
                icon: "desktop",
                path: "/frontUser"
            }, {
                key: "15",
                title: "用户管理",
                icon: "desktop",
                path: "/account"
            },
        ]
    };
    // https://blog.csdn.net/youlinaixu/article/details/92085600
    // https://blog.csdn.net/qq_42833001/article/details/87515932
    componentDidMount() {
        // console.log(window.location.pathname);
        // console.log(this.props.location.pathname)
        const menu = this.renderMenu(this.state.list);
        this.setState({
            menu
        })
    }
    // 点击时切换展开项
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key =>
            this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {//当有子集存在的时候，需要再次调用遍历
                this.rootSubmenuKeys.push(item.key)
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
            )
        })
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        const path = this.props.location.pathname;
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className={styles.menuIcon}>
                    <img src="https://media.hpstore.cn/static/version1559772150/frontend/HPOLS/default/zh_Hans_CN/images/logo.svg" alt="hp" />
                    <div className={styles.leftTitle}><span>HP</span></div>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[path]}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    {this.state.menu}
                    {/* {
                        this.state.list.map((item, index) => {
                            let data;
                            if (item.to && !item.parentKey) {
                                return <Menu.Item key={item.key}>
                                    <Link to={item.to}>
                                        <Icon type={item.type} />
                                        <span>{item.name}</span>
                                    </Link>
                                </Menu.Item>
                            } else if (item.to && !item.parentKey) {
                                if (!this.state.list[index + 1].parentKey) {
                                    return <Menu.Item key={item.key}>
                                        <Link to={item.to}>
                                            <Icon type={item.type} />
                                            <span>{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                }
                            } else if (!item.to && !item.parentKey) {
                                return <Fragment>
                                    <SubMenu
                                        key={item.key}
                                        title={
                                            <span>
                                                <Icon type={item.type} />
                                                <span>{item.name}</span>
                                            </span>
                                        }
                                    >
                                        {data}
                                    </SubMenu>
                                </Fragment>
                            }
                        })
                    } */}
                    {/* <Menu.Item key="1">
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
                    </Menu.Item> */}
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
)(classify(styles)(withRouter(Left)));