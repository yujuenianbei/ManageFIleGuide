import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Coupon.module.less';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Coupon extends Component {
    
    render() {
        const props = this.props;
        return (
            <div>
               coupon
            </div>
        );
    }
}
export default classify(styles)(Coupon);
