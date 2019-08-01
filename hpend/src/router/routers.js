import React, { PureComponent, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import styles from './index.moudle.less';
import Main from '../components/Content/Main';
import Account from '../components/Account';
import FrontUser from '../components/FrontUser';

import Product from '../components/Product';
import ProductType from '../components/ProductType';

import Order from '../components/Order';
import Cart from '../components/Cart';

import CartChart from '../components/CartChart';
class EndRouters extends PureComponent {
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Main} />
                <Route path="/account" component={Account} />
                <Route path="/frontUser" component={FrontUser} />
                <Route path="/order" component={Order} />
                <Route path="/cart" component={Cart} />
                <Route path="/product" component={Product} />
                <Route path="/productType" component={ProductType} />
                <Route path="/cartchart" component={CartChart} />
            </Fragment>
        );
    }
}
export default classify(styles)(EndRouters);