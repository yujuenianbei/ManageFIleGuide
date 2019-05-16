import React, { Fragment } from 'react';
import './App.less';
// import VeniaAdapter from '@magento/venia-concept/esm/drivers/adapter';
import store from './store/store';
import * as Actions from './actions/index';
import ApolloClient from "apollo-boost";
import './less/font.less'
import Header from './components/Header/index';
import HeaderInt from './components/HeaderInt/index';
import Notification from './components/Notification/index';
import Routers from './router/routers';
import Footer from './components/Footer/index';

import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});
const App = () => {
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
        <Router>
          <LocaleProvider locale={zhCN}>
            <Fragment>
              <Header />
              <HeaderInt />
              <Notification />
              <Routers />
              <Footer />
            </Fragment>
          </LocaleProvider>
        </Router>
      </ReduxProvider>
    </ApolloProvider>

    // <VeniaAdapter client={client} store={store} apiBase="https://mystore.com">

    // </VeniaAdapter>
  )
}



export default App;
