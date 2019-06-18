import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classify from '@magento/venia-concept/esm/classify';
import styles from './index.moudle.less';
import Account from '../components/CustomerContent/Account';
import Order from '../components/CustomerContent/Order';
import Booking from '../components/CustomerContent/Booking';
import Coupon from '../components/CustomerContent/Coupon';
import Integral from '../components/CustomerContent/Integral';
import Subscribe from '../components/CustomerContent/Subscribe';
import Bill from '../components/CustomerContent/Bill';
class CustomerRouters extends Component {
    render() {
        return (
            <Fragment>
                <Route path={`${this.props.prop.match.path}/account`} component={Account}/>
                <Route path={`${this.props.prop.match.path}/order`} component={Order} />
                <Route path={`${this.props.prop.match.path}/booking`} component={Booking} />
                <Route path={`${this.props.prop.match.path}/coupon`} component={Coupon} />
                <Route path={`${this.props.prop.match.path}/integral`} component={Integral} />
                <Route path={`${this.props.prop.match.path}/subscribe`} component={Subscribe} />
                <Route path={`${this.props.prop.match.path}/bill`} component={Bill} />
            </Fragment>
        );
    }
}
export default classify(styles)(CustomerRouters);