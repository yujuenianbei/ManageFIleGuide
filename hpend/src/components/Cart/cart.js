import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './cart.module.less';
import { searchCart, searchCartTotal } from '../../fetch/cart'
import { getAllproductType } from '../../fetch/productType'
import { timestampToTime, typeToTypeName } from '../../func/common'
import { Table, Divider, Dropdown, Checkbox, Menu, Icon, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin } from 'antd';

const Search = Input.Search;
const InputGroup = Input.Group;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class Cart extends PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        // 首次加载用户数据
        this.props.changeCartDataLoading(true);
        // 先查询完产品分类再查产品
        getAllproductType(this.searchCartMount);

        this.checkBoxOnChange(this.props.state.cart.checkListCol)
    }

    state = {
        indeterminate: true,
        checkAll: false,
        defaultColumns: [
            {
                title: '邮箱',
                dataIndex: 'userEmail',
                key: 'userEmail',
                // width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.userEmail}>
                            {record.userEmail}
                        </span>,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 4;
                    }
                    if (0 < index && index < 4) {
                        obj.props.rowSpan = 0;
                    }
                    return obj
                }
            },
            {
                title: '区号',
                dataIndex: 'phoneCode',
                key: 'phoneCode',
                // width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.phoneCode}>
                            {record.phoneCode}
                        </span>,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 4;
                    }
                    if (0 < index && index < 4) {
                        obj.props.rowSpan = 0;
                    }
                    return obj
                }
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                // width: 105,
                render: (value, record, index) => {
                    const obj = {
                        children: <span title={record.phone}>
                            {record.phone}
                        </span>,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 4;
                    }
                    if (0 < index && index < 4) {
                        obj.props.rowSpan = 0;
                    }
                    return obj
                }
            },
            {
                title: '产品名称',
                dataIndex: 'productName',
                key: 'productName',
                width: '15%',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '类别',
                dataIndex: 'type',
                key: 'type',
                // width: 105,
                render: (text, record) => (
                    <span title={record.type}>
                        {record.type}
                    </span>
                ),
            },
            {
                title: '封面',
                dataIndex: 'img',
                key: 'img',
                width: 120,
                render: (text, record) => {
                    return <img className={styles.productBreImg} src={record.img.split('http').length > 1 ? record.img : 'http://localhost:3004/static/img/' + record.img} title={record.productName} />
                },
            },
            {
                title: '配置参数',
                dataIndex: 'featrues',
                key: 'featrues',
                // width: '15%',
                render: (text, record) => {
                    return JSON.parse(record.featrues).map((item, index) =>
                        <li key={index + '123123'}>
                            <span title={record.item}>{index + 1}. {item}</span>
                        </li>
                    )
                },
            },
            {
                title: '促销信息1',
                dataIndex: 'promotionMessage',
                key: 'promotionMessage',
                render: (text, record) => (
                    <span title={record.promotionMessage}>
                        {record.promotionMessage}
                    </span>
                ),
            },
            {
                title: '促销信息2',
                dataIndex: 'promotionMessageSecond',
                key: 'promotionMessageSecond',
                render: (text, record) => (
                    <span title={record.promotionMessageSecond}>
                        {record.promotionMessageSecond}
                    </span>
                ),
            },
            {
                title: '原价',
                dataIndex: 'usedPrice',
                key: 'usedPrice',
                // width: 105,
            },
            {
                title: '现价',
                dataIndex: 'nowPrice',
                key: 'nowPrice',
                // width: 105,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                // width: 105,
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                // width: 105,
            }
        ],
        columns: [],
    };

    // 显示弹出框
    AddProduct = (e) => {
        if (e === 'add') {
            this.props.changeModleTitle('新增');
            this.props.changeModleName(e);
            this.props.changeModelData('')
        } else if (e === 'edit') {
            this.props.changeModleTitle('修改');
            this.props.changeModleName(e);
        }
        else if (e === 'delete') {
            this.props.changeModleTitle('删除');
            this.props.changeModleName(e);
        }
        this.props.changeModleState(true)
    };

    // 筛选列 点击事件
    handleButtonClick = (e) => {
        console.log(e);
    }
    // 选择列
    checkBoxOnChange = checkedList => {
        this.setState({
            indeterminate: !!checkedList.length && checkedList.length < this.props.state.cart.allCheckcols.length,
            checkAll: checkedList.length === this.props.state.cart.allCheckcols.length,
        });
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })

        let title = '';
        this.state.defaultColumns.map(item => {
            if (item.key === this.props.state.cart.searchType) {
                title = item.title
            }
        })
        if (checkedList.indexOf(title) == -1) {
            this.props.changeSearchType("")
        }
    };
    // 全选
    onCheckAllChange = e => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        const checkedList = e.target.checked ? this.props.state.cart.allCheckcols : []
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })
    };

    // 将选择框中的数据和列相对应
    mixColData = (checkedList) => {
        // 获取
        let data = [{
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
            render: (value, record, index) => {
                const obj = {
                    children: <a href="javascript:;">{value}</a>,
                    props: {},
                };
                let row = [];
                this.props.state.cart.cartData.map((item, index) => {
                    if (index > 0 && this.props.state.cart.cartData[index].key !== this.props.state.cart.cartData[index - 1].key) {
                        console.log(index)
                        row.push(index);
                    }
                })
                row.push(9)
                console.log(row)
                row.map((item, i) => {
                    if (i === 0) {
                        if (index === 0) {
                            obj.props.rowSpan = row[0];
                        }
                        if (0 < index && index < row[0]) {
                            obj.props.rowSpan = 0;
                        }
                    }
                    else {
                        if (index === row[i - 1]) {
                            obj.props.rowSpan = row[i] - row[i - 1];
                            console.log(row[i] - row[i - 1])
                        }
                        if (row[i - 1] < index && index < row[i]) {
                            obj.props.rowSpan = 0;
                        }
                    }
                })

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
            width: 180,
            render: (text, record) => (
                <span>
                    <Button type="primary" onClick={() => console.log('查看')}>查看</Button>
                </span>
            ),
        })
        return data
    }

    // 修改每页展示行数
    ChangePageSize = (current, size) => {
        this.props.changeCartDataLoading(true);
        // 修改行数
        this.props.changePageSize(size);
        // 跳转第一页
        this.props.changePageNow(1);
        let searchValue;
        if (this.props.state.cart.searchType === 'type' && !!this.props.state.cart.searchValue) {
            searchValue = JSON.stringify(this.props.state.cart.cartTypeList.filter(item => item.typeName === this.props.state.cart.searchValue)[0].id);
        } else {
            searchValue = this.props.state.cart.searchValue
        }
        let data = {
            search: this.props.state.cart.searchValue ? searchValue : "",
            searchType: this.props.state.cart.searchType ? this.props.state.cart.searchType : "",
            pageSize: size,
            start: 0,
            sort: this.props.state.cart.pageSort,
        };
        searchCartTotal(data, this.setPageTotal)
        searchCart(data, this.searchData);
    }
    // 分页
    ChangePage = (page, pageSize) => {
        this.props.changeCartDataLoading(true);
        // 修改当前页数字
        this.props.changePageNow(page);
        let searchValue;
        if (this.props.state.cart.searchType === 'type' && !!this.props.state.cart.searchValue) {
            searchValue = JSON.stringify(this.props.state.cart.cartTypeList.filter(item => item.typeName === this.props.state.cart.searchValue)[0].id);
        } else {
            searchValue = this.props.state.cart.searchValue
        }
        let data = {
            search: this.props.state.cart.searchValue ? searchValue : "",
            searchType: this.props.state.cart.searchType ? this.props.state.cart.searchType : "",
            pageSize: this.props.state.cart.pageSize,
            start: page,
            sort: this.props.state.cart.pageSort,
        };
        searchCartTotal(data, this.setPageTotal)
        searchCart(data, this.searchData);
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
    searchCartMount = (result) => {
        this.props.changeCartDataLoading(true)
        this.props.changeCartTypeList(result.data.AllProductType)

        let searchValue;
        if (this.props.state.cart.searchType === 'type' && !!this.props.state.cart.searchValue) {
            searchValue = JSON.stringify(this.props.state.cart.cartTypeList.filter(item => item.typeName === this.props.state.cart.searchValue)[0].id);
        } else {
            searchValue = this.props.state.cart.searchValue
        }
        let data = {
            search: this.props.state.cart.searchValue ? searchValue : "",
            searchType: this.props.state.cart.searchType ? this.props.state.cart.searchType : "",
            pageSize: this.props.state.cart.pageSize,
            start: this.props.state.cart.pageNow,
            sort: this.props.state.cart.pageSort,
        };
        searchCartTotal(data, this.setPageTotal)
        searchCart(data, this.searchData);
    }


    // 搜索
    searchCart = (value) => {
        this.props.changeCartDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue(value);
        this.props.changePageNow(1);
        let searchValue;
        if (this.props.state.cart.searchType === 'type' && !!value) {
            searchValue = JSON.stringify(this.props.state.cart.cartTypeList.filter(item => item.typeName === value)[0].id);
        } else {
            searchValue = value
        }
        let data = {
            search: value !== "" ? searchValue : "",
            searchType: this.props.state.cart.searchType ? this.props.state.cart.searchType : "",
            pageSize: this.props.state.cart.pageSize,
            start: 1,
            sort: this.props.state.cart.pageSort
        };
        searchCartTotal(data, this.setPageTotal);
        searchCart(data, this.searchData);
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalCartItem.total);
        this.props.changeCartDataLoading(false)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchCart.map((item, index) => {
            return data[index] = {
                key: item.id,
                userName: item.name,
                userEmail: item.email,
                phoneCode: item.phoneCode,
                phone: item.phoneCode,
                productName: item.productName,
                type: item.typeName,
                img: item.img,
                featrues: item.featrues,
                promotionMessage: item.promotionMessage,
                promotionMessageSecond: item.promotionMessageSecond,
                usedPrice: item.usedPrice,
                nowPrice: item.nowPrice,
                productNum: item.productNum,
                createTime: timestampToTime(parseInt(item.createTime)),
                updateTime: timestampToTime(parseInt(item.updateTime)),
            }
        })
        this.props.changeCartData(data)
        this.props.changeCartDataLoading(false)
    }

    // 清空搜索
    clearAll = () => {
        this.props.changeCartDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue('');
        this.props.changeSearchType('')
        this.props.changePageNow(1);
        let data = {
            search: "",
            searchType: "",
            pageSize: this.props.state.cart.pageSize,
            start: 1,
            sort: this.props.state.cart.pageSort
        };
        searchCartTotal(data, this.setPageTotal)
        searchCart(data, this.searchData);
    }

    // 更新
    refresh = () => {
        this.props.changeCartDataLoading(true)
        let searchValue;
        if (this.props.state.cart.searchType === 'type' && !!this.props.state.cart.searchValue) {
            searchValue = JSON.stringify(this.props.state.cart.cartTypeList.filter(item => item.typeName === this.props.state.cart.searchValue)[0].id);
        } else {
            searchValue = this.props.state.cart.searchValue
        }
        let data = {
            search: this.props.state.cart.searchValue ? searchValue : "",
            searchType: this.props.state.cart.searchType ? this.props.state.cart.searchType : "",
            pageSize: this.props.state.cart.pageSize,
            start: this.props.state.cart.pageNow,
            sort: this.props.state.cart.pageSort,
        };
        searchCartTotal(data, this.setPageTotal)
        searchCart(data, this.searchData);
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
                        options={this.props.state.cart.allCheckcols}
                        value={this.props.state.cart.checkListCol}
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
                    <Breadcrumb.Item>购物车管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* <ProductModle /> */}
                <div className={styles.content}>
                    <div className={styles.search}>
                        <Row>
                            <Col span={8}>
                                <Button type="primary" onClick={() => this.AddProduct('add')}>新增</Button>
                                <Dropdown.Button onClick={this.handleButtonClick} overlay={checkSlect} trigger={['click']} style={{ marginLeft: 10 }}>
                                    筛选列
                                </Dropdown.Button>
                            </Col>
                            <Col span={12} offset={4}>
                                <Row>

                                    <InputGroup compact >
                                        <Col span={8}>
                                            <Button type="primary" onClick={() => this.clearAll()}>清空</Button>
                                            <Select
                                                value={this.props.state.cart.searchType}
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
                                                defaultValue={this.props.state.cart.searchValue}
                                                value={this.props.state.cart.searchValue}
                                                onChange={value => this.searchValueChange(value)}
                                                placeholder="请输入与筛选选项相对应的搜索内容(除类型和配置外都支持模糊搜索)"
                                                onSearch={value => this.searchCart(value)}
                                                enterButton />
                                            <Button type="primary" icon="redo" style={{ marginLeft: 10 }} title='更新' onClick={this.refresh} />
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.props.state.cart.cartData}
                        loading={this.props.state.cart.cartLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.props.changeModelData(record)
                                }
                            }
                        }}
                        pagination={{
                            current: this.props.state.cart.pageNow,
                            total: this.props.state.cart.pageTotal,
                            onChange: this.ChangePage,
                            showSizeChanger: true,
                            onShowSizeChange: this.ChangePageSize,
                            pageSize: this.props.state.cart.pageSize,
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
        changeModleState: (data) => { dispatch(Actions.cartModleState(data)); },
        changeCartDataLoading: (data) => { dispatch(Actions.cartDataLoading(data)); },
        changeCartData: (data) => { dispatch(Actions.cartData(data)); },
        changeModleName: (data) => { dispatch(Actions.cartModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.cartModleTitle(data)); },
        changeModelData: (data) => { dispatch(Actions.cartModelData(data)); },
        changeCheckListCol: (data) => { dispatch(Actions.cartCheckListCol(data)); },
        changePageSize: (data) => { dispatch(Actions.cartPageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.cartPageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.cartPageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.cartSearchValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.cartSearchType(data)); },

        // 排序
        changePageSort: (data) => { dispatch(Actions.cartPageSort(data)); },
        changePageSortCol: (data) => { dispatch(Actions.cartPageSortCol(data)); },
        // 产品分类
        changeCartTypeList: (data) => { dispatch(Actions.cartTypeList(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Cart));
