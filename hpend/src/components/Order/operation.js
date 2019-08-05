import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
import { deleteOrder, searchOrder, searchOrderTotal } from '../../fetch/order'
import { Steps } from 'antd';
const { Step } = Steps;
class OperateOrder extends PureComponent {

    componentDidMount() {
        this.props.onOpe(this);
    }
    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        // deleteOrder(this.props.state.order.modelData, this.deleteFinish)
        this.props.changeModleState(false);
        // this.props.changeModelData('');
        this.props.changeModleTitle('');
        this.props.changeModleName('');
        // this.props.changeOrderExchange(false);
        // this.props.changeOrderEdit(false);
    };

    // 取消提交
    cancelSubmit = () => {
        console.log(123123123)
        this.props.changeModleState(false);
        // this.props.changeModelData('');
        this.props.changeModleTitle('');
        this.props.changeModleName('');
        // this.props.changeOrderExchange(false);
        // this.props.changeOrderEdit(false);
    }

    render() {
        return (
            <div>
                {/* {
                    this.props.state.order.modleName === 'changeOrderState' && */}
                    <Fragment>
                        <Steps direction="vertical" size="small" current={1}>
                            <Step title="Finished" description="This is a description." />
                            <Step title="In Progress" description="This is a description." />
                            <Step title="Waiting" description="This is a description." />
                        </Steps>
                    </Fragment>
                {/* } */}
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
        changeModleState: (data) => { dispatch(Actions.orderModleState(data)); },
        changeOrderDataLoading: (data) => { dispatch(Actions.orderDataLoading(data)); },
        changeOrderData: (data) => { dispatch(Actions.orderData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.orderModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.orderModelData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        changePageTotal: (data) => { dispatch(Actions.orderPageTotal(data)); },
        changePageNow: (data) => { dispatch(Actions.orderPageNow(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(OperateOrder));