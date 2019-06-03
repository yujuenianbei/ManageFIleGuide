import React from 'react';
import ReactDOM from 'react-dom';
import './main.less';
import { Provider } from 'react-redux';
// import Main from './main';
import registerServiceWorker from './registerServiceWorker';

import { persistor, store } from './store'
import PlayerIndex from './play/playerIndex';

import LoginMain from './login/index'
// 状态数据持久化
import { PersistGate } from 'redux-persist/integration/react'


// // 设置cookie
// const setCookie = (c_name, value, expiredays) => {
//   var exdate = new Date();
//   exdate.setDate(exdate.getDate() + expiredays);
//   document.cookie = c_name + "=" + escape(value) +
//           ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
// }
// setCookie('locale','zh_cn',4);
// setCookie('name','123',4);

// // 读取cookie
// const getCookie = (c_name) => {
//   if (document.cookie.length > 0) {
//       const c_start = document.cookie.indexOf(c_name + "=");
//       if (c_start !== -1) {
//           const start = c_start + c_name.length + 1;
//           const end = document.cookie.indexOf(";");
//           return unescape(document.cookie.substring(start, end));
//       }
//   }
//   return "";
// }
// const locale = getCookie('locale');


// const store = configureStore;
class LoginDemo extends React.Component {
  render() {
    let img = 'url(./csgo0.jpg)'
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
            <LoginMain />
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<LoginDemo />, document.getElementById('root'));



// 右键菜单
// class ContextMenu extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           visible: false,
//       };
//   }  

//   componentDidMount() {
//       document.addEventListener('contextmenu', this._handleContextMenu);
//       document.addEventListener('click', this._handleClick);
//       document.addEventListener('scroll', this._handleScroll);
//   };

//   componentWillUnmount() {
//     document.removeEventListener('contextmenu', this._handleContextMenu);
//     document.removeEventListener('click', this._handleClick);
//     document.removeEventListener('scroll', this._handleScroll);
//   }

//   _handleContextMenu = (event) => {
//       event.preventDefault();

//       this.setState({ visible: true });

//       const clickX = event.clientX;
//       const clickY = event.clientY;
//       const screenW = window.innerWidth;
//       const screenH = window.innerHeight;
//       const rootW = this.root.offsetWidth;
//       const rootH = this.root.offsetHeight;

//       const right = (screenW - clickX) > rootW;
//       const left = !right;
//       const top = (screenH - clickY) > rootH;
//       const bottom = !top;

//       if (right) {
//           this.root.style.left = `${clickX + 5}px`;
//       }

//       if (left) {
//           this.root.style.left = `${clickX - rootW - 5}px`;
//       }

//       if (top) {
//           this.root.style.top = `${clickY + 5}px`;
//       }

//       if (bottom) {
//           this.root.style.top = `${clickY - rootH - 5}px`;
//       }
//   };

//   _handleClick = (event) => {
//       const { visible } = this.state;
//       const wasOutside = !(event.target.contains === this.root);

//       if (wasOutside && visible) this.setState({ visible: false, });
//   };

//   _handleScroll = () => {
//       const { visible } = this.state;

//       if (visible) this.setState({ visible: false, });
//   };

//   render() {
//       const { visible } = this.state;

//       return(visible || null) && 
//           <div ref={ref => {this.root = ref}} className="contextMenu">
//               <div className="contextMenu--option">Share this</div>
//               <div className="contextMenu--option">New window</div>
//               <div className="contextMenu--option">Visit official site</div>
//               <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
//               <div className="contextMenu--option">Settings</div>
//               <div className="contextMenu--separator" />
//               <div className="contextMenu--option">About this app</div>
//           </div>
//   };
// }

// ReactDOM.render(<ContextMenu />, document.getElementById('root'));

registerServiceWorker();
