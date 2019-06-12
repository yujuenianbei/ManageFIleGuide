import React, { Fragment } from 'react';
import './App.less';
// import VeniaAdapter from '@magento/venia-concept/esm/drivers/adapter';
import { persistor, store } from './store/store';
import * as Actions from './actions';
import ApolloClient from "apollo-boost";
import './less/font.less'
import Header from './components/Header';
import HeaderInt from './components/HeaderInt';
import Notification from './components/Notification';
import Routers from './router/routers';
import Footer from './components/Footer';

import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import ScrollToTop from './components/ScrollToTop';
// 状态数据持久化
import { PersistGate } from 'redux-persist/integration/react'

// const client = new ApolloClient({
//   uri: "http://localhost:3004/graphql"
// });

const client = new ApolloClient({
  // uri: "https://demo.yujuenianbei.xyz:3001/graphql",
  uri: "http://localhost:3004/graphql",
  fetchOptions: {
    credentials: 'include'
  },
  request: async (operation) => {
    const token = await localStorage.getItem('token');
    const loginState = await localStorage.getItem('loginState');
    operation.setContext({
      headers: {
        authorization: token,
        login: loginState
      }
    });
  },
});
// 生成随机数
function RndNum(n) {
  var rnd = "";
  for (var i = 0; i < n; i++)
      rnd += Math.floor(Math.random() * 10);
  return rnd;
}

const App = () => {
  // 
  if(!localStorage.getItem('loginState')){
    localStorage.setItem("loginState", 0);
  }
  if(!localStorage.getItem('id')){
    localStorage.setItem("id", RndNum(8));
  }
  // 判断浏览器的在线状态
  let offNote, onnote;
  // 监听在线状态并修改状态
  window.addEventListener('online', () => {
    store.dispatch(Actions.offLineNote(true));
    store.dispatch(Actions.offLine(false));
    offNote = setTimeout(function () {
      store.dispatch(Actions.offLineNote(false));
    }, 3000)
  });
  window.addEventListener('offline', () => {
    clearTimeout(offNote)
    store.dispatch(Actions.offLine(true));
    store.dispatch(Actions.offLineNote(true));
  });

  if (navigator.onLine) {
    store.dispatch(Actions.offLine(false));
    onnote = setTimeout(function () {
      store.dispatch(Actions.offLineNote(false));
    }, 3000)
  } else {
    clearTimeout(onnote)
    store.dispatch(Actions.offLine(true));
    store.dispatch(Actions.offLineNote(true));
  }
  return (
    // <ApolloProvider client={client}>
    //   <ReduxProvider store={store}>
    //     <Router apiBase={"https://mystore.com"}>
    //     <div>
    //       <Header />
    //       <HeaderInt />
    //       <Notification />
    //       <Content />
    //       <Footer />
    //     </div>
    //     </Router>
    //   </ReduxProvider>
    // </ApolloProvider>

    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <ScrollToTop>
          <LocaleProvider locale={zhCN}>
            <Fragment>
              <Header />
              <HeaderInt />
              <Notification />
              <Routers />
              <Footer />
            </Fragment>
          </LocaleProvider>
          </ScrollToTop>
        </Router>
        </PersistGate>
      </ReduxProvider>
    </ApolloProvider>

    // <VeniaAdapter client={client} store={store} apiBase="https://mystore.com">

    // </VeniaAdapter>
  )
}



export default App;
