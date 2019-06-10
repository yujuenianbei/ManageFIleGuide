import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import styles from './index.moudle.less';
import Main from '../components/Content/Main';
import Login from '../components/Content/Login';
import RegUser from '../components/Content/RegUser';
import List from '../components/Content/List';
import Product from '../components/Content/Product';
import CheckoutCart from '../components/Content/Cart';
import Delivery from '../components/Content/Delivery';
import Customer from '../components/Content/Customer';
class Routers extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Main} />
                <Route path="/account/login" component={Login} />
                <Route path="/account/register" component={RegUser} />
                <Route path="/productList" component={List} />
                <Route path="/productInfo/:id" component={Product} />
                <Route path="/checkout/cart" component={CheckoutCart} />
                <Route path="/onestepcheckout" component={Delivery} />
                <Route path="/customer" component={Customer} />
            </Fragment>
        );
    }
}
export default classify(styles)(Routers);