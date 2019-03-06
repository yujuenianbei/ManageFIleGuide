import React, { Component } from 'react';

import Home from './layout/home/index'
import UserList from './layout/userList/userList'
import VideoPlayer from './layout/videoPlayer/video'
import MusicList from './layout/musicList/musicList'
import VideoList from './layout/videoList/videoList'
import ImgList from './layout/imgList/imgList'


import Left from './left/left';
// import {
//   HashRouter,
//   Route,
//   Link,
//   Switch,
//   BrowserRouter,
//   withRouter
// } from 'react-router-dom';
import { HashRouter as Router, Route, Link, Switch, HashHistory } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
const customHistory = createBrowserHistory();

class Main extends Component {
  render() {
    return (
      <Router history = {customHistory}>
            <Left>
                <Route exact path="/main" component={Home} />
                <Route path="/user" component={UserList} />
                <Route path="/about" component={VideoPlayer} />
                <Route path="/video" component={VideoList} />
                <Route path="/music" component={MusicList} />
                <Route path="/img" component={ImgList} />
            </Left>
      </Router>
    );
  }
}

export default Main