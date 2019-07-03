import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 组件
import LoginForm from './loginForm';
import LoginQr from './loginqr'
// 请求
import { getQrcode } from '../../fetch/login'

// 插件
import { Layout, Tabs } from 'antd';
import UID from 'uuid-js';
import io from 'socket.io-client'
const socket = io("http://192.168.1.128:3004", {
    // query: params,
    //此处大坑，设置为true才会开启新的连接
    forceNew: true
});
const { TabPane } = Tabs;

class Login extends PureComponent {
    state = {
        key: "1"
    }

    tabClick = (key) => {
        this.setState({ key, })
        const _this = this;
        if (key === "2") {
            getQrcode(this.getQrcode)
        } else {
            socket.emit('leave', {
                room: _this.props.state.user.qrRoom,
                pageId: 1
            });
            this.props.changeQrState(1);
            this.props.changeQrMessage('请扫描二维码');
        }
    }
    // 获取二维码 并加入socket
    getQrcode = (result) => {
        const _this = this;
        this.props.changeQrcode(Buffer(result.qrcode).toString('base64'))
        this.props.changeQrRoom(result.qruid.hex)
        socket.emit('join', {
            room: result.qruid.hex,
            pageId: 1
        });
        socket.on('sys', function (data) {
            if (data.phone === 1) {
                _this.props.changeQrState(2);
                _this.props.changeQrMessage('请在手机上确认登录信息');
            } else if (data.phone === 0) {
                _this.props.changeQrState(4);
                _this.props.changeQrMessage('二维码已失效，请刷新二维码');
                // 二维码失效后删除会话
                socket.emit('leave', {
                    room: _this.props.state.user.qrRoom,
                    pageId: 1
                });
                _this.props.changeQrRoom('');
            }
        });
        socket.on('logstate', function (data) {
            if (data.state === 1) {
                socket.emit('leave', {
                    room: _this.props.state.user.qrRoom,
                    pageId: 1
                });
                socket.emit('userList', {
                    type: 'in',
                    userName: data.userName
                });
                _this.props.changeQrMessage('请扫描二维码');
                _this.props.changeQrState(data.qrState);
                _this.props.changeLoginstate(data.state);
                _this.props.changeUsername(data.userName);
                _this.props.changeQrRoom('');

                localStorage.setItem("uid", data.uid);
                localStorage.setItem("token", data.token);
            } else {
                // 用户名密码不对
                _this.props.changeLoginstate(data.state);
                _this.props.changeQrRoom('');
            }
        })
        socket.on('userList', function (data) {
            _this.props.changeUserOnlineList(data.userList)
        })
    }



    render() {
        return (
            <Fragment>
                <Layout className={styles.loginBg}>
                    <div className={styles.loginForm}>
                        <Tabs
                            defaultActiveKey={this.state.key}
                            onChange={this.tabClick}
                            tabBarStyle={{ width: '100%' }}
                        >
                            <TabPane tab="账号登录" key="1">
                                <LoginForm />
                            </TabPane>
                            <TabPane tab="扫码登录" key="2">
                                <LoginQr tabkey={this.state.key} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Layout>
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
        changePageUid: (data) => { dispatch(Actions.pageUid(data)); },
        changeQrState: (data) => { dispatch(Actions.qrState(data)) },
        changeLoginstate: (data) => { dispatch(Actions.loginstate(data)); },
        changeQrMessage: (data) => { dispatch(Actions.qrMessage(data)) },
        changeUsername: (data) => { dispatch(Actions.username(data)) },
        changeQrcode: (data) => { dispatch(Actions.qrcode(data)) },
        changeQrRoom: (data) => { dispatch(Actions.qrRoom(data)) },
        changeUserOnlineList: (data) => { dispatch(Actions.userOnlineList(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Login));