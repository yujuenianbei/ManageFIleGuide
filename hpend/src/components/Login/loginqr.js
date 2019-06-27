import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 第三方组件
import UID from 'uuid-js';
import io from 'socket.io-client'
const socket = io("http://192.168.1.128:3004");

class LoginQr extends PureComponent {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        let _this = this;

        _this.props.changeQrState(1);
        _this.props.changeQrMessage('请扫描二维码')

        socket.on("scanned", function (msg) {
            if (msg.qrState === 2) {
                _this.props.changeQrState(msg.qrState);
                _this.props.changeQrMessage('请在手机上确认登录')
            }
        })
        socket.on("loginMessage", function (msg) {
            if (msg.qrState === 3) {
                _this.props.changeQrState(msg.qrState);
                _this.props.changeQrMessage('已登录')
                _this.props.changeLoginstate(msg.state);
                _this.props.changeUsername(msg.userName);
                localStorage.setItem("uid", msg.uid);
                localStorage.setItem("token", msg.token);
                socket.close();
            } else if(msg.qrState === 4){
                const uid = UID.create();
                _this.props.changePageUid(uid);
                _this.props.changeQrMessage('请重新扫描二维码');
            }
        })
    }

    render() {
        return (
            <div className={styles.qr}>
                <img className={styles.qrImg} src={"http://localhost:3004/aclogin/loginByPhone?" + this.props.state.user.pageUid} />
                <div className={styles.qrMessage}>{this.props.state.user.qrMessage}</div>
            </div>
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(LoginQr));