import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './deliveryAddressItem.module.less';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
class DeliveryAddressItem extends Component {
    render() {
        const { id, index, email, firstaName, lastName, phoneCode, phone,
            province, address, postCode } = this.props;
        return (
            <div className={this.props.state.order.orderAddressItem === id ? styles.deliveryAddressItem + ' ' + styles.selected : styles.deliveryAddressItem} onClick={this.props.onClick}>
                <div className={styles.item}>
                    <label>姓: </label><span>{lastName}</span>
                </div>
                <div className={styles.item}>
                    <label>名: </label><span>{firstaName}</span>
                </div>
                <div className={styles.item}>
                    <label>区号: </label><span>{phoneCode}</span>
                </div>
                <div className={styles.item}>
                    <label>电话: </label><span>{phone}</span>
                </div>
                <div className={styles.item}>
                    <label>省市区: </label><span>{province}</span>
                </div>
                <div className={styles.item}>
                    <label>详细地址: </label><span>{address}</span>
                </div>
                <div className={styles.item}>
                    <label>邮编: </label><span>{postCode}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProductNumInCart: (data) => { dispatch(Actions.productNumInCart(data)); },
        addProductInCart: (data) => { dispatch(Actions.productInCart(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeliveryAddressItem));