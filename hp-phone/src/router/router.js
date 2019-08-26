import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import Main from '../components/Main';
import Login from '../components/Login';
import Product from '../components/Product';
class Routers extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/home" component={Main} />
                <Route path="/classify" component={Main} />
                <Route path="/cart" component={Main} />
                <Route path="/user" component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/product/:id' component={Product} />
            </Fragment>
        );
    }
}
export default classify()(Routers);