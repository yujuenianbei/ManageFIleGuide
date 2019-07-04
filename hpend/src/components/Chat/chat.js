import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './chat.module.less';
// 插件
// import UUID from 'uuid-js';
import { Drawer, Tabs, List, Avatar, Icon, Input } from 'antd';
import io from 'socket.io-client'
const socket = io("http://192.168.1.128:3004", {
    // query: params,
    //此处大坑，设置为true才会开启新的连接
    forceNew: true
});
const { TabPane } = Tabs;
const ref = React.createRef();
class ChatContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            height: document.body.offsetHeight - 110,
            chatContentHeight: document.body.offsetHeight - 150,
        };
    }


    componentDidMount() {
        const _this = this;
        window.addEventListener('resize', this.onWindowResize);
        socket.on('chat', function (data) {
            localStorage.setItem('room', data.roomId.hex)
            if(_this.props.state.user.userName !== data.userNameMy){
                socket.emit('chat', {
                    roomId: data.roomId.hex,
                    userNameMy: null,
                    userNameClient: _this.props.state.user.userName,
                });
            }
        })
        socket.on('chatMsg', function(data){
            console.log(data)
        })
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }
    onWindowResize = () => {
        this.setState({
            height: document.getElementsByClassName('ant-drawer-content-wrapper')[0].clientHeight - 110,
            chatContentHeight: document.getElementsByClassName('ant-drawer-content-wrapper')[0].clientHeight - 150,
        })
        console.log(document.getElementsByClassName('ant-drawer-content-wrapper')[0].clientHeight - 110)
    }


    chatList = () => {
        this.props.changeChatListState(!this.props.state.chat.chatListState)
    }
    callback = (key) => {
        console.log(key);
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        console.log(targetKey)
        let { activeKey } = this.state;
        let lastIndex;
        this.props.state.chat.chatUsers.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        console.log(lastIndex)
        const panes = this.props.state.chat.chatUsers.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ activeKey });
        this.props.changeChatUsers(panes)
    };

    addChatUser = (data) => {
        const myName = this.props.state.user.userName;
        const clientName = data;
        let roomId;

        const key = this.props.state.chat.chatUsers.length.toString();
        const chatObjects = this.props.state.chat.chatUsers;
        const panes = { title: data, roomId, key: key };
        // 判断用户中是否已添加
        const titleArr = this.props.state.chat.chatUsers.map(function (item) { return item.title });
        const isDuplicate = titleArr.some(function (item, idx) {
            return titleArr.indexOf(panes.title) === -1
        });
        if (isDuplicate) {
            chatObjects.push(panes);
            this.props.changeChatUsers(chatObjects);
            // // 未添加过则生成新的roomId
            // var date = new Date().getTime();
            // roomId = UUID.fromTime(date, true);
        } else {
            // roomId = chatObjects[titleArr.indexOf(panes.title)].roomId
        }

        socket.emit('chat', {
            roomId: null,
            userNameMy: myName,
            userNameClient: clientName,
        });
    }

    uploadMeg = () => {
        const _this = this;
        console.log(ref.current.state.value)
        socket.emit('chatMessage', {
            roomId: localStorage.getItem('room'),
            name: _this.props.state.user.userName,
            message: ref.current.state.value
        });
    }
    render() {
        console.log(this.props.state)
        return (
            <Fragment>
                <Drawer
                    placement="right"
                    mask={false}
                    closable={false}
                    onClose={this.chatList}
                    width={400}
                    style={{ top: 66 }}
                    bodyStyle={{ padding: 0 }}
                    visible={this.props.state.chat.chatListState}
                >
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.callback}
                        tabBarGutter={0}
                        tabBarStyle={{ width: 400, margin: 0, position: 'fixed', backgroundColor: '#fff', zIndex: 99 }}
                        className={styles.chat}
                    >
                        <TabPane tab="聊天" key="1" className={styles.chatContent}>
                            {this.props.state.chat.chatUsers.length > 0 &&
                                <Tabs
                                    tabPosition="right"
                                    onChange={this.onChange}
                                    activeKey={this.state.activeKey}
                                    type="editable-card"
                                    tabBarGutter={0}
                                    onEdit={this.onEdit}
                                    tabBarStyle={{ height: this.state.height, width: 110 }}
                                    className={styles.chatUser}
                                >
                                    {this.props.state.chat.chatUsers.map(pane => (
                                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                            <div className={styles.chatContents} style={{ height: this.state.chatContentHeight }}></div>
                                            <Input
                                                ref={ref}
                                                style={{ width: '94%', marginLeft: '3%' }}
                                                addonAfter={<Icon type="upload" onClick={this.uploadMeg} />}
                                                defaultValue=""
                                                placeholder="请输入内容" />
                                        </TabPane>
                                    ))}
                                </Tabs>}
                        </TabPane>
                        <TabPane tab="联系人" key="2" className={styles.chatContent}>
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.state.chat.userOnlineList}
                                renderItem={(item, index) => (
                                    <List.Item
                                        className={styles.userList}
                                        actions={[
                                            <Icon type="star-o" style={{ marginRight: 8 }} />
                                        ]}
                                    >
                                        <List.Item.Meta
                                            onClick={() => this.addChatUser(item)}
                                            avatar={<Avatar size="large" icon="user" />}
                                            title={<span>{item}</span>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="群" key="3" className={styles.chatContent}>
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
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
        changeChatUsers: (data) => { dispatch(Actions.chatUsers(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ChatContent));