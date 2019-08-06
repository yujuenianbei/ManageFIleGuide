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
        // collapsed: false,
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
                title: "快递管理",
                icon: "desktop",
                path: "/delivery",
                children: [
                    {
                        title: "完成订单",
                        icon: "desktop",
                        path: "/cart10"
                    },
                    {
                        title: "在途订单",
                        icon: "desktop",
                        path: "/cart11"
                    }, {
                        title: "待运订单",
                        icon: "desktop",
                        path: "/cart12"
                    }, {
                        title: "快递公司管理",
                        icon: "team",
                        path: "/cart13"
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
        this.props.changeSettingCollapsed(collapsed)
        this.onOpenChange(this.state.openKeys);
    };

    render() {
        const path = this.props.location.pathname;
        return (
            <Sider
                className={styles.left}
                style={this.props.state.setting.leftFix ? {
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 100
                } : {}}
                theme={this.props.state.setting.menuTheme}
                collapsible
                collapsed={this.props.state.setting.leftCollapsed}
                onCollapse={this.onCollapse}>
                <div className={styles.menuIcon} style={this.props.state.setting.menuTheme === 'dark' ? { borderBottom: '1px solid #001529' } : {borderBottom: '1px solid #c1c1c1' }}>
                    <img src="https://media.hpstore.cn/static/version1559772150/frontend/HPOLS/default/zh_Hans_CN/images/logo.svg" alt="hp" />
                    <div className={styles.leftTitle} style={this.props.state.setting.menuTheme === 'dark' ? { color: '#fff' } : { color: '#001529' }}><span>HP</span></div>
                </div>
                <Menu
                    style={{ height: "calc(100vh - 108px)" }}
                    theme={this.props.state.setting.menuTheme}
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
const mapDispatchToProps = (dispatch) => {
    return {
        // 设置
        changeSettingCollapsed: (data) => { dispatch(Actions.settingCollapsed(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(withRouter(Left)));