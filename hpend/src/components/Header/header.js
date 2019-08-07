import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';

// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './header.module.less';

import { Layout, BackTop, Icon, Menu, Dropdown, Avatar, Badge } from 'antd';

import io from 'socket.io-client'
// http
import { http } from '../../http';
const socket = io(http.ip, {
    // query: params,
    //此处大坑，设置为true才会开启新的连接
    forceNew: true
});

const { Header } = Layout;

class Headers extends PureComponent {
    menuclick = (e) => {
        if (e.key === "0") {

        } else if (e.key === "1") {
            this.props.changeSettingModel(!this.props.state.setting.modelState);
        } else if (e.key === "2") {
            socket.emit('userList', {
                type: 'out',
                userName: this.props.state.user.userName
            });
            this.props.changeLoginstate(0);
            this.props.changeQrState(1);
            this.props.changeQrMessage('请扫描二维码')
            this.props.changeUsername('');
            this.props.changePageUid('')
            this.props.changeUserOnlineList('')
            localStorage.removeItem("uid");
            localStorage.removeItem("persist:root");
            // console.log(localStorage.getItem('persist:root'))
        }
    }

    // 聊天窗口
    chatList = () => {
        this.props.changeChatListState(!this.props.state.chat.chatListState)
    }

    // 侧边栏
    changeLeftCollapsed = () => {
        this.props.changeSettingCollapsed(!this.props.state.setting.leftCollapsed);
    };

    // 头部设置的样式
    headerStyle = () => {
        const FH = this.props.state.setting.fixHeader;
        const LH = this.props.state.setting.leftFix;
        const LC = this.props.state.setting.leftCollapsed;
        if (!FH && !LH && !LC) {
            return {}
        } else if (!FH && !LH && LC) {
            return {}
        } else if (!FH && LH && !LC) {
            return {
                marginLeft: 250
            }
        } else if (!FH && LH && LC) {
            return {
                marginLeft: 80
            }
        } else if (FH && !LH && !LC) {
            return {
                position: 'fixed',
                width: 'calc(100% - 250px)',
                borderBottom: '1px solid #c1c1c1',
                marginLeft: 0, transition: 'all 0.2s'
            }
        } else if (FH && !LH && LC) {
            return {
                position: 'fixed',
                width: 'calc(100% - 80px)',
                borderBottom: '1px solid #c1c1c1',
                marginLeft: 0, transition: 'all 0.2s'
            }
        } else if (FH && LH && !LC) {
            return {
                position: 'fixed',
                width: 'calc(100% - 250px)',
                borderBottom: '1px solid #c1c1c1',
                marginLeft: 250
            }
        } else if (FH && LH && LC) {
            return {
                position: 'fixed',
                width: 'calc(100% - 80px)',
                borderBottom: '1px solid #c1c1c1',
                marginLeft: 80
            }
        }
    }

    render() {
        const menu = (
            <Menu onClick={this.menuclick}>
                <Menu.Item key="0">
                    <Icon type="user" />
                    用户中心
                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="setting" />
                    系统设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        )
        return (
            <Fragment>
                <Header className={styles.header} style={this.headerStyle()}>
                    <div className={styles.chatList} onClick={this.chatList}>
                        <Badge count={99}>
                            <Icon type="team" style={{ fontSize: '28px', verticalAlign: 'middle' }} />
                        </Badge>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className={styles.userContol}>
                            <Avatar size="large" icon="user" title="用户管理" />
                            <span className={styles.userName}>{this.props.state.user.userName}</span>
                        </div>
                    </Dropdown>
                    <div className={styles.foldMenu} onClick={this.changeLeftCollapsed}>
                        <Icon type={this.props.state.setting.leftCollapsed ? "menu-unfold" : "menu-fold"} />
                    </div>
                </Header>
                <BackTop className={styles.upCont}>
                    <Icon className={styles.up} type="up" />
                </BackTop>
            </Fragment>
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
        changeLoginstate: (data) => { dispatch(Actions.loginstate(data)) },
        changePageUid: (data) => { dispatch(Actions.pageUid(data)) },
        changeQrState: (data) => { dispatch(Actions.qrState(data)) },
        changeQrMessage: (data) => { dispatch(Actions.qrMessage(data)) },
        changeUsername: (data) => { dispatch(Actions.username(data)) },
        // 聊天
        changeChatListState: (data) => { dispatch(Actions.chatListState(data)) },
        changeUserOnlineList: (data) => { dispatch(Actions.userOnlineList(data)) },
        // 设置
        changeSettingModel: (data) => { dispatch(Actions.settingModel(data)) },
        changeSettingCollapsed: (data) => { dispatch(Actions.settingCollapsed(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Headers));