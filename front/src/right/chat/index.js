import React, { Component } from 'react';
import * as Actions from '../redux/action';
import { connect } from 'react-redux';
import { Drawer, Button, Radio, Icon, Tabs, Input } from 'antd';
import './index.less';
import { ip } from '../../http'

import io from 'socket.io-client'

const socket = io(ip);
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class Right extends Component {
  constructor() {
    super();
    this.state = {
      inputData: ''
    }
  }
  componentDidMount() {
    // socket.emit("join", this.props.addSong.login.userName)
    socket.on('login', (data) => {
      console.log(data)
    });
    socket.on('add user', (data) => {
      console.log(data)
    });
    socket.on('new message', (data) => {
      console.log(data)
    });
    socket.on("message", function (msg) {
      console.log(msg)
      console.log(this.state);
      if (!!this.props) {
        if (msg.name === this.props.addSong.login.userName) {
          var node = document.createElement("LI");
          var textnode = document.createTextNode(this.props.addSong.login.userName + ":" + msg.message);
          node.appendChild(textnode);
          document.getElementById("chatContent").appendChild(node);
        }
      } else {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(msg.name + ":" + msg.message);
        node.appendChild(textnode);
        document.getElementById("chatContent").appendChild(node);
      }
    })
  }
  onSubmitMsg = () => {
    let inputData = document.getElementsByClassName('chatInput')[0].value
    socket.emit('message', {
      message: inputData,
      name: this.props.addSong.login.userName
    })
    this.setState({ inputData: '' })
  }
  changeData = (event) => {
    this.setState({ inputData: event.target.value });
  }
  render() {
    return (
      <div className="rightChat" style={this.props.addSong.header.chatpartState ? { right: "0px" } : { right: "-300px" }}>
        <Tabs defaultActiveKey="1" tabBarGutter={0} tabBarStyle={{ width: "300px" }}>
          <TabPane tab={<span style={{ width: 150 }}><Icon type="apple" />聊天室</span>} key="1">
            <div className="chatContent" id="chatContent">

            </div>
            <TextArea className="chatInput" autosize={{ minRows: 3, maxRows: 3 }} value={this.state.inputData} onChange={this.changeData} />
            <div className="submitButton">
              <Button style={{ float: 'right' }} type="primary" onClick={this.onSubmitMsg}>发送</Button>
            </div>
          </TabPane>
          <TabPane tab={<span style={{ width: 150 }}><Icon type="android" />联系人</span>} key="2">
            Tab 2
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addSong: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChatPart: () => { dispatch(Actions.chatpart()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Right);