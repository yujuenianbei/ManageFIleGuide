import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './account.module.less';
import { getUserInfo } from '../../fetch/account'
import { Table, Divider, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin } from 'antd';
import AccountModle from './model'

const Search = Input.Search;
const InputGroup = Input.Group;
const { Option } = Select;


class Account extends PureComponent {
    componentDidMount() {
        // 首次加载用户数据
        this.props.changeAccountDataLoading(true);
        getUserInfo(this.setData);
    }

    // 将返回数据写入
    setData = (result) => {
        let data = []
        result.data.queryAllUsers.map((item, index) => (
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

    render() {
        const columns = [
            {
                title: 'userName',
                dataIndex: 'userName',
                key: 'userName',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'FirstName',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'LastName',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'PhoneCode',
                dataIndex: 'phoneCode',
                key: 'phoneCode',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Company',
                dataIndex: 'company',
                key: 'company',
            },
            {
                title: 'Password',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary" onClick={() => this.AddAccount('edit')}>修改</Button>
                        <Divider type="vertical" />
                        <Button type="default" onClick={() => this.AddAccount('delete')}>删除</Button>
                    </span>
                ),
            },
        ];

        return (
            <Fragment>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                </Breadcrumb>
                <AccountModle
                    visible={this.props.state.user.modelState}
                    setData={this.setData}
                />
                <div className={styles.content}>
                    <div className={styles.search}>
                        <Row>
                            <Col span={8}>
                                <Button type="primary" onClick={() => this.AddAccount('add')}>新增</Button>
                            </Col>
                            <Col span={12} offset={4}>
                                <Row>
                                    <InputGroup compact >
                                        <Col span={8}>
                                            <Select defaultValue="username" style={{ width: '100%' }}>
                                                <Option value="username">用户名</Option>
                                                <Option value="lastname">姓</Option>
                                                <Option value="firstname">名</Option>
                                                <Option value="phone">电话</Option>
                                                <Option value="email">邮箱</Option>
                                                <Option value="company">公司</Option>
                                            </Select>
                                        </Col>
                                        <Col span={16}>
                                            <Search style={{ width: '100%' }} placeholder="请输入与筛选选项相对应的搜索内容" onSearch={value => console.log(value)} enterButton />
                                        </Col>
                                    </InputGroup>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={this.props.state.account.accountData}
                        loading={this.props.state.account.accountLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.props.changeModelData(record)
                                }
                            }
                        }} />
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Account));
