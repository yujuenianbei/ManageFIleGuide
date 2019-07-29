import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
import { getUserInfo } from '../../fetch/order'
import { Modal, Spin, Form, Icon } from 'antd';

import ShowAddress from './address';
// import CreateOrder from './createOrder';
// import DeleteOrder from './delete';

class OrderModle extends PureComponent {

    handleOk = (e) => {
        // 父组件调用子组件方法
        // if(this.props.state.order.modelName !== 'delete'){
        //     this.child.handleSubmit(e);
        // } else {
        //     this.del.handleSubmit(e);  
        // }
    };

    handleCancel = () => {
        // if(this.props.state.order.modelName !== 'delete'){
        //     this.child.cancelSubmit();
        // } else {
        //     this.del.cancelSubmit();  
        // }
        if(this.props.state.order.modelName !== 'delete'){
            this.address.cancelSubmit()
        }
    };

    render() {
        return (
            <Fragment>
                <Modal
                    centered
                    title={this.props.state.order.modelTitle}
                    visible={this.props.state.order.modelState}
                    onOk={this.handleOk}
                    confirmLoading={this.props.state.order.confirmLoading}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                >
                {this.props.state.order.modelName === 'showResInfo' && <ShowAddress onAdr={(ref) => { this.address = ref }} />}
                {/* {this.props.state.order.modelName !== 'delete' && <CreateOrder onRef={(ref) => { this.child = ref }} />}
                {this.props.state.order.modelName === 'delete' && <DeleteOrder onDel={(ref) => { this.del = ref }}/>}  */}
                </Modal>
            </Fragment>
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
        changeModleState: (data) => { dispatch(Actions.orderModleState(data)); },
        changeOrderDataLoading: (data) => { dispatch(Actions.orderDataLoading(data)); },
        changeOrderConfirmLoading: (data) => { dispatch(Actions.orderConfirmLoading(data)); },
        changeOrderData: (data) => { dispatch(Actions.orderData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.orderModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(OrderModle));