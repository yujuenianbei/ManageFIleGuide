import React, { Component } from 'react';
import { Menu, Icon, Tooltip, Dropdown, Button, Avatar, Badge } from 'antd';
import * as Actions from '../login/redux/action';
import * as rightActions from '../right/redux/action';
import { connect } from 'react-redux';
import './header.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Header extends Component {
  state = {
    collapsed: false,
  };
  componentDidMount() {
    this.props.onSession();
    this.props.onLoginName(localStorage.getItem('name'))
    // console.log(localStorage.getItem('token'));
    // console.log();
  }
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  }
  onMenuClick = () => {
    // console.log(1)
  }
  onLogout = () => {
    this.props.loginState('logout');
    localStorage.setItem("token", '');
    localStorage.setItem("name", '');
  }
  onChatToggle = () => {
    this.props.onChatPart(!this.props.addSong.header.chatpartState);
  }
  render() {
    const menu = (
      <Menu className="UserListMenu" selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
                </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
                </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
                </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.onLogout}>
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        {/* <Tooltip title="使用文档">
          <a
            target="_blank"
            href="http://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip> */}
        <div className="headerRight">
          <span className="chatList" onClick={this.onChatToggle}>
            <Badge count={99}>
              <Icon className="iconSize" type="team" style={this.props.addSong.header.chatpartState ? { color: '#ff4400' } : {}} />
            </Badge>
          </span>
          <Dropdown className="UserList" overlay={menu} placement="bottomRight">
            <span>
              <Avatar size="small" className="headerUserAvatar" />
              <span className="headerUserName">{this.props.addSong.login.userName}</span>
            </span>
          </Dropdown>
        </div>
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
    loginState: (bool) => { dispatch(Actions.loginState(bool)) },
    onChatPart: (data) => { dispatch(rightActions.chatpart(data)) },
    onSession: () => { dispatch(Actions.session()) },
    onLoginName: (data) => { dispatch(Actions.loginName(data)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);