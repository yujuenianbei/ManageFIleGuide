import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Bill.module.less';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Bill extends Component {
    
    render() {
        const props = this.props;
        return (
            <div>
               Bill
            </div>
        );
    }
}
export default classify(styles)(Bill);
