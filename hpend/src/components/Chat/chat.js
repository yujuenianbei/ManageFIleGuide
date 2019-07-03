import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './chat.module.less';
// 插件
import { Drawer } from 'antd';

class ChatContent extends PureComponent {
    chatList=() => {
        this.props.changeChatListState(!this.props.state.chat.chatListState)
    }
    render() {
        return (
            <Fragment>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    mask={false}
                    closable={false}
                    onClose={this.chatList}
                    style={{top: 66}}
                    visible={this.props.state.chat.chatListState}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
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
        // 聊天
        changeChatListState: (data) => { dispatch(Actions.chatListState(data)) },
        changeUserOnlineList: (data) => { dispatch(Actions.userOnlineList(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ChatContent));