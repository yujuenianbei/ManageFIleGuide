import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
// 组件
import UploadProductImg from './uploadProductImg'
import { searchProduct, searchProductTotal } from '../../fetch/product'
import { timestampToTime, typeToTypeName } from '../../func/common'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon, Upload } from 'antd';
const { Option } = Select;

let myClear, clearData, modelData = {
    productName: '',
    type: '',
    img: '',
    featrues: [],
    promotionMessage: '',
    promotionMessageSecond: '',
    usedPrice: null,
    nowPrice: null,
};

let id = 0;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class ProductForm extends PureComponent {
    state = {
        userNameFeedback: false,
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
    }
    componentDidMount() {
        this.props.onRef(this);
        //     if (this.props.state.product.modelName == 'add') {
        //         this.props.form.setFieldsValue({
        //             productName: '',
        //             type: '',
        //             img: '',
        //             featrues: [],
        //             promotionMessage: '',
        //             promotionMessageSecond: '',
        //             usedPrice: null,
        //             nowPrice: null,
        //         })
        //     } else if (this.props.state.product.modelName == 'edit') {
        //         const data = this.props.state.product.modelData;
        //         this.props.form.setFieldsValue({
        //             id: data.id,
        //             email: data.email,
        //             userName: data.userName,
        //             password: data.password,
        //             lastName: data.lastName,
        //             firstName: data.firstName,
        //             phoneCode: data.phoneCode,
        //             phone: data.phone,
        //             sex: transSex(data.sex),
        //             company: data.company,
        //         })
        //     }
    }

    // componentWillUnmount() {
    //     // 清除定时器
    //     clearTimeout(myClear);
    // };

    // // 组件更新
    // componentWillUpdate(nextPorps) {
    //     if (this.props.state.product.modelName !== nextPorps.state.product.modelName) {
    //         if (nextPorps.state.product.modelName == 'add') {
    //             this.props.form.setFieldsValue({
    //                 email: '',
    //                 userName: '',
    //                 password: '',
    //                 lastName: '',
    //                 firstName: '',
    //                 phoneCode: '',
    //                 phone: '',
    //                 sex: transSex(0),
    //                 company: '',
    //             })
    //         } else if (nextPorps.state.product.modelName == 'edit') {
    //             const data = nextPorps.state.product.modelData;
    //             this.props.form.setFieldsValue({
    //                 email: data.email,
    //                 userName: data.userName,
    //                 password: data.password,
    //                 lastName: data.lastName,
    //                 firstName: data.firstName,
    //                 phoneCode: data.phoneCode,
    //                 phone: data.phone,
    //                 sex: transSex(data.sex),
    //                 company: data.company,
    //             })
    //         }
    //     }
    // }

    // // 提交数据
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.props.form.getFieldValue('sex'))
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             this.props.changeConfirmLoading(true);
    //             if (this.props.state.product.modelName === 'add') {
    //                 values.sex = transToSex(this.props.form.getFieldValue('sex'));
    //                 createProduct(values, this.createFinish)
    //             } else if (this.props.state.product.modelName == 'edit') {
    //                 // 将id添加到请求内容中
    //                 values.id = parseInt(this.props.state.product.modelData.key);
    //                 // 将性别转换格式
    //                 editTransToSex(values);
    //                 updateAccount(values, this.createFinish)
    //             }
    //         }
    //     });
    // };

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
    }

    // // 提交数据后返回
    // createFinish = (result) => {
    //     if (this.props.state.product.modelName === 'add') {
    //         if (result.data.regAccount[0].state === 1) {
    //             this.props.changeConfirmLoading(false);
    //             this.props.changeModleState(false);
    //             this.props.changeModelData('');
    //             this.props.changeModleTitle('');
    //             this.props.changeModleName('');
    //             // 清空表单内容
    //             myClear = setTimeout(this.props.form.resetFields, 0);
    //             // 更新数据
    //             this.props.changeProductDataLoading(true);

    //             // 加载上一次的配置
    //             let data = {};
    //             data.search = this.props.state.product.searchValue ? this.props.state.product.searchValue : ""
    //             data.searchType = this.props.state.product.searchType ? this.props.state.product.searchType : "";
    //             data.pageSize = this.props.state.product.pageSize;
    //             data.start = this.props.state.product.pageNow;
    //             data.sort = this.props.state.product.pageSort;
    //             // 如果搜索性别需要装换
    //             if (data.searchType === "sex") {
    //                 data.search = transToSex(this.props.state.product.searchValue);
    //             }
    //             searchProductTotal(data, this.setPageTotal)
    //             searchProduct(data, this.searchData);
    //         } else {
    //             this.props.changeModleState(false);
    //         }
    //     } else if (this.props.state.product.modelName == 'edit') {
    //         if (result.data.updateProduct[0].state === 1) {
    //             this.props.changeConfirmLoading(false);
    //             this.props.changeModleState(false);
    //             this.props.changeModelData('');
    //             this.props.changeModleTitle('');
    //             this.props.changeModleName('');
    //             // 清空表单内容
    //             myClear = setTimeout(this.props.form.resetFields, 0);
    //             // 更新数据
    //             this.props.changeProductDataLoading(true);

    //             // 加载上一次的配置
    //             let data = {};
    //             data.search = this.props.state.product.searchValue ? this.props.state.product.searchValue : ""
    //             data.searchType = this.props.state.product.searchType ? this.props.state.product.searchType : "";
    //             data.pageSize = this.props.state.product.pageSize;
    //             data.start = this.props.state.product.pageNow;
    //             data.sort = this.props.state.product.pageSort;
    //             // 如果搜索性别需要装换
    //             if (data.searchType === "sex") {
    //                 data.search = transToSex(this.props.state.product.searchValue);
    //             }
    //             searchProductTotal(data, this.setPageTotal)
    //             searchProduct(data, this.searchData);
    //         } else {
    //             this.props.changeModleState(false);
    //         }
    //     }
    // }

    // // 修改总数
    // setPageTotal = (result) => {
    //     this.props.changePageTotal(result.data.total.total)
    // }
    // // 搜索结果写入表中
    // searchData = (result) => {
    //     let data = []
    //     result.data.searchProduct.map((item, index) => (
    //         data[index] = {
    //             key: item.id,
    //             userName: item.userName,
    //             sex: item.sex,
    //             email: item.email,
    //             firstName: item.firstName,
    //             lastName: item.lastName,
    //             phoneCode: item.phoneCode,
    //             phone: item.phone,
    //             company: item.company,
    //             password: item.password,
    //         }
    //     ))
    //     this.props.changeProductData(data)
    //     this.props.changeProductDataLoading(false)
    // }


    // // 验证密码是否一致
    // confirmPassword = (rule, value, callback) => {
    //     if (value !== "") {
    //         if (this.props.form.getFieldValue('password') === value) {
    //             callback()
    //         } else {
    //             callback('false')
    //         }
    //     } else {
    //         callback()
    //     }
    // }

    // // 验证用户名
    // confirmUserName = (rule, value, callback) => {
    //     // 调用查询用户名的接口进行返回
    //     // this.props.form.getFieldValue('userName')
    //     if (value !== "") {
    //         if (this.props.state.product.modelName === 'edit' && value === this.props.state.product.modelData.userName) {
    //             callback()
    //         } else {
    //             this.setState({ userNameFeedback: true })
    //             // 校验用户名是否存在
    //             validateAccount(value, (data) => {
    //                 this.setState({ userNameFeedback: false })
    //                 if (data.data.validateAccount[0].state === 1) {
    //                     callback()
    //                 } else if (data.data.validateAccount[0].state === 0) {
    //                     callback('false')
    //                 }
    //             })
    //         }
    //     } else {
    //         this.setState({ userNameFeedback: false })
    //         callback()
    //     }
    // }

    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        console.log(keys.filter(key => key !== k))
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        });
    };


    // upload
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
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
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 19, offset: 5 },
            },
        };


        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '参数规格' : ''}
                style={{ marginBottom: '10px' }}
                required={false}
                key={k}>

                {getFieldDecorator(`featrues[${k}]`, {
                    validateTrigger: 'onBlur',
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请输入参数规格",
                        }
                    ],
                })(<Input placeholder="请输入参数规格" style={{ width: '78%', marginRight: 8 }} />)}
                <Button icon="plus" onClick={this.add} style={{ marginRight: 8 }} />
                {keys.length > 1 ? (
                    <Button icon="minus" onClick={() => this.remove(k)} />
                ) : null}
            </Form.Item>
        ));

        // upload
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Fragment>
                <Form layout="horizontal" onSubmit={this.handleSubmit} labelAlign="left">
                    <Form.Item label="产品名称"  {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('productName', {
                            initialValue: '',
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入产品名称',
                                },
                            ],
                        })(<Input placeholder="请输入产品名称" />)}
                    </Form.Item>
                    <Form.Item label="产品分类" {...formItemLayout} hasFeedback={this.state.userNameFeedback} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('type', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择产品分类',
                                },
                            ],
                        })(<Select placeholder="请选择产品分类">
                            <Option value={null}>请选择分类</Option>
                            {this.props.state.product.productTypeList.map(item => {
                                return <Option value={item.id}>{item.typeName}</Option>
                            })}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="产品图片" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('img', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请上传图片',
                                },
                            ],
                        })(<div className="clearfix">
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>)}
                    </Form.Item>
                    <Form.Item label="优惠信息1" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('promotionMessage', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: false,
                                    message: '请输入优惠信息1',
                                },
                            ],
                        })(<Input type="text" placeholder="请输入优惠信息1" />)}
                    </Form.Item>
                    <Form.Item label="优惠信息2" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('promotionMessageSecond', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: false,
                                    message: '请输入优惠信息2',
                                },
                            ],
                        })(<Input type="text" placeholder="请输入优惠信息2" />)}
                    </Form.Item>
                    {/* 参数规格 */}
                    {formItems}
                    <Form.Item label="历史价格" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('usedPrice', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: false,
                                    message: '请输入价格',
                                },
                            ],
                        })(<Input type="number" placeholder="请输入价格" disabled="disabled" />)}
                    </Form.Item>
                    <Form.Item label="最新价格" {...formItemLayout} style={{ marginBottom: '10px' }}>
                        {getFieldDecorator('nowPrice', {
                            initialValue: '',
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入价格',
                                },
                            ],
                        })(<Input type="number" placeholder="请输入价格" />)}
                    </Form.Item>
                </Form >
            </Fragment >
        );
    }
}

const createProducts = Form.create({ name: 'createProduct' })(ProductForm);

const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeModleState: (data) => { dispatch(Actions.productModleState(data)); },
        changeProductDataLoading: (data) => { dispatch(Actions.productDataLoading(data)); },
        changeProductData: (data) => { dispatch(Actions.productData(data)); },
        changeModleTitle: (data) => { dispatch(Actions.productModleTitle(data)); },
        changeModleName: (data) => { dispatch(Actions.productModleName(data)); },
        changeModelData: (data) => { dispatch(Actions.productModelData(data)); },
        changeConfirmLoading: (data) => { dispatch(Actions.productConfirmLoading(data)); },

        changePageSize: (data) => { dispatch(Actions.productPageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.productPageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.productPageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.productSearchValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.productSearchType(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createProducts));