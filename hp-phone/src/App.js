import React, { Fragment } from 'react';
import './App.css';
import { persistor, store } from './store/store';
import * as Actions from './actions';
// 模块
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import { Provider as ReduxProvider } from 'react-redux';

import { HashRouter as Router } from 'react-router-dom';


import { LocaleProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/locale-provider/ru_RU';

import Routers from './router/router';
// 状态数据持久化
import { PersistGate } from 'redux-persist/integration/react';

// http
import { http } from './http';

// module
import MainLoding from './components/MainLoading';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(brands)


// 生成随机数
function RndNum(n) {
  var rnd = "";
  for (var i = 0; i < n; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}

class App extends React.Component {
  state = {
    client: null,
    loaded: false,
  };
  async componentDidMount() {
    const cache = new InMemoryCache()
    const stateLink = withClientState({
      cache
    })
    await persistCache({
      cache,
      storage: window.localStorage,
      debug: true
    })
    const httpLink = new HttpLink({ uri: http.port })

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        stateLink, httpLink
      ])
    })
    this.setState({
      client,
      loaded: true
    })

  }
  render() {
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
    const { client, loaded } = this.state;

    if (!loaded) {
      return <MainLoding show={this.state.loaded} />;
    }
    return (
      <ReduxProvider store={store}>
        <ApolloProvider client={this.state.client}>
          <PersistGate persistor={persistor}>
            <LocaleProvider locale={zhCN}>
              <Router>
                <Fragment>
                  <Routers />
                </Fragment>
              </Router>
            </LocaleProvider>
          </PersistGate>
        </ApolloProvider>
      </ReduxProvider>
    )
  }
}



export default App;
