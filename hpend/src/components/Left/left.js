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
                title: "首页",
                icon: "pie-chart",
                path: "/"
            },
            {
                title: "订单管理",
                icon: "desktop",
                path: "/order"
            },
            {
                title: "购物车管理",
                icon: "desktop",
                path: "/cart"
            },
            {
                title: "数据分析",
                icon: "user",
                path: "/catalogProduct",
                children: [
                    {
                        title: "订单分析",
                        icon: "desktop",
                        path: "/cart1"
                    }, {
                        title: "产品销量",
                        icon: "desktop",
                        path: "/cart2"
                    }, {
                        title: "购物车",
                        icon: "team",
                        path: "/cartchart"
                    }, {
                        title: "用户浏览",
                        icon: "team",
                        path: "/cart3"
                    }
                ]
            }, {
                title: "个人信息",
                icon: "team",
                path: "/catalogProduct1",
                children: [
                    {
                        title: "用户中心",
                        icon: "desktop",
                        path: "/cart4"
                    }, {
                        title: "个人设置",
                        icon: "user",
                        path: "/cart5"
                    }
                ]
            }, {
                title: "产品管理",
                icon: "team",
                path: "/product"
            }, {
                title: "产品分类管理",
                icon: "team",
                path: "/productType"
            }, {
                title: "前台用户管理",
                icon: "desktop",
                path: "/frontUser"
            }, {
                title: "用户管理",
                icon: "desktop",
                path: "/account"
            },
        ]
    };
    // https://blog.csdn.net/youlinaixu/article/details/92085600
    // https://blog.csdn.net/qq_42833001/article/details/87515932
    componentDidMount() {
        const menu = this.renderMenu(this.state.list);
        this.setState({
            menu
        })
    }
    // 点击时切换展开项
    onOpenChange = (openKeys) => {
        if (this.state.collapsed) {
            this.setState({
                openKeys: [],
            });
        } else {
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
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {//当有子集存在的时候，需要再次调用遍历
                this.rootSubmenuKeys.push(item.path)
                return (
                    <SubMenu key={item.path}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.path}>
                    <Link to={item.path}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed }, () => {
            this.onOpenChange(this.state.openKeys);
        });
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
                    // openKeys={this.state.openKeys}
                    // onOpenChange={this.onOpenChange}
                >
                    {this.state.menu}
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