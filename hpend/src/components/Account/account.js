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

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">修改</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
            </span>
        ),
    },
];

class Account extends PureComponent {
    state = {
        data: [{
            key: 0,
            name: null,
            phone: null,
            email: null,
            tags: []
        }],
        loading: true
    };

    componentDidMount() {
        this.props.changeAccountDataLoading(true);
        getUserInfo(this.setData);
    }

    // 将返回数据写入
    setData = (result) => {
        let data = []
        result.data.queryAllUsers.map((item, index) => (
            data[index] = {
                key: index + 1,
                name: item.name,
                phone: item.phone,
                email: item.email,
                tags: ['cool', 'teacher']
            }
        ))
        this.props.changeAccountData(data)
        this.props.changeAccountDataLoading(false)
    }

    // 显示弹出框
    showModal = () => {
        this.props.changeModleState(true)
    };

    render() {
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
                                <Button type="primary" onClick={this.showModal}>新增</Button>
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
                    <Table columns={columns} dataSource={this.props.state.account.accountData} loading={this.props.state.account.accountLoading} />
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
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Account));
