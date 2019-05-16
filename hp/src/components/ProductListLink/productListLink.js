import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './productListLink.module.less';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
class ProductListLink extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={styles.productListLink}>
                <img src={this.props.img} alt=""></img>
                <span className={styles.name}>{this.props.title}</span>
                <span className={styles.message}>畅快体验新型游戏，纵情享受娱乐盛宴</span>
                <Link to={this.props.link}>
                    立即购买
                </Link>
            </div>
        );
    }
}
export default classify(styles)(ProductListLink);