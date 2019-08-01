import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
import { getUserInfo } from '../../fetch/order';
import { Menu, Dropdown, Button, Modal } from 'antd';
const { confirm } = Modal;

class OrderOperation extends PureComponent {
    // 取消订单
    cancelOrder = () => {
        confirm({
            title: '是否要取消此订单?',
            content: '订单一旦取消就无法再重新使用',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }
    // 操作菜单列表
    menu = (
        <Menu>
            {/* <Menu.Item>
                <Button title='重新支付' onClick={this.refresh}>重新支付</Button>
            </Menu.Item> */}
            <Menu.Item>
                <Button type="primary" title='修改订单状态' onClick={this.changeOrderState}>修改订单状态</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="primary" title='修改订单产品' onClick={this.changeOrderProduct}>修改订单产品</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="default" title='查看状态历史' onClick={this.showOrderState}>查看状态历史</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="default" title='查看快递状态' onClick={this.showDeliveryState}>查看快递状态</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="danger" title='取消本条订单' onClick={this.cancelOrder}>取消本条订单</Button>
            </Menu.Item>
        </Menu>
    );

    render() {
        const { value, record, index } = this.props;
        return (
            <div className={styles.operation}>
                <Dropdown overlay={this.menu} trigger={['click']} placement="bottomCenter">
                    <Button type="primary" title='操作'>操作</Button>
                </Dropdown>

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
)(classify(styles)(OrderOperation));