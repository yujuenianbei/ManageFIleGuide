import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
// 组件
import { createProductType, updateProductType, validateTypeName, searchProductType, searchProductTypeTotal } from '../../fetch/productType'
import { timestampToTime } from '../../func/common'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon, Upload } from 'antd';

let myClear, clearData
class ProductTypeForm extends PureComponent {
    state = {
        typeNameFeedback: false,
    }
    componentDidMount() {
        if ((this.props.state.order.addAddressState) || (this.props.loginState && this.props.loginGoodsResInfo.length === 0)) {
            this.props.form.setFieldsValue({
                email: this.props.state.user.useremail,
            })
        }
    }

    componentWillUnmount() {
        // 清除定时器
        clearTimeout(myClear);
    };

    // 组件更新
    componentWillUpdate(nextPorps) {
        if (this.props.state.productType.modelName !== nextPorps.state.productType.modelName) {
            if (nextPorps.state.productType.modelName == 'add') {
                this.props.form.setFieldsValue({
                    typeName: '',
                })
            } else if (nextPorps.state.productType.modelName == 'edit') {
                const data = nextPorps.state.productType.modelData;
                this.props.form.setFieldsValue({
                    typeName: data.typeName,
                })
            }
        }
    }
    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changeConfirmLoading(true);
                if (this.props.state.productType.modelName === 'add') {
                    const postData = {
                        typeName: values.typeName,
                    }
                    createProductType(postData, this.createFinish)
                } else if (this.props.state.productType.modelName == 'edit') {
                    const postData = {
                        typeName: values.typeName,
                    }
                    postData.id = parseInt(this.props.state.productType.modelData.key);
                    this.setState({ imgState: false })
                    updateProductType(postData, this.createFinish)
                }
            }
        });
    };

    // 取消提交
    cancelSubmit = () => {
        this.props.changeModleState(false);
        this.props.changeConfirmLoading(false);
        clearData = setTimeout(() => {
            myClear = setTimeout(this.props.form.resetFields, 0);
            this.props.changeModelData('');
            this.props.changeModleTitle('');
            this.props.changeModleName('');
            clearTimeout(clearData);
        }, 0);
        this.setState({ imgState: false });
    }

    // 提交数据后返回
    createFinish = (result) => {
        if (this.props.state.productType.modelName === 'add') {
            if (result.data.addProductType[0].state === 1) {
                this.props.changeConfirmLoading(false);
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
                // 更新数据
                this.props.changeProductDataLoading(true);

                // 加载上一次的配置
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
            } else {
                this.props.changeModleState(false);
            }
        } else if (this.props.state.productType.modelName == 'edit') {
            if (result.data.updateProductType[0].state === 1) {
                this.props.changeConfirmLoading(false);
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
                // 更新数据
                this.props.changeProductDataLoading(true);

                // 加载上一次的配置
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
            } else {
                this.props.changeModleState(false);
            }
        }
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

    // 验证用户名
    confirmTypeName = (rule, value, callback) => {
        // 调用查询用户名的接口进行返回
        // this.props.form.getFieldValue('userName')
        if (value !== "") {
            if (this.props.state.productType.modelName === 'edit' && value === this.props.state.productType.modelData.typeName) {
                callback()
            } else {
                this.setState({ typeNameFeedback: true })
                // 校验用户名是否存在
                validateTypeName(value, (data) => {
                    this.setState({ typeNameFeedback: false })
                    if (data.data.validateTypeName.state === 1) {
                        callback()
                    } else if (data.data.validateTypeName.state === 0) {
                        callback('false')
                    } else if (data.data.validateTypeName.state === 3) {
                        callback('false')
                    }
                })
            }
        } else {
            this.setState({ typeNameFeedback: false })
            callback()
        }
    }


    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue, getFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        return (
            <Fragment>
                <Form layout="horizontal" onSubmit={this.handleSubmit} labelAlign="left">
                    <Form.Item label="分类名称"  {...formItemLayout} hasFeedback={this.state.typeNameFeedback} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('typeName', {
                            initialValue: '',
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入产品分类名称',
                                },
                                {
                                    validator: (rule, value, cb) => this.confirmTypeName(rule, value, cb),
                                    message: '分类已存在',
                                }
                            ],
                        })(<Input placeholder="请输入产品分类名称" />)}
                    </Form.Item>
                </Form >
            </Fragment >
        );
    }
}

const createProductTypes = Form.create({ name: 'createProductTypes' })(ProductTypeForm);

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
        changeModleTitle: (data) => { dispatch(Actions.productTypeModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.productTypeModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.productTypeModelData(data)); },
        changeConfirmLoading: (data) => { dispatch(Actions.productTypeConfirmLoading(data)); },

        changePageSize: (data) => { dispatch(Actions.productTypePageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.productTypePageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.productTypePageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.productTypeSearchValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.productTypeSearchType(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createProductTypes));