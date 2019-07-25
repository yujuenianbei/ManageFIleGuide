import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { getUserInfo } from '../../fetch/account'
import { Modal, Spin, Form, Icon } from 'antd';

import CreateAccount from './createAccount';
import DeleteAccount from './delete';

class AccountModle extends PureComponent {

    handleOk = (e) => {
        // 父组件调用子组件方法
        if(this.props.state.account.modelName !== 'delete'){
            this.child.handleSubmit(e);
        } else {
            this.del.handleSubmit(e);  
        }
    };

    handleCancel = () => {
        if(this.props.state.account.modelName !== 'delete'){
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
                    title={this.props.state.account.modelTitle}
                    visible={this.props.state.account.modelState}
                    onOk={this.handleOk}
                    confirmLoading={this.props.state.account.confirmLoading}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                >
                {this.props.state.account.modelName !== 'delete' && <CreateAccount onRef={(ref) => { this.child = ref }} />}
                {this.props.state.account.modelName === 'delete' && <DeleteAccount onDel={(ref) => { this.del = ref }}/>} 
                    
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
        changeModleState: (data) => { dispatch(Actions.frontUserModleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.frontUserDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.frontUserData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.frontUserModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(AccountModle));