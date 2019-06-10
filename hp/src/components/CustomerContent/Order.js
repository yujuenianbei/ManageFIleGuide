import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Order.module.less';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Order extends Component {
    
    render() {
        const props = this.props;
        return (
            <div>
               order
            </div>
        );
    }
}
export default classify(styles)(Order);
