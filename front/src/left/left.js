import React, { Component } from 'react';
import * as Actions from './redux/action';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Spin } from 'antd';
import Header from '../header/header';
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Left extends Component {
  constructor() {
    super();
    this.state = {
      key: 0,
    }
    super();
    this.onCollapse = this.onCollapse.bind(this);
  }
  componentWillMount() {
    this.props.onGetData();
    // this.props.onLink(window.location.hash.split('#')[1]);
    // console.log(window.location.hash.split('#')[1])
  }
  componentDidMount() {
    this.setState({ link: this.props.addSong.left.link });
  }
  componentWillUpdate(nextProps) {
    if (nextProps.addSong.left === this.props.addSong.left) {
      const index = this.props.addSong.left.leftList.filter(item => {
        return item.list_link === this.props.addSong.left.link
      })
      if (index.length > 0) {
        this.props.onIndex(index[0].id);
        this.setState({
          key: index[0].id
        });
      }
      return false;
    } else {
      return true;
    }
  }
  onCollapse() {
    this.props.oncollapsed(!this.props.addSong.left.collapsed);
  }
  onLinked(data, index) {
    this.props.onLink(data);
    this.props.onIndex(index);
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.props.addSong.left.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" >

          </div>
          <Spin spinning={this.props.addSong.left.leftLoading}>
            <Menu theme="dark" defaultSelectedKeys={['' + this.props.addSong.left.index + '']} mode="inline" key={this.state.key}>
              {this.props.addSong.left.leftList.map((item, index) => {
                if (!!item.list_parent_id !== '') {
                  return <Menu.Item key={item.id}>
                    <Icon type={item.list_type} />
                    <span>{item.list_name}</span>
                    <Link to={item.list_link} onClick={this.onLinked.bind(this, item.list_link, item.id)}></Link>
                  </Menu.Item>
                } else {
                  <SubMenu
                    key="sub2"
                    title={<span><Icon type="team" /><span>Team</span></span>}>
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="7">Team 2</Menu.Item>
                  </SubMenu>
                }
              })}
            </Menu>
          </Spin>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          {this.props.children}
        </Layout>
      </Layout>
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
    onGetData: () => { dispatch(Actions.getData()); },
    oncollapsed: (data) => { dispatch(Actions.collapsed(data)); },
    onLink: (data) => { dispatch(Actions.link(data)); },
    onIndex: (data) => { dispatch(Actions.index(data)); },
    onLeftList: (data) => { dispatch(Actions.leftList(data)); },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Left);