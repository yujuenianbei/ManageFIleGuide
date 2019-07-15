import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import styles from './index.moudle.less';
import Main from '../components/Content/Main';
import Account from '../components/Account';
import Product from '../components/Product';
import Order from '../components/Order';
import Cart from '../components/Cart';
// import CheckoutCart from '../components/Content/Cart';
// import Delivery from '../components/Content/Delivery';
// import Customer from '../components/Content/Customer';
class Routers extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Main} />
                <Route path="/account" component={Account} />
                <Route path="/order" component={Order} />
                <Route path="/cart" component={Cart} />
                <Route path="/product" component={Product} />

                
                {/* <Route path="/productInfo/:id" component={Product} />
                <Route path="/checkout/cart" component={CheckoutCart} />
                <Route path="/onestepcheckout" component={Delivery} />
                <Route path="/customer" component={Customer} /> */}
            </Fragment>
        );
    }
}
export default classify(styles)(Routers);