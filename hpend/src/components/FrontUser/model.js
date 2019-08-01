import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './frontUser.module.less';
import { Modal, Spin, Form, Icon } from 'antd';

import CreateFrontUser from './createFrontUser';
import DeleteFrontUser from './delete';

class FrontUserModle extends PureComponent {

    handleOk = (e) => {
        // 父组件调用子组件方法
        if(this.props.state.frontUser.modelName !== 'delete'){
            this.child.handleSubmit(e);
        } else {
            this.del.handleSubmit(e);  
        }
    };

    handleCancel = () => {
        if(this.props.state.frontUser.modelName !== 'delete'){
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
                    title={this.props.state.frontUser.modelTitle}
                    visible={this.props.state.frontUser.modelState}
                    onOk={this.handleOk}
                    confirmLoading={this.props.state.frontUser.confirmLoading}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                >
                {this.props.state.frontUser.modelName !== 'delete' && <CreateFrontUser onRef={(ref) => { this.child = ref }} />}
                {this.props.state.frontUser.modelName === 'delete' && <DeleteFrontUser onDel={(ref) => { this.del = ref }}/>} 
                    
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
        changeFrontUserDataLoading: (data) => { dispatch(Actions.frontUserDataLoading(data)); },
        changeFrontUserData: (data) => { dispatch(Actions.frontUserData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.frontUserModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.frontUserModleTitle(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(FrontUserModle));