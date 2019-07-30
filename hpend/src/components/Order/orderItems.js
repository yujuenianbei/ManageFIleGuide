import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
class userAddressItem extends PureComponent {
    render() {
        const { id, index, email, firstaName, lastName, phoneCode, phone,
            province, address, postCode } = this.props;
        return (
            <div className={parseInt(this.props.state.order.orderAddressItem) === parseInt(id) ? styles.userAddressItem + ' ' + styles.selected : styles.userAddressItem} onClick={this.props.onClick}>
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

    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(userAddressItem));