import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Booking.module.less';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Booking extends Component {
    
    render() {
        const props = this.props;
        return (
            <div>
               booking
            </div>
        );
    }
}
export default classify(styles)(Booking);
