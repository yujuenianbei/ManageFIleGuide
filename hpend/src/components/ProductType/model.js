import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
import { getUserInfo } from '../../fetch/account'
import { Modal, Spin, Form, Icon } from 'antd';

import CreateProduct from './createProduct';
import DeleteProduct from './delete';

class ProductTypeModle extends PureComponent {

    handleOk = (e) => {
        // 父组件调用子组件方法
        if(this.props.state.productType.modelName !== 'delete'){
            this.child.handleSubmit(e);
        } else {
            this.del.handleSubmit(e);  
        }
    };

    handleCancel = () => {
        if(this.props.state.productType.modelName !== 'delete'){
            this.child.cancelSubmit();
        } else {
            this.del.cancelSubmit();  
        }
    };

    render() {
        return (
            <Fragment>
                <Modal
                    centered
                    title={this.props.state.productType.modelTitle}
                    visible={this.props.state.productType.modelState}
                    onOk={this.handleOk}
                    confirmLoading={this.props.state.productType.confirmLoading}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                >
                {this.props.state.productType.modelName !== 'delete' && <CreateProduct onRef={(ref) => { this.child = ref }} />}
                {this.props.state.productType.modelName === 'delete' && <DeleteProduct onDel={(ref) => { this.del = ref }}/>} 
                    
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
        changeModleState: (data) => { dispatch(Actions.productTypeModleState(data)); },
        changeProductDataLoading: (data) => { dispatch(Actions.productTypeDataLoading(data)); },
        changeProductData: (data) => { dispatch(Actions.productTypeData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productTypeModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.productTypeModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productTypeModleTitle(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ProductTypeModle));