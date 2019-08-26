import React, { Fragment } from 'react';
import './App.css';
// import VeniaAdapter from '@magento/venia-concept/esm/drivers/adapter';
import { persistor, store } from './store/store';
import * as Actions from './actions';
import ApolloClient from "apollo-boost";
// import './less/font.less'
// 模块
import Header from './components/Main';


import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/locale-provider/ru_RU';

import Routers from './router/router';
// 状态数据持久化
import { PersistGate } from 'redux-persist/integration/react'
// http
import { http } from './http'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(brands)

// const client = new ApolloClient({
//   uri: "http://192.168.31.50:3004/graphql"
// });

const client = new ApolloClient({
  // uri: "https://demo.yujuenianbei.xyz:3001/graphql",
  uri: http.ip + "/graphql",
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
    localStorage.setItem("loginState", 0);
  }
  if (!localStorage.getItem('id')) {
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
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <LocaleProvider locale={zhCN}>
            <Router>
              <Fragment>
                <Routers />
              </Fragment>
            </Router>
          </LocaleProvider>
        </PersistGate>
      </ReduxProvider>
    </ApolloProvider>
  )
}



export default App;
