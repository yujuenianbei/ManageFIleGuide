import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 组件
import LoginForm from './loginForm';
import LoginQr from './loginqr'
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
        if (key === "2") {
            const uid = UID.create();
            const aid = UID.create();
            this.props.changePageUid(uid);
            if (sessionStorage.getItem("wsId")) {
                sessionStorage.removeItem("wsId");
                socket.on("join", function (msg) {
                    console.log(msg)
                });
            }
            sessionStorage.setItem("wsId", uid)
            sessionStorage.setItem("AcId", aid)
            socket.emit('join', {
                id: uid,
                aid: aid
            }); 
            socket.on('sys', function (msg) {
                console.log(msg)   
            })   
        } else {
            this.props.changePageUid('')
            this.props.changeQrState(1);
            this.props.changeQrMessage('请扫描二维码');
        }
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
        changeQrMessage: (data) => { dispatch(Actions.qrMessage(data)) },
        changeUsername: (data) => { dispatch(Actions.username(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Login));