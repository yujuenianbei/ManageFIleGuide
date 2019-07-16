import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { getUserInfo, searchAccount, searchAccountTotal } from '../../fetch/account'
import { Table, Divider, Dropdown, Checkbox, Menu, Icon, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin } from 'antd';
import AccountModle from './model'
import { transToSex } from '../../func/account'

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
        this.checkBoxOnChange(this.props.state.account.checkListCol)
    }

    state = {
        indeterminate: true,
        checkAll: false,
        defaultColumns: [
            // {
            //     title: '用户名',
            //     dataIndex: 'userName',
            //     key: 'userName',
            //     render: text => <a href="javascript:;">{text}</a>,
            // },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text, record) => (
                    <span>
                        {record.sex === 0 ? "男" : "女"}
                    </span>
                ),
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '名',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: '姓',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: '区号',
                dataIndex: 'phoneCode',
                key: 'phoneCode',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '公司',
                dataIndex: 'company',
                key: 'company',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
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
            indeterminate: !!checkedList.length && checkedList.length < this.props.state.account.allCheckcols.length,
            checkAll: checkedList.length === this.props.state.account.allCheckcols.length,
        });
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })

        let title = '';
        this.state.defaultColumns.map(item => {
            if (item.key === this.props.state.account.searchType) {
                title = item.title
            }
        })
        // if (checkedList.indexOf(title) == -1) {
        //     this.props.changeSearchType("")
        // }
    };
    // 全选
    onCheckAllChange = e => {
        this.setState({
            indeterminate: false,
            checkAll: e.target.checked,
        });
        const checkedList = e.target.checked ? this.props.state.account.allCheckcols : []
        this.props.changeCheckListCol(checkedList);
        this.setState({ columns: this.mixColData(checkedList) })
    };

    // 将选择框中的数据和列相对应
    mixColData = (checkedList) => {
        // 获取
        let data = [{
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
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
        data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
        data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
        data.pageSize = size;
        data.start = 0;
        data.sort = this.props.state.account.pageSort;
        // 如果搜索性别需要装换
        if (data.searchType && data.searchType === "sex") {
            data.search = transToSex(data.search);
        }
        searchAccountTotal(data, this.setPageTotal)
        searchAccount(data, this.searchData);
    }
    // 分页
    ChangePage = (page, pageSize) => {
        this.props.changeAccountDataLoading(true);
        // 修改当前页数字
        this.props.changePageNow(page);

        let data = {};
        data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
        data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
        data.pageSize = this.props.state.account.pageSize;
        data.start = page;
        data.sort = this.props.state.account.pageSort;
        // 如果搜索性别需要装换
        if (data.searchType === "sex") {
            data.search = transToSex(this.props.state.account.searchValue);
        }
        searchAccountTotal(data, this.setPageTotal)
        searchAccount(data, this.searchData);
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
        data.search = this.props.state.account.searchValue ? this.props.state.account.searchValue : ""
        data.searchType = this.props.state.account.searchType ? this.props.state.account.searchType : "";
        data.pageSize = this.props.state.account.pageSize;
        data.start = this.props.state.account.pageNow;
        data.sort = this.props.state.account.pageSort;
        // 如果搜索性别需要装换
        if (data.searchType === "sex") {
            data.search = transToSex(this.props.state.account.searchValue);
        }
        searchAccountTotal(data, this.setPageTotal)
        searchAccount(data, this.searchData);
    }


    // 搜索
    searchAccount = (value) => {
        this.props.changeAccountDataLoading(true)
        // 写入搜索内容
        this.props.changeSearchValue(value);
        this.props.changePageNow(1);

        let data = {
            search: value !== "" ? value : "",
            searchType: this.props.state.account.searchType ? this.props.state.account.searchType : "",
            pageSize: this.props.state.account.pageSize,
            start: 1,
            sort: this.props.state.account.pageSort
        };
        // 如果搜索性别需要装换
        if (data.searchType && data.searchType === "sex") {
            data.search = transToSex(value);
        }
        searchAccountTotal(data, this.setPageTotal)
        searchAccount(data, this.searchData);
    }



    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.total.total);
        this.props.changeAccountDataLoading(false)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchAccount.map((item, index) => (
            data[index] = {
                key: item.id,
                userName: item.userName,
                sex: item.sex,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                phoneCode: item.phoneCode,
                phone: item.phone,
                company: item.company,
                password: item.password,
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
                        options={this.props.state.account.allCheckcols}
                        value={this.props.state.account.checkListCol}
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
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                <AccountModle/>
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
                                                value={this.props.state.account.searchType}
                                                style={{ width: '100%' }}
                                                onChange={(value) => this.changeType(value)}>
                                                <Option value="">无</Option>
                                                {this.state.columns.map((item, index) => {
                                                    if (item.key !== 'action') {
                                                        return <Option value={item.key} key={"searchType_"+index}>{item.title}</Option>
                                                    }
                                                })}
                                            </Select>
                                        </Col>
                                        <Col span={16}>
                                            <Search
                                                style={{ width: '100%' }}
                                                defaultValue={this.props.state.account.searchValue}
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
                        dataSource={this.props.state.account.accountData}
                        loading={this.props.state.account.accountLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.props.changeModelData(record)
                                }
                            }
                        }}
                        pagination={{
                            current: this.props.state.account.pageNow,
                            total: this.props.state.account.pageTotal,
                            onChange: this.ChangePage,
                            showSizeChanger: true,
                            onShowSizeChange: this.ChangePageSize,
                            pageSize: this.props.state.account.pageSize,
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
        changeModleState: (data) => { dispatch(Actions.modleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.accountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.accountData(data)); },
        changeModleName: (data) => { dispatch(Actions.modleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.modleTitle(data)); },
        changeModelData: (data) => { dispatch(Actions.modelData(data)); },
        changeCheckListCol: (data) => { dispatch(Actions.checkListCol(data)); },
        changePageSize: (data) => { dispatch(Actions.pageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.pageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.pageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.searchUserValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.searchUserType(data)); },

        // 排序
        changePageSort: (data) => { dispatch(Actions.pageSort(data)); },
        changePageSortCol: (data) => { dispatch(Actions.pageSortCol(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Account));
