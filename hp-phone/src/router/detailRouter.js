import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import Login from '../components/Login';
class Routers extends Component {
    render() {
        return (
            <Fragment>
                <Route path='/login' component={Login} />
                {/* <Route path="/account/login" component={Login} />
                <Route path="/account/register" component={RegUser} />
                <Route path="/productList" component={List} />
                <Route path="/productInfo/:id" component={Product} />
                <Route path="/checkout/cart" component={CheckoutCart} />
                <Route path="/onestepcheckout" component={Delivery} />
                <Route path="/customer" component={Customer} /> */}
            </Fragment>
        );
    }
}
export default classify()(Routers);