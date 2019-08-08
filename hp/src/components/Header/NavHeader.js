import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl, Route } from '@magento/venia-concept/esm/drivers';
import styles from './NavHeader.module.less';
// import Icon from '@material-ui/core/Icon';
import { Icon, Drawer, Menu } from 'antd';
const { SubMenu } = Menu;

class NavHeader extends Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        visible: false,
        openKeys: ['sub1'],
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Fragment>
                <Drawer
                    title="导航菜单"
                    placement="left"
                    width="80%"
                    closable={true}
                    mask={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        style={{ width: 256 }}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>Navigation One</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>Navigation Two</span>
                                </span>
                            }
                        >
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <Icon type="setting" />
                                    <span>Navigation Three</span>
                                </span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Drawer>
                <Icon className={styles.userIcon} type="menu" onClick={this.showDrawer} />
                <ul className={styles.navHeader}>
                    <li>
                        <span>企业解决方案</span>
                        <div className={styles.menu}>
                            企业解决方案
                        </div>
                    </li>
                    <li>
                        <span>笔记本及平板</span>
                        <div className={styles.menu}>
                            笔记本及平板
                        </div>
                    </li>
                    <li>
                        <span>台式及一体机</span>
                        <div className={styles.menu}>
                            台式及一体机
                        </div>
                    </li>
                    <li>
                        <span>打印机</span>
                        <div className={styles.menu}>
                            打印机
                        </div>
                    </li>
                    <li>
                        <span>硒鼓和墨盒</span>
                        <div className={styles.menu}>
                            硒鼓和墨盒
                        </div>
                    </li>
                    <li>
                        <span>显示屏</span>
                        <div className={styles.menu}>
                            显示屏
                        </div>
                    </li>
                    <li>
                        <span>配件</span>
                        <div className={styles.menu}>
                            配件
                        </div>
                    </li>
                    <li>
                        <span>优惠销售</span>
                        <div className={styles.menu}>
                            优惠销售
                        </div>
                    </li>
                    <li>
                        <span>产品支援</span>
                        <div className={styles.menu}>
                            产品支援
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}
export default classify(styles)(NavHeader);