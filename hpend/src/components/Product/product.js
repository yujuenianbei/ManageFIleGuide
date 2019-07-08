import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
import { searchProduct, searchProductTotal } from '../../fetch/product'
import { timestampToTime } from '../../func/common'
import { Table, Divider, Dropdown, Checkbox, Menu, Icon, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin } from 'antd';
// import AccountModle from './model'

const Search = Input.Search;
const InputGroup = Input.Group;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class Account extends PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        // 首次加载用户数据
        this.props.changeAccountDataLoading(true);
        this.searchAccountMount();
        this.checkBoxOnChange(this.props.state.product.checkListCol)
    }

    state = {
        indeterminate: true,
        checkAll: false,
        defaultColumns: [
            {
                title: '类别',
                dataIndex: 'type',
                key: 'type',
                width: 105,
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
                    return <img className={styles.productBreImg} src={record.img} title={record.productName} />
                },
            },
            {
                title: '配置参数',
                dataIndex: 'featrues',
                key: 'featrues',
                width: '15%',
                render: (text, record) => {
                    return JSON.parse(record.featrues).map((item, index) =>
                        <li>
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
                width: 105,
            },
            {
                title: '现价',
                dataIndex: 'nowPrice',
                key: 'nowPrice',
                width: 105,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 105,
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: 105,
            }
        ],
        columns: [],
    };

    // 显示弹出框
    AddAccount = (e) => {
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
            indeterminate: !!checkedList.length && checkedList.length < this.props.state.product.allCheckcols.length,
            checkAll: checkedList.length === this.props.state.product.allCheckcols.length,
        });
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })

        let title = '';
        this.state.defaultColumns.map(item => {
            if (item.key === this.props.state.product.searchType) {
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
        const checkedList = e.target.checked ? this.props.state.product.allCheckcols : []
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })
    };

    // 将选择框中的数据和列相对应
    mixColData = (checkedList) => {
        // 获取
        let data = [{
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
            width: '15%',
            render: text => <a href="javascript:;">{text}</a>,
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
                    <Button type="primary" onClick={() => this.AddAccount('edit')}>修改</Button>
                    <Divider type="vertical" />
                    <Button type="default" onClick={() => this.AddAccount('delete')}>删除</Button>
                </span>
            ),
        })
        return data
    }

    // 修改每页展示行数
    ChangePageSize = (current, size) => {
        this.props.changeAccountDataLoading(true);
        // 修改行数
        this.props.changePageSize(size);
        // 跳转第一页
        this.props.changePageNow(1);

        let data = {};
        data.search = this.props.state.product.searchValue ? this.props.state.product.searchValue : ""
        data.searchType = this.props.state.product.searchType ? this.props.state.product.searchType : "";
        data.pageSize = size;
        data.start = 0;
        data.sort = this.props.state.product.pageSort;
        // // 如果搜索性别需要装换
        // if (data.searchType && data.searchType === "sex") {
        //     data.search = transToSex(data.search);
        // }
        searchProductTotal(data, this.setPageTotal)
        searchProduct(data, this.searchData);
    }
    // 分页
    ChangePage = (page, pageSize) => {
        this.props.changeAccountDataLoading(true);
        // 修改当前页数字
        this.props.changePageNow(page);

        let data = {};
        data.search = this.props.state.product.searchValue ? this.props.state.product.searchValue : ""
        data.searchType = this.props.state.product.searchType ? this.props.state.product.searchType : "";
        data.pageSize = this.props.state.product.pageSize;
        data.start = page;
        data.sort = this.props.state.product.pageSort;
        // // 如果搜索性别需要装换
        // if (data.searchType === "sex") {
        //     data.search = transToSex(this.props.state.product.searchValue);
        // }
        searchProductTotal(data, this.setPageTotal)
        searchProduct(data, this.searchData);
    }

    // 切换搜索类型 
    changeType = (value) => {
        this.props.changeSearchType(value);
    }
    // 搜索input
    searchValueChange = (value) => {
        this.props.changeSearchValue(value);
    }

    // 加载上一次的搜索
    searchAccountMount = () => {
        this.props.changeAccountDataLoading(true)

        let data = {};
        data.search = this.props.state.product.searchValue ? this.props.state.product.searchValue : ""
        data.searchType = this.props.state.product.searchType ? this.props.state.product.searchType : "";
        data.pageSize = this.props.state.product.pageSize;
        data.start = this.props.state.product.pageNow;
        data.sort = this.props.state.product.pageSort;
        // 如果搜索性别需要装换
        // if (data.searchType === "sex") {
        //     data.search = transToSex(this.props.state.product.searchValue);
        // }
        searchProductTotal(data, this.setPageTotal)
        searchProduct(data, this.searchData);
    }


    // 搜索
    searchAccount = (value) => {
        this.props.changeAccountDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue(value);
        this.props.changePageNow(1);

        let data = {
            search: value !== "" ? value : "",
            searchType: this.props.state.product.searchType ? this.props.state.product.searchType : "",
            pageSize: this.props.state.product.pageSize,
            start: 1,
            sort: this.props.state.product.pageSort
        };
        // 如果搜索性别需要装换
        // if (data.searchType && data.searchType === "sex") {
        //     data.search = transToSex(value);
        // }
        searchProductTotal(data, this.setPageTotal)
        searchProduct(data, this.searchData);
    }



    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalProduct.total);
        this.props.changeAccountDataLoading(false)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchProduct.map((item, index) => (
            data[index] = {
                key: item.id,
                productName: item.productName,
                type: item.type,
                img: item.img,
                featrues: item.featrues,
                promotionMessage: item.promotionMessage,
                promotionMessageSecond: item.promotionMessageSecond,
                usedPrice: item.usedPrice,
                nowPrice: item.nowPrice,
                createTime: timestampToTime(parseInt(item.createTime)),
                updateTime: timestampToTime(parseInt(item.updateTime)),
            }
        ))
        this.props.changeAccountData(data)
        this.props.changeAccountDataLoading(false)
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
                        options={this.props.state.product.allCheckcols}
                        value={this.props.state.product.checkListCol}
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
                    <Breadcrumb.Item>产品管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* <AccountModle/> */}
                <div className={styles.content}>
                    <div className={styles.search}>
                        <Row>
                            <Col span={8}>
                                <Button type="primary" onClick={() => this.AddAccount('add')}>新增</Button>
                                <Dropdown.Button onClick={this.handleButtonClick} overlay={checkSlect} trigger={['click']} style={{ marginLeft: 10 }}>
                                    筛选列
                                </Dropdown.Button>
                            </Col>
                            <Col span={12} offset={4}>
                                <Row>
                                    <InputGroup compact >
                                        <Col span={8}>
                                            <Select
                                                value={this.props.state.product.searchType}
                                                style={{ width: '100%' }}
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
                                                style={{ width: '100%' }}
                                                defaultValue={this.props.state.product.searchValue}
                                                onChange={value => this.searchValueChange(value)}
                                                placeholder="请输入与筛选选项相对应的搜索内容"
                                                onSearch={value => this.searchAccount(value)}
                                                enterButton />
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.props.state.product.productData}
                        loading={this.props.state.product.productLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.props.changeModelData(record)
                                }
                            }
                        }}
                        pagination={{
                            current: this.props.state.product.pageNow,
                            total: this.props.state.product.pageTotal,
                            onChange: this.ChangePage,
                            showSizeChanger: true,
                            onShowSizeChange: this.ChangePageSize,
                            pageSize: this.props.state.product.pageSize,
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
        changeModleState: (data) => { dispatch(Actions.productModleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.productAccountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.productAccountData(data)); },
        changeModleName: (data) => { dispatch(Actions.productModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productModleTitle(data)); },
        changeModelData: (data) => { dispatch(Actions.productModelData(data)); },
        changeCheckListCol: (data) => { dispatch(Actions.productCheckListCol(data)); },
        changePageSize: (data) => { dispatch(Actions.productPageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.productPageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.productPageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.productSearchUserValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.productSearchUserType(data)); },

        // 排序
        changePageSort: (data) => { dispatch(Actions.productPageSort(data)); },
        changePageSortCol: (data) => { dispatch(Actions.productPageSortCol(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Account));
