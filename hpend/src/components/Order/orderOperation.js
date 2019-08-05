import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './order.module.less';
import { Menu, Dropdown, Button, Modal } from 'antd';
import { timestampToTime } from '../../func/common';
import { delteOrder, searchOrder, searchOrderTotal, } from '../../fetch/order';
const { confirm } = Modal;


class OrderOperation extends PureComponent {

    // 取消订单
    cancelOrder = () => {
        const _this = this;
        const { value, record, index } = this.props;
        console.log(value, record, index)
        confirm({
            title: '是否要取消此订单?',
            content: '订单一旦取消就无法再重新使用',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                delteOrder(record.orderId, _this.finishDelteOrder)
                // return new Promise((resolve, reject) => {
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }

    finishDelteOrder = (result) => {
        if (result.data.deleteOrder.state === 1) {
            this.searchOrderMount();
        }
    }

    // 加载上一次的搜索
    searchOrderMount = (result) => {
        this.props.changeOrderDataLoading(true)
        // this.props.changeOrderTypeList(result.data.AllProductType)

        let searchValue;
        if (this.props.state.order.searchType === 'type' && !!this.props.state.order.searchValue) {
            searchValue = JSON.stringify(this.props.state.order.orderTypeList.filter(item => item.typeName === this.props.state.order.searchValue)[0].id);
        } else {
            searchValue = this.props.state.order.searchValue
        }
        let data = {
            search: this.props.state.order.searchValue ? searchValue : "",
            searchType: this.props.state.order.searchType ? this.props.state.order.searchType : "",
            pageSize: this.props.state.order.pageSize,
            start: this.props.state.order.pageNow,
            sort: this.props.state.order.pageSort,
        };
        searchOrderTotal(data, this.setPageTotal)
        searchOrder(data, this.searchData);
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalOrderItem.total);
        this.props.changeOrderDataLoading(false)
    }

    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchOrder.map((item, index) => {
            return data[index] = {
                key: index,
                id: item.id,
                name: item.name,
                phoneCode: item.phoneCode,
                phone: item.phone,
                email: item.email,
                productId: item.productId,
                productName: item.productName,
                productNum: item.productNum,
                productType: item.productType,
                productImg: item.productImg,
                usedPrice: item.usedPrice,
                nowPrice: item.nowPrice,
                orderOdd: item.orderOdd,
                payMethod: item.payMethod,
                payTime: item.payTime,
                payState: item.payState,
                deliveryMethod: item.deliveryMethod,
                deliveryHopeTime: item.deliveryHopeTime,
                expressOdd: item.expressOdd,
                goodsResAddress: item.goodsResAddress,
                fullPrice: item.fullPrice,
                orderState: item.orderState,
                orderStateNum: item.orderStateNum,
                orderId: item.orderId,
                createTime: timestampToTime(parseInt(item.createTime)),
                updateTime: timestampToTime(parseInt(item.updateTime)),

            }
        })
        this.props.changeOrderData(data)
        this.props.changeOrderDataLoading(false)
    }


    // 操作菜单列表
    menu = () => {
        const { value, record, index } = this.props;
        console.log(value, record, index)
        return <Menu>
            {/* <Menu.Item>
            <Button title='重新支付' onClick={this.refresh}>重新支付</Button>
        </Menu.Item> */}
            <Menu.Item>
                <Button type="primary" title='修改订单状态' onClick={this.changeOrderState}>修改订单状态</Button>
            </Menu.Item>
            {(this.props.value.orderStateNum === 2 || this.props.value.orderStateNum === 3) &&
                <Menu.Item>
                    <Button type="primary" title='修改订单产品' onClick={this.changeOrderProduct}>修改订单产品</Button>
                </Menu.Item>
            }
            <Menu.Item>
                <Button type="default" title='查看状态历史' onClick={this.showOrderState}>查看状态历史</Button>
            </Menu.Item>
            {this.props.value.orderStateNum !== 1 && this.props.value.orderStateNum !== 2 && this.props.value.orderStateNum !== 3 &&
                <Menu.Item>
                    <Button type="default" title='查看快递状态' onClick={this.showDeliveryState}>查看快递状态</Button>
                </Menu.Item>
            }
            {!(this.props.value.orderStateNum === 1 || this.props.value.orderStateNum === 10) &&
                <Menu.Item>
                    <Button type="danger" title='取消本条订单' onClick={this.cancelOrder}>取消本条订单</Button>
                </Menu.Item>
            }
        </Menu>
    };

    state = { visible: false };

    // 修改订单状态
    changeOrderState = () => {
        this.props.changeModleState(true)
        this.props.changeOrderEdit(true);
        this.props.changeOrderExchange(false);
        this.props.changeModleName('changeOrderState');
        this.props.changeModleTitle('修改订单状态');
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { value, record, index } = this.props;
        return (
            <div className={styles.operation}>
                <Dropdown overlay={this.menu} trigger={['click']} placement="bottomCenter">
                    <Button type="primary" title='操作'>操作</Button>
                </Dropdown>
                {/* <Modal
                    centered
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Steps direction="vertical" size="small" current={1}>
                        <Step title="Finished" description="This is a description." />
                        <Step title="In Progress" description="This is a description." />
                        <Step title="Waiting" description="This is a description." />
                    </Steps>
                </Modal> */}
            </div >
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
        changePageTotal: (data) => { dispatch(Actions.orderPageTotal(data)); },
        changeModleName: (data) => { dispatch(Actions.orderModleName(data)); },
        changeOrderEdit: (data) => { dispatch(Actions.orderEdit(data)); },
        changeOrderExchange: (data) => { dispatch(Actions.orderExchange(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(OrderOperation));