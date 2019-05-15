import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productWtched.module.less';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
class ProductWtched extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className={styles.productWtched}>
                <Link to={this.props.link}>
                    <img src={this.props.img} />
                </Link>
                <div className={styles.productWtchedContent}>
                    <Link to={this.props.link}>
                        <h4 title={this.props.name}>{this.props.name}</h4>
                    </Link>
                    <div className={styles.message}>{this.props.message}</div>
                    <p className={styles.price}>{this.props.price}</p>
                </div>
            </div>
        );
    }
}
export default classify(classify)(ProductWtched);