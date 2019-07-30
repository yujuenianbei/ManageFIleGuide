import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
import { getAllproductType, createProductType, updateProductType, deleteProductType, searchProductType, searchProductTypeTotal } from '../../fetch/productType'
import { timestampToTime, typeToTypeName } from '../../func/common'
import { Table, Divider, Dropdown, Checkbox, Menu, Icon, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin } from 'antd';
import ProductTypeModle from './model'

const Search = Input.Search;
const InputGroup = Input.Group;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class Product extends PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        // 首次加载用户数据
        this.props.changeProductDataLoading(true);
        // 先查询完产品分类再查产品
        getAllproductType(this.searchProductTypeMount);

        this.checkBoxOnChange(this.props.state.productType.checkListCol)
    }

    state = {
        indeterminate: true,
        checkAll: false,
        defaultColumns: [
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 300,
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: 300,
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
            indeterminate: !!checkedList.length && checkedList.length < this.props.state.productType.typeAllCheckcols.length,
            checkAll: checkedList.length === this.props.state.productType.typeAllCheckcols.length,
        });
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })

        let title = '';
        this.state.defaultColumns.map(item => {
            if (item.key === this.props.state.productType.searchType) {
                title = item.title
            }
        })
    };
    // 全选
    onCheckAllChange = e => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        const checkedList = e.target.checked ? this.props.state.productType.typeAllCheckcols : []
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })
    };

    // 将选择框中的数据和列相对应
    mixColData = (checkedList) => {
        // 获取
        let data = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (text, record) => (
                <span title={record.key}>
                    {record.key}
                </span>
            ),
        }, {
            title: '分类名称',
            dataIndex: 'typeName',
            key: 'typeName',
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
                    <Button type="primary" onClick={() => this.AddProduct('edit')}>修改</Button>
                    <Divider type="vertical" />
                    <Button type="default" onClick={() => this.AddProduct('delete')}>删除</Button>
                </span>
            ),
        })
        return data
    }

    // 修改每页展示行数
    ChangePageSize = (current, size) => {
        this.props.changeProductDataLoading(true);
        // 修改行数
        this.props.changePageSize(size);
        // 跳转第一页
        this.props.changePageNow(1);
        let data = {
            search: this.props.state.productType.searchValue ? this.props.state.productType.searchValue : "",
            searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
            pageSize: size,
            start: 0,
            sort: this.props.state.productType.pageSort,
        };
        searchProductTypeTotal(data, this.setPageTotal)
        searchProductType(data, this.searchData);
    }
    // 分页
    ChangePage = (page, pageSize) => {
        this.props.changeProductDataLoading(true);
        // 修改当前页数字
        this.props.changePageNow(page);
        let data = {
            search: this.props.state.productType.searchValue ? this.props.state.productType.searchValue : "",
            searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
            pageSize: this.props.state.productType.pageSize,
            start: page,
            sort: this.props.state.productType.pageSort,
        };
        searchProductTypeTotal(data, this.setPageTotal)
        searchProductType(data, this.searchData);
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
    searchProductTypeMount = (result) => {
        this.props.changeProductDataLoading(true)
        let data = {
            search: this.props.state.productType.searchValue ? this.props.state.productType.searchValue : "",
            searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
            pageSize: this.props.state.productType.pageSize,
            start: this.props.state.productType.pageNow,
            sort: this.props.state.productType.pageSort,
        };
        searchProductTypeTotal(data, this.setPageTotal)
        searchProductType(data, this.searchData);
    }


    // 搜索
    searchProductType = (value) => {
        this.props.changeProductDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue(value);
        this.props.changePageNow(1);
        let data = {
            search: value !== "" ? value : "",
            searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
            pageSize: this.props.state.productType.pageSize,
            start: 1,
            sort: this.props.state.productType.pageSort
        };
        searchProductTypeTotal(data, this.setPageTotal);
        searchProductType(data, this.searchData);
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalProductType.total);
        this.props.changeProductDataLoading(false)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchProductType.map((item, index) => {
            return data[index] = {
                key: item.id,
                id: item.id,
                typeName: item.typeName,
                createTime: timestampToTime(parseInt(item.createTime)),
                updateTime: timestampToTime(parseInt(item.updateTime)),
            }
        })
        this.props.changeProductData(data)
        this.props.changeProductDataLoading(false)
    }

    // 清空搜索
    clearAll = () => {
        this.props.changeProductDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue('');
        this.props.changeSearchType('')
        this.props.changePageNow(1);
        let data = {
            search: "",
            searchType: "",
            pageSize: this.props.state.productType.pageSize,
            start: 1,
            sort: this.props.state.productType.pageSort
        };
        searchProductTypeTotal(data, this.setPageTotal)
        searchProductType(data, this.searchData);
    }

    // 更新
    refresh = () => {
        this.props.changeProductDataLoading(true)
        let data = {
            search: this.props.state.productType.searchValue ? this.props.state.productType.searchValue : "",
            searchType: this.props.state.productType.searchType ? this.props.state.productType.searchType : "",
            pageSize: this.props.state.productType.pageSize,
            start: this.props.state.productType.pageNow,
            sort: this.props.state.productType.pageSort,
        };
        searchProductTypeTotal(data, this.setPageTotal)
        searchProductType(data, this.searchData);
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
                        options={this.props.state.productType.typeAllCheckcols}
                        value={this.props.state.productType.checkListCol}
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
                <ProductTypeModle />
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
                                                value={this.props.state.productType.searchType}
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
                                                defaultValue={this.props.state.productType.searchValue}
                                                value={this.props.state.productType.searchValue}
                                                onChange={value => this.searchValueChange(value)}
                                                placeholder="请输入与筛选选项相对应的搜索内容(除类型和配置外都支持模糊搜索)"
                                                onSearch={value => this.searchProductType(value)}
                                                enterButton />
                                            <Button type="primary" icon="redo" style={{ marginLeft: 10 }} title='更新' onClick={this.refresh} />
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.props.state.productType.productData}
                        loading={this.props.state.productType.productLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.props.changeModelData(record)
                                }
                            }
                        }}
                        pagination={{
                            current: this.props.state.productType.pageNow,
                            total: this.props.state.productType.pageTotal,
                            onChange: this.ChangePage,
                            showSizeChanger: true,
                            onShowSizeChange: this.ChangePageSize,
                            pageSize: this.props.state.productType.pageSize,
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
        changeModleState: (data) => { dispatch(Actions.productTypeModleState(data)); },
        changeProductDataLoading: (data) => { dispatch(Actions.productTypeDataLoading(data)); },
        changeProductData: (data) => { dispatch(Actions.productTypeData(data)); },
        changeModleName: (data) => { dispatch(Actions.productTypeModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productTypeModleTitle(data)); },
        changeModelData: (data) => { dispatch(Actions.productTypeModelData(data)); },
        changeCheckListCol: (data) => { dispatch(Actions.productTypeCheckListCol(data)); },
        changePageSize: (data) => { dispatch(Actions.productTypePageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.productTypePageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.productTypePageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.productTypeSearchValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.productTypeSearchType(data)); },

        // 排序
        changePageSort: (data) => { dispatch(Actions.productTypePageSort(data)); },
        changePageSortCol: (data) => { dispatch(Actions.productTypePageSortCol(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Product));
