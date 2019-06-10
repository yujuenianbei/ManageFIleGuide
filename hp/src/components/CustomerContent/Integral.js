import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Integral.module.less';
import Crumbs from '../Crumbs';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Integral extends Component {
    
    render() {
        const props = this.props;
        return (
            <div>
               Integral
            </div>
        );
    }
}
export default classify(styles)(Integral);
