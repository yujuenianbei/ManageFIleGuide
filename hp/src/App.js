import React from 'react';
import './App.less';
import VeniaAdapter from '@magento/venia-concept/esm/drivers/adapter';
import store from './store/store';
import ApolloClient from "apollo-boost";

import Header from './components/Header/index';
// import Content from './components/Content/index';
// import Footer from './components/Footer/index';

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});
const App =() => {
  return (
    <VeniaAdapter client={client} store={store} apiBase="https://mystore.com">
      <Header />
      {/* <Content />
      <Footer /> */}
    </VeniaAdapter>
  )
}
export default App;
