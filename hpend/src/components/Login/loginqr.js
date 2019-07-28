import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 第三方组件
import UID from 'uuid-js';
import io from 'socket.io-client'
// http
import { http } from '../../http';
const socket = io(http.ip, {
    // query: params,
    //此处大坑，设置为true才会开启新的连接
    forceNew: false
});

class LoginQr extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.qr}>
                <img className={styles.qrImg} src={'data:image/png;base64,' + this.props.state.user.qrcode} />
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