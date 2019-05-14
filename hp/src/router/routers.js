import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './index.moudle.less';
import Main from '../components/Content/Main'
import List from '../components/Content/List'
import Product from '../components/Content/Product'
import { Route } from 'react-router-dom';
class Routers extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Main} />
                <Route path="/productList" component={List} />
                <Route path="/productInfo/:id" component={Product} />
            </Fragment>
        );
    }
}
export default classify(styles)(Routers);