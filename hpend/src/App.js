import React, { Fragment } from 'react';
import './App.less';
// import VeniaAdapter from '@magento/venia-concept/esm/drivers/adapter';
import { persistor, store } from './store/store';
import * as Actions from './actions';
import ApolloClient from "apollo-boost";

import './less/font.less'

import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, HashRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import ScrollToTop from './components/ScrollToTop';
// 状态数据持久化
import { PersistGate } from 'redux-persist/integration/react'
import Main from './components/Main';
// http
import { http } from './http'

// const client = new ApolloClient({
//   uri: "http://192.168.31.50:3004/graphql"
// });

const client = new ApolloClient({
  // uri: "https://demo.yujuenianbei.xyz:3001/graphql",
  uri: http.port,
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
  if (!localStorage.getItem('loginState')) {
    localStorage.setItem("loginState", false);
  }
  // if (!localStorage.getItem('uuid')) {
  //   localStorage.setItem("uuid", RndNum(16));
  // }
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
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <LocaleProvider locale={zhCN}>
                <Main />
              </LocaleProvider>
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App;
