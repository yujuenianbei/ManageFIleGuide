import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import Main from '../components/Main';
import Login from '../components/Login';
class Routers extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/home" component={Main} />
                <Route path="/classify" component={Main} />
                <Route path="/cart" component={Main} />
                <Route path="/user" component={Main} />
                <Route path='/login' component={Login} />
            </Fragment>
        );
    }
}
export default classify()(Routers);