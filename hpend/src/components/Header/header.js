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
            // console.log(localStorage.getItem('persist:root'))
        }
    }

    chatList=() => {
        this.props.changeChatListState(!this.props.state.chat.chatListState)
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
                    个人设置
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
                <Header style={{ background: '#fff', padding: 0 }}>
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Headers));