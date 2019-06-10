import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Subscribe.module.less';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Subscribe extends Component {
    
    render() {
        const props = this.props;
        return (
            <div>
               Subscribe
            </div>
        );
    }
}
export default classify(styles)(Subscribe);
