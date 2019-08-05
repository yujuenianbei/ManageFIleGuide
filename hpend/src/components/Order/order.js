// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
import { Breadcrumb, Button, Checkbox, Col, Divider, Dropdown, Input, Menu, Row, Select, Table } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/index';
import { searchOrder, searchOrderTotal } from '../../fetch/order';
import { getAllproductType } from '../../fetch/productType';
import { timestampToTime } from '../../func/common';
// http
import { http } from '../../http';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import OrderModle from './model';
import OrderOperation from './orderOperation';
import styles from './order.module.less';

const Search = Input.Search;
const InputGroup = Input.Group;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class Order extends PureComponent {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        // 首次加载用户数据
        this.props.changeOrderDataLoading(true);
        // 先查询完产品分类再查产品
        getAllproductType(this.searchOrderMount);

        this.checkBoxOnChange(this.props.state.order.checkListCol);
    }
    
    // 计算合并单元格 根据用户合并
    rowCol = (obj, index, name) => {
        let row = [];
        this.props.state.order.orderData.map((item, index) => {
            if (index > 0 && this.props.state.order.orderData[index].name !== this.props.state.order.orderData[index - 1].name) {
                row.push(index - 1);
            }
        })
        row.push(this.props.state.order.pageSize - 1)
        row.map((item, i) => {
            if (i === 0) {
                if (index === 0) {
                    obj.props.rowSpan = row[0] + 1;
                }
                if (0 < index && index <= row[0]) {
                    obj.props.rowSpan = 0;
                }
            }
            else {
                if (index === row[i - 1] + 1) {
                    obj.props.rowSpan = row[i] - row[i - 1];
                }
                if (row[i - 1] + 1 < index && index <= row[i] + 1) {
                    obj.props.rowSpan = 0;
                }
            }
        })
    }

    // 根据订单合并单元格
    orderRowCol = (obj, index) => {
        let row = [];
        const orderNewData = this.props.state.order.orderData.sort(function (x, y) {
            if (x.orderOdd > y.orderOdd) {
                return 1;
            } else if (x.orderOdd === y.orderOdd) {
                return x.name > y.name ? 1 : -1;
            } else if (x.orderOdd < y.orderOdd) {
                return -1;
            }
        })
        orderNewData.map((item, index) => {
            if (index > 0 && orderNewData[index].orderOdd !== orderNewData[index - 1].orderOdd) {
                row.push(index - 1);
            }
        })
        row.push(this.props.state.order.pageSize - 1)
        row.map((item, i) => {
            if (i === 0) {
                if (index === 0) {
                    obj.props.rowSpan = row[0] + 1;
                }
                if (0 < index && index <= row[0]) {
                    obj.props.rowSpan = 0;
                }
            }
            else {
                if (index === row[i - 1] + 1) {
                    obj.props.rowSpan = row[i] - row[i - 1];
                }
                if (row[i - 1] + 1 < index && index <= row[i] + 1) {
                    obj.props.rowSpan = 0;
                }
            }
        })
    }

    state = {
        indeterminate: true,
        checkAll: false,
        defaultColumns: [
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                width: 200,
                render: (value, record, index) => {
                    const obj = {
                        children: <span style={{ wordBreak: 'break-word' }} title={record.email}>
                            {record.email}
                        </span>,
                        props: {},
                    };
                    this.rowCol(obj, index)
                    return obj
                }
            },
            {
                title: '区号',
                dataIndex: 'phoneCode',
                key: 'phoneCode',
                width: 70,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.phoneCode}>
                            {record.phoneCode}
                        </span>,
                        props: {},
                    };
                    this.rowCol(obj, index)
                    return obj
                }
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                width: 130,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.phone}>
                            {record.phone}
                        </span>,
                        props: {},
                    };
                    this.rowCol(obj, index)
                    return obj
                }
            },
            {
                title: '订单号',
                dataIndex: 'orderOdd',
                key: 'orderOdd',
                width: 240,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.orderOdd}>
                            {record.orderOdd}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '支付方式',
                dataIndex: 'payMethod',
                key: 'payMethod',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.payMethod}>
                            {record.payMethod}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '支付时间',
                dataIndex: 'payTime',
                key: 'payTime',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.payTime}>
                            {record.payTime}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '支付状态',
                dataIndex: 'payState',
                key: 'payState',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.payState}>
                            {record.payState}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '快递名称',
                dataIndex: 'deliveryMethod',
                key: 'deliveryMethod',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.deliveryMethod}>
                            {record.deliveryMethod}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '期望时间',
                dataIndex: 'deliveryHopeTime',
                key: 'deliveryHopeTime',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.deliveryHopeTime}>
                            {record.deliveryHopeTime}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '快递单号',
                dataIndex: 'expressOdd',
                key: 'expressOdd',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.expressOdd}>
                            {record.expressOdd}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '收货地址',
                dataIndex: 'goodsResAddress',
                key: 'goodsResAddress',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.goodsResAddress}>
                            <Button type="primary" onClick={() => this.EditOrderAddress('showResInfo', record)}>查看</Button>
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '总价',
                dataIndex: 'fullPrice',
                key: 'fullPrice',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.fullPrice}>
                            {record.fullPrice}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '订单状态',
                dataIndex: 'orderState',
                key: 'orderState',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.orderState}>
                            {record.orderState}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.createTime}>
                            {record.createTime}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.updateTime}>
                            {record.updateTime}
                        </span>,
                        props: {},
                    };
                    this.orderRowCol(obj, index)
                    return obj
                }
            },
            {
                title: '产品名称',
                dataIndex: 'productName',
                key: 'productName',
                width: 300,
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '类别',
                dataIndex: 'productType',
                key: 'productType',
                width: 105,
                render: (text, record) => (
                    <span title={record.productType}>
                        {record.productType}
                    </span>
                ),
            },
            {
                title: '封面',
                dataIndex: 'productImg',
                key: 'productImg',
                width: 130,
                render: (text, record) => {
                    return <img className={styles.productBreImg} src={record.productImg.split('http').length > 1 ? record.productImg : http.img + record.productImg} title={record.productName} />
                },
            },
            {
                title: '数量',
                dataIndex: 'productNum',
                key: 'productNum',
                width: 130,
                render: (text, record) => (
                    <span title={record.productNum}>
                        {record.productNum}
                    </span>
                ),
            },
            {
                title: '原价',
                dataIndex: 'usedPrice',
                key: 'usedPrice',
                width: 105,
            },
            {
                title: '现价',
                dataIndex: 'nowPrice',
                key: 'nowPrice',
                width: 105,
            }
        ],
        columns: [],
        Twidth: 0
    };

    // 显示弹出框
    EditOrderAddress = (e, record) => {
        if (e === 'showResInfo') {
            this.props.changeModleTitle('查看收货地址');
            this.props.changeModleName(e);
            this.props.changeModelData('');
            this.props.changeModelData(record)
        }
        this.props.changeModleState(true)
    };

    // 筛选列 点击事件
    handleButtonClick = (e) => {
        console.log(e);
    }

    // 选择列
    checkBoxOnChange = checkedList => {
        // console.log(document.getElementsByClassName('ant-table-wrapper')[0].clientWidth)
        this.setState({
            indeterminate: !!checkedList.length && checkedList.length < this.props.state.order.allCheckcols.length,
            checkAll: checkedList.length === this.props.state.order.allCheckcols.length,
            columns: this.mixColData(checkedList)
        }, () => {
            let width = 0
            checkedList.map(items => {
                this.state.columns.map(item => {
                    if (item.title === items) {
                        width += item.width
                    }
                })
            })
            if (width > document.getElementsByClassName('ant-table-wrapper')[0].clientWidth) {
                this.setState({ Twidth: { x: width } })
            } else {
                this.setState({ Twidth: { x: 'max-content' } })
            }
            console.log(width)
        });
        this.props.changeCheckListCol(checkedList);
    };

    // 全选
    onCheckAllChange = e => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        const checkedList = e.target.checked ? this.props.state.order.allCheckcols : []
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })
    };

    // 将选择框中的数据和列相对应
    mixColData = (checkedList) => {
        // 获取
        let data = [{
            title: '用户名称',
            dataIndex: 'name',
            key: 'name',
            width: 105,
            render: (value, record, index) => {
                const obj = {
                    children: <a href="javascript:;">{value}</a>,
                    props: {},
                };
                this.rowCol(obj, index);
                return obj
            }
        }];

        checkedList.map((i, index) => {
            this.state.defaultColumns.map((t, dindex) => {
                if (i === t.title) {
                    data.push(t)
                }
            })
        })

        data.push({
            title: '操作',
            key: 'action',
            width: 140,
            // fixed: 'right',
            render: (value, record, index) => {
                const obj = {
                    children: <OrderOperation value={value} record={record} index={index}/>,
                    props: {},
                };
                this.orderRowCol(obj, index)
                return obj
            }
        })
        return data
    }

    // 修改每页展示行数
    ChangePageSize = (current, size) => {
        this.props.changeOrderDataLoading(true);
        // 修改行数
        this.props.changePageSize(size);
        // 跳转第一页
        this.props.changePageNow(1);
        let searchValue;
        if (this.props.state.order.searchType === 'type' && !!this.props.state.order.searchValue) {
            searchValue = JSON.stringify(this.props.state.order.orderTypeList.filter(item => item.typeName === this.props.state.order.searchValue)[0].id);
        } else {
            searchValue = this.props.state.order.searchValue
        }
        let data = {
            search: this.props.state.order.searchValue ? searchValue : "",
            searchType: this.props.state.order.searchType ? this.props.state.order.searchType : "",
            pageSize: size,
            start: 0,
            sort: this.props.state.order.pageSort,
        };
        searchOrderTotal(data, this.setPageTotal)
        searchOrder(data, this.searchData);
    }

    // 分页 
    ChangePage = (page, pageSize) => {
        this.props.changeOrderDataLoading(true);
        // 修改当前页数字 
        this.props.changePageNow(page);
        let searchValue;
        if (this.props.state.order.searchType === 'type' && !!this.props.state.order.searchValue) {
            searchValue = JSON.stringify(this.props.state.order.orderTypeList.filter(item => item.typeName === this.props.state.order.searchValue)[0].id);
        } else {
            searchValue = this.props.state.order.searchValue
        }
        let data = {
            search: this.props.state.order.searchValue ? searchValue : "",
            searchType: this.props.state.order.searchType ? this.props.state.order.searchType : "name",
            pageSize: this.props.state.order.pageSize,
            start: page,
            sort: this.props.state.order.pageSort,
        };
        searchOrderTotal(data, this.setPageTotal)
        searchOrder(data, this.searchData);
    }

    // 切换搜索类型 
    changeType = (value) => {
        this.props.changeSearchType(value);
    }

    // 搜索input
    searchValueChange = (value) => {
        this.props.changeSearchValue(value.target.value);
    }

    // 加载上一次的搜索
    searchOrderMount = (result) => {
        this.props.changeOrderDataLoading(true)
        this.props.changeOrderTypeList(result.data.AllProductType)

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

    // 搜索
    searchOrder = (value) => {
        this.props.changeOrderDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue(value);
        this.props.changePageNow(1);
        let searchValue;
        if (this.props.state.order.searchType === 'type' && !!value) {
            searchValue = JSON.stringify(this.props.state.order.orderTypeList.filter(item => item.typeName === value)[0].id);
        } else {
            searchValue = value
        }
        let data = {
            search: value !== "" ? searchValue : "",
            searchType: this.props.state.order.searchType ? this.props.state.order.searchType : "",
            pageSize: this.props.state.order.pageSize,
            start: 1,
            sort: this.props.state.order.pageSort
        };
        searchOrderTotal(data, this.setPageTotal);
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

    // 清空搜索
    clearAll = () => {
        this.props.changeOrderDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue('');
        this.props.changeSearchType('')
        this.props.changePageNow(1);
        let data = {
            search: "",
            searchType: "",
            pageSize: this.props.state.order.pageSize,
            start: 1,
            sort: this.props.state.order.pageSort
        };
        searchOrderTotal(data, this.setPageTotal)
        searchOrder(data, this.searchData);
    }

    // 更新
    refresh = () => {
        this.props.changeOrderDataLoading(true)
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

    render() {
        const checkSlect = (
            <Menu>
                <div className={styles.checkTables}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        全选
                    </Checkbox>
                    <Divider style={{ margin: "5px 0" }} />
                    <CheckboxGroup
                        options={this.props.state.order.allCheckcols}
                        value={this.props.state.order.checkListCol}
                        onChange={this.checkBoxOnChange}
                    />
                    <Divider style={{ margin: "5px 0" }} />
                </div>
            </Menu>
        );
        return (
            <Fragment>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                </Breadcrumb>
                <OrderModle />
                <div className={styles.content}>
                    <div className={styles.search}>
                        <Row>
                            <Col span={8}>
                                <Dropdown.Button onClick={this.handleButtonClick} overlay={checkSlect} trigger={['click']}>
                                    筛选列
                                </Dropdown.Button>
                            </Col>
                            <Col span={12} offset={4}>
                                <Row>
                                    <InputGroup compact >
                                        <Col span={8}>
                                            <Button type="primary" onClick={() => this.clearAll()}>清空</Button>
                                            <Select
                                                value={this.props.state.order.searchType}
                                                style={{ width: '70%', marginLeft: 10 }}
                                                onChange={(value) => this.changeType(value)}>
                                                <Option value="">无</Option>
                                                {this.state.columns.map((item, index) => {
                                                    if (item.key !== 'action') {
                                                        return <Option value={item.key} key={"searchType_" + index}>{item.title}</Option>
                                                    }
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={16}>
                                            <Search
                                                style={{ width: '92%' }}
                                                defaultValue={this.props.state.order.searchValue}
                                                value={this.props.state.order.searchValue}
                                                onChange={value => this.searchValueChange(value)}
                                                placeholder="请输入与筛选选项相对应的搜索内容(除类型和配置外都支持模糊搜索)"
                                                onSearch={value => this.searchOrder(value)}
                                                enterButton />
                                            <Button type="primary" icon="redo" style={{ marginLeft: 10 }} title='更新' onClick={this.refresh} />
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        scroll={this.state.Twidth}
                        bordered
                        columns={this.state.columns}
                        dataSource={this.props.state.order.orderData}
                        loading={this.props.state.order.orderLoading}
                        // onRow={(record) => {
                        //     return {
                        //         onClick: () => {
                        //             this.props.changeModelData(record)
                        //         }
                        //     }
                        // }}
                        pagination={{
                            current: this.props.state.order.pageNow,
                            total: this.props.state.order.pageTotal,
                            onChange: this.ChangePage,
                            showSizeChanger: true,
                            onShowSizeChange: this.ChangePageSize,
                            pageSize: this.props.state.order.pageSize,
                            pageSizeOptions: ['5', '10', '15', '20']
                        }}
                    />
                </div>
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
        changeOrderData: (data) => { dispatch(Actions.orderData(data)); },
        changeModleName: (data) => { dispatch(Actions.orderModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.orderModleTitle(data)); },
        changeModelData: (data) => { dispatch(Actions.orderModelData(data)); },
        changeCheckListCol: (data) => { dispatch(Actions.orderCheckListCol(data)); },
        changePageSize: (data) => { dispatch(Actions.orderPageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.orderPageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.orderPageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.orderSearchValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.orderSearchType(data)); },

        // 排序
        changePageSort: (data) => { dispatch(Actions.orderPageSort(data)); },
        changePageSortCol: (data) => { dispatch(Actions.orderPageSortCol(data)); },
        // 产品分类
        changeOrderTypeList: (data) => { dispatch(Actions.orderTypeList(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Order));
