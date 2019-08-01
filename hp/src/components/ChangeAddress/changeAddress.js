import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import styles from './changeAddress.module.less';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class ChangeAddress extends Component {

    render() {
        const props = this.props;
        return (
            <div className={styles.infos}>
                <div className={styles.contents}>
                    <label required>姓</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="lastName" placeholder="姓" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>名字</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="firstName" placeholder="名字" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>详细地址</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="detailAddress" placeholder="详细地址" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label>街牌号</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="streetNumber" placeholder="街牌号" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>省</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="province" placeholder="省" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>市</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="city" placeholder="市" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>区</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="district" placeholder="区" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>城镇</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="town" placeholder="城镇" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label>邮政编码</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="pincode" placeholder="邮政编码" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label required>电话号码</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="phoneNumber" placeholder="电话号码" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <label>公司</label>
                    <div className={styles.labcontent}>
                        <input type="text" ref="companyName" placeholder="公司" className={styles.labelInput} />
                    </div>
                </div>
                <div className={styles.PWDBtns}>
                    <button className={styles.left + ' ' + styles.prime}>确定</button>
                    <button className={styles.right + ' ' + styles.primed} onClick={props.show}>取消</button>
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
        loadingOnHeader: (data) => { dispatch(Actions.loadingHeader(data)); },
        changeExpress: (data) => { dispatch(Actions.orderDelivery(data)); },
        changeCartError: (data) => { dispatch(Actions.cartError(data)); },
        changeMessageInProduct: (data) => { dispatch(Actions.messageInProduct(data)); },
        changeMessageInExpress: (data) => { dispatch(Actions.messageInExpress(data)); },
        changeCartToOrder: (data) => { dispatch(Actions.cartToOrder(data)); },
        changeCartDeliveryList: (data) => { dispatch(Actions.cartDeliveryList(data)); },
        changeOrderProductList: (data) => { dispatch(Actions.orderProductList(data)); },
        changeCartToOrderItem: (data) => { dispatch(Actions.cartToOrderItem(data)); },
        changeCartCountPrice: (data) => { dispatch(Actions.cartCountPrice(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ChangeAddress));
