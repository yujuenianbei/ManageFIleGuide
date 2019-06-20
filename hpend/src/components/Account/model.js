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

class AccountModle extends PureComponent {
    state = {
        confirmLoading: false,
    };

    handleOk = (e) => {
        this.setState({
            confirmLoading: true,
        });
        // 父组件调用子组件方法
        this.child.handleSubmit(e);
        setTimeout(() => {
            this.props.changeModleState(false);
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            this.setState({
                confirmLoading: false,
            });
        }, 2000);

    };

    handleCancel = () => {
        this.child.cancelSubmit();
        this.props.changeModleState(false);
        this.props.changeModleTitle('');
        this.props.changeModleName('');
    };

    render() {
        return (
            <Fragment>
                <Modal
                    centered
                    title={this.props.state.account.modelTitle}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                >
                    <CreateAccount onRef={(ref) => { this.child = ref }} setData={this.props.setData} />
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
        changeModleState: (data) => { dispatch(Actions.modleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.accountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.accountData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.modleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(AccountModle));