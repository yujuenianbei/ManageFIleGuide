import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './chat.module.less';
// 插件
// import UUID from 'uuid-js';
import { Drawer, Tabs, List, Avatar, Icon, Input } from 'antd';
import io from 'socket.io-client'
import { object } from 'prop-types';
// http
import { http } from '../../http'
const socket = io(http.ip, {
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
            // 用户有用过聊天
            if (localStorage.getItem('room')) {
                const rooms = Object.keys(JSON.parse(localStorage.getItem('room')));
                rooms.map(item => {
                    // 房间号不存在时
                    if ((item.split('-')[0] !== data.userNameMy &&
                        item.split('-')[1] !== data.userNameClient) &&
                        (item.split('-')[1] !== data.userNameMy &&
                            item.split('-')[0] !== data.userNameClient)) {
                        const roomList = JSON.parse(localStorage.getItem('room'));
                        // 发起人-接收人  将房间号写入
                        roomList[data.userNameMy + '-' + data.userNameClient] = data.roomId.hex;
                        localStorage.setItem('room', JSON.stringify(roomList));
                        // 存储chatrooms 
                        _this.props.changeChatRooms(roomList);
                    }
                })
            } else {
                let roomList = {};
                roomList[data.userNameMy + '-' + data.userNameClient] = data.roomId.hex;
                localStorage.setItem('room', JSON.stringify(roomList));
                // 存储chatrooms 
                _this.props.changeChatRooms(roomList);
            }
            // console.log(data.roomId.hex)
            // 判断本用户是不是目标用户 不能和自己聊天呢
            if (_this.props.state.user.userName !== data.userNameMy) {
                socket.emit('chat', {
                    state: 10,
                    roomId: data.roomId.hex,
                    userNameMy: null,
                    userNameClient: _this.props.state.user.userName,
                });
            }
        })
        socket.on('chatMsg', function (data) {
            console.log(data)
            // 让用户跳转  其实不需要进行改变用户跳转 只要把内容添加到里面就行了
            if(data){
               _this.addChatUser(data.from)
            }
            const contents = _this.props.state.chat.chatContent
            const from = data.from;
            const to = data.to;
            const roomkeys = Object.keys(_this.props.state.chat.chatRooms)
            const roomkey = roomkeys.filter(item => (item.split('-')[0] === from && item.split('-')[1] === to) || (item.split('-')[1] === from && item.split('-')[0] === to))
            if (!contents[roomkey]) {
                contents[roomkey] = [];
            }
            contents[roomkey].push(data);
            console.log(contents)
            _this.props.changeChatContent(contents);
        })

        // this.props.state.chat.chatRooms
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }
    onWindowResize = () => {
        this.setState({
            height: document.body.offsetHeight - 110,
            chatContentHeight: document.body.offsetHeight - 150,
        })
    }


    chatList = () => {
        this.props.changeChatListState(!this.props.state.chat.chatListState)
    }
    callback = (key) => {
        this.props.changeChatTopTab(key)
    }

    onChange = activeKey => {
        this.setState({ activeKey });
        this.props.changeChatNowUser({
            userName: this.props.state.chat.chatUsers[activeKey].title,
            key: activeKey
        })
    };

    onEdit = (targetKey, action) => {
        console.log(targetKey, action)
        this[action](targetKey);
    };

    remove = targetKey => {
        let activeKey = this.props.state.chat.chatNowUser.key;
        let lastIndex;
        this.props.state.chat.chatUsers.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.props.state.chat.chatUsers.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        const active = this.props.state.chat.chatUsers.filter(function (item) {
            return item.key === activeKey
        });
        // 跳转至上面一个窗口
        this.props.changeChatUsers(panes);
        this.props.changeChatNowUser({
            userName: active[0].title,
            key: activeKey
        })
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
        if (isDuplicate && data !== myName) {
            chatObjects.push(panes);
            this.props.changeChatUsers(chatObjects);
            // 跳转到对应的聊天框
            this.props.changeChatTopTab("1")
            this.props.changeChatNowUser({
                userName: data,
                key: key
            })
        } else if (data !== myName) {
            // 获取到已经打开的用户沟通框
            const activekey = this.props.state.chat.chatUsers.filter(function (item) {
                return item.title === panes.title
            });
            this.props.changeChatTopTab("1")
            this.props.changeChatNowUser({
                userName: activekey[0].title,
                key: activekey[0].key
            })
        }

        // 判断两个用户是否之前聊过 通过判断localstorage里面的room
        if (localStorage.getItem('room')) {
            // 获取本用户所有的聊天房间号
            const rooms = JSON.parse(localStorage.getItem('room'));
            const roomskey = Object.keys(JSON.parse(localStorage.getItem('room')));
            roomskey.map(item => {
                console.log(item)
                if ((item.split('-')[0] !== myName &&
                    item.split('-')[1] !== clientName) &&
                    (item.split('-')[1] !== myName &&
                        item.split('-')[0] !== clientName)) {
                    // 没有房间号则roomid为null  state为0 之前没聊过
                    socket.emit('chat', {
                        state: 0,
                        roomId: null,
                        userNameMy: myName,
                        userNameClient: clientName,
                    });
                } else if ((item.split('-')[0] === myName &&
                    item.split('-')[1] === clientName) ||
                    (item.split('-')[1] === myName &&
                        item.split('-')[0] === clientName)) {
                    socket.emit('chat', {
                        state: 1,
                        roomId: rooms[item],
                        userNameMy: myName,
                        userNameClient: clientName,
                    });
                }
            })
        } else {
            // 没有房间号则roomid为null  state为0 之前没聊过
            socket.emit('chat', {
                state: 0,
                roomId: null,
                userNameMy: myName,
                userNameClient: clientName,
            });
        }
    }

    uploadMeg = () => {
        const _this = this;
        const from = this.props.state.user.userName;
        const to = this.props.state.chat.chatNowUser.userName;
        const roomids = JSON.parse(localStorage.getItem('room'))
        const roomkeys = Object.keys(JSON.parse(localStorage.getItem('room')));
        const roomkey = roomkeys.filter(item => (item.split('-')[0] === from && item.split('-')[1] === to) || (item.split('-')[1] === from && item.split('-')[0] === to))
        socket.emit('chatMessage', {
            roomId: roomids[roomkey],
            time: new Date().getTime(),
            name: _this.props.state.user.userName,
            message: ref.current.state.value
        });
    }
    render() {
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
                        activeKey={this.props.state.chat.chatTopTab}
                        tabBarGutter={0}
                        tabBarStyle={{ width: 400, margin: 0, position: 'fixed', backgroundColor: '#fff', zIndex: 99 }}
                        className={styles.chat}
                    >
                        <TabPane tab="聊天" key="1" className={styles.chatContent}>
                            {this.props.state.chat.chatUsers.length > 0 &&
                                <Tabs
                                    tabPosition="right"
                                    onChange={this.onChange}
                                    activeKey={this.props.state.chat.chatNowUser.key}
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
        changeChatTopTab: (data) => { dispatch(Actions.chatTopTab(data)) },
        changeChatListState: (data) => { dispatch(Actions.chatListState(data)) },
        changeUserOnlineList: (data) => { dispatch(Actions.userOnlineList(data)) },
        changeChatUsers: (data) => { dispatch(Actions.chatUsers(data)) },
        changeChatContent: (data) => { dispatch(Actions.chatContent(data)) },
        changeChatNowUser: (data) => { dispatch(Actions.chatNowUser(data)) },
        changeChatRooms: (data) => { dispatch(Actions.chatRooms(data)) }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ChatContent));