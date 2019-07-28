import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './product.module.less';
// http
import { http } from '../../http';
// 组件
import UploadProductImg from './uploadProductImg'
import { createProduct, updateProduct, searchProduct, searchProductTotal } from '../../fetch/product'
import { timestampToTime, typeToTypeName, typeNameToType } from '../../func/common'
import { Input, Col, Row, Select, Button, Modal, Spin, Form, Icon, Upload } from 'antd';
const { Option } = Select;

let myClear, clearData, modelData = {
    productName: '',
    type: '',
    img: '',
    features: [],
    promotionMessage: '',
    promotionMessageSecond: '',
    usedPrice: null,
    nowPrice: null,
};

let id = 0, change;

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
        fileList: [],
        imgState: false
    }
    clearImg = () => {
        this.setState({
            fileList: []
        })
    }
    componentDidMount() {
        this.props.onRef(this);
        if (this.props.state.product.modelName === 'add') {
            this.props.form.setFieldsValue({
                index: '',
                productName: '',
                type: '',
                img: '',
                features: [],
                promotionMessage: '',
                promotionMessageSecond: '',
                usedPrice: null,
                nowPrice: null,
            })
        } else if (this.props.state.product.modelName === 'edit') {
            const data = this.props.state.product.modelData;
            id = JSON.parse(data.features).length;
            this.props.form.getFieldDecorator('keys', { initialValue: Array.from(new Array(id).keys()) });
            this.setState({
                fileList: [{
                    uid: data.img,
                    name: data.img,
                    status: 'done',
                    url: data.img.split('http').length > 1 ? data.img : http.img + data.img
                }]
            }, () => {
                this.props.form.setFieldsValue({
                    keys: Array.from(new Array(id).keys()),
                    id: data.key,
                    img: this.state.fileList[0].url,
                    features: JSON.parse(data.features),
                    productName: data.productName,
                    type: typeNameToType(this.props.state.product.productTypeList, data.type),
                    promotionMessage: data.promotionMessage,
                    promotionMessageSecond: data.promotionMessageSecond,
                    usedPrice: data.usedPrice,
                    nowPrice: data.nowPrice,
                })
            })
            change = {
                features: JSON.parse(data.features)
            }
        }
    }

    componentWillUnmount() {
        // 清除定时器
        clearTimeout(myClear);
    };
    componentWillReceiveProps(nextProps, nextState) {
        // console.log(nextState, this.state)
        const data = nextProps.state.product.modelData;
        if (nextProps.state.product.modelName == 'edit' && this.props.state.product.modelName === nextProps.state.product.modelName && data && this.state.fileList[0]) {
            if (this.state.fileList[0] && !this.state.imgState) {
                this.setState({
                    fileList: [{
                        uid: data.img,
                        name: data.img,
                        status: 'done',
                        url: data.img.split('http').length > 1 ? data.img : http.img + data.img
                    }]
                })
            }
        } else if (nextProps.state.product.modelName == 'edit' && this.props.state.product.modelName !== nextProps.state.product.modelName && data) {
            // 切换成edit的时候
            if (!this.state.imgState) {
                this.setState({
                    fileList: [{
                        uid: data.img,
                        name: data.img,
                        status: 'done',
                        url: data.img.split('http').length > 1 ? data.img : http.img + data.img
                    }]
                })
            }
        } else if (nextProps.state.product.modelName == 'add' && this.props.state.product.modelName !== nextProps.state.product.modelName) {
            // 切换成add的时候
            if (!this.state.imgState) {
                this.setState({
                    fileList: []
                })
            }
        }
    }
    // 组件更新
    componentWillUpdate(nextProps, nextState) {
        if (this.props.state.product.modelName !== nextProps.state.product.modelName) {
            if (nextProps.state.product.modelName == 'add') {
                this.props.form.setFieldsValue({
                    id: '',
                    productName: '',
                    type: '',
                    img: '',
                    features: [],
                    promotionMessage: '',
                    promotionMessageSecond: '',
                    usedPrice: null,
                    nowPrice: null,
                })
            } else if (nextProps.state.product.modelName == 'edit') {
                const data = nextProps.state.product.modelData;
                id = JSON.parse(data.features).length;
                this.props.form.getFieldDecorator('keys', { initialValue: Array.from(new Array(id).keys()) });
                // console.log(this.state.fileList)
                this.props.form.setFieldsValue({
                    keys: Array.from(new Array(id).keys()),
                    id: data.key,
                    productName: data.productName,
                    features: JSON.parse(data.features),
                    type: typeNameToType(this.props.state.product.productTypeList, data.type),
                    promotionMessage: data.promotionMessage,
                    promotionMessageSecond: data.promotionMessageSecond,
                    usedPrice: data.usedPrice,
                    nowPrice: data.nowPrice,
                })
                change = {
                    features: JSON.parse(data.features)
                }
            }
        }
    }

    // 提交数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changeConfirmLoading(true);
                if (this.props.state.product.modelName === 'add') {
                    const postData = {
                        productName: values.productName,
                        type: values.type,
                        img: values.img,
                        promotionMessage: values.promotionMessage,
                        features: JSON.stringify(values.features.filter(item => item)),
                        promotionMessageSecond: values.promotionMessageSecond,
                        usedPrice: values.usedPrice,
                        nowPrice: values.nowPrice
                    }
                    createProduct(postData, this.createFinish)
                } else if (this.props.state.product.modelName == 'edit') {
                    const postData = {
                        productName: values.productName,
                        type: values.type,
                        img: this.state.fileList[0].url,
                        promotionMessage: values.promotionMessage,
                        features: JSON.stringify(values.features.filter(item => item)),
                        promotionMessageSecond: values.promotionMessageSecond,
                        usedPrice: values.usedPrice,
                        nowPrice: values.nowPrice
                    }
                    postData.id = parseInt(this.props.state.product.modelData.key);
                    // console.log(postData)
                    this.setState({ imgState: false })
                    updateProduct(postData, this.createFinish)
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
        this.clearImg();
        this.setState({ imgState: false });
    }

    // 提交数据后返回
    createFinish = (result) => {
        if (this.props.state.product.modelName === 'add') {
            if (result.data.addProduct[0].state === 1) {
                this.props.changeConfirmLoading(false);
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
                // 更新数据
                this.props.changeProductDataLoading(true);
                this.clearImg();

                // 加载上一次的配置
                this.props.changeProductDataLoading(true)
                let searchValue;
                if (this.props.state.product.searchType === 'type' && !!this.props.state.product.searchValue) {
                    searchValue = JSON.stringify(this.props.state.product.productTypeList.filter(item => item.typeName === this.props.state.product.searchValue)[0].id);
                } else {
                    searchValue = this.props.state.product.searchValue
                }
                let data = {
                    search: this.props.state.product.searchValue ? searchValue : "",
                    searchType: this.props.state.product.searchType ? this.props.state.product.searchType : "",
                    pageSize: this.props.state.product.pageSize,
                    start: this.props.state.product.pageNow,
                    sort: this.props.state.product.pageSort,
                };
                searchProductTotal(data, this.setPageTotal)
                searchProduct(data, this.searchData);
            } else {
                this.props.changeModleState(false);
            }
        } else if (this.props.state.product.modelName == 'edit') {
            if (result.data.updateProduct[0].state === 1) {
                this.props.changeConfirmLoading(false);
                this.props.changeModleState(false);
                this.props.changeModelData('');
                this.props.changeModleTitle('');
                this.props.changeModleName('');
                // 清空表单内容
                myClear = setTimeout(this.props.form.resetFields, 0);
                // 更新数据
                this.props.changeProductDataLoading(true);
                this.clearImg();

                // 加载上一次的配置
                this.props.changeProductDataLoading(true)
                let searchValue;
                if (this.props.state.product.searchType === 'type' && !!this.props.state.product.searchValue) {
                    searchValue = JSON.stringify(this.props.state.product.productTypeList.filter(item => item.typeName === this.props.state.product.searchValue)[0].id);
                } else {
                    searchValue = this.props.state.product.searchValue
                }
                let data = {
                    search: this.props.state.product.searchValue ? searchValue : "",
                    searchType: this.props.state.product.searchType ? this.props.state.product.searchType : "",
                    pageSize: this.props.state.product.pageSize,
                    start: this.props.state.product.pageNow,
                    sort: this.props.state.product.pageSort,
                };
                searchProductTotal(data, this.setPageTotal)
                searchProduct(data, this.searchData);
            } else {
                this.props.changeModleState(false);
            }
        }
    }

    // 修改总数
    setPageTotal = (result) => {
        this.props.changePageTotal(result.data.totalProduct.total);
        this.props.changeProductDataLoading(false)
    }
    // 搜索结果写入表中
    searchData = (result) => {
        let data = []
        result.data.searchProduct.map((item, index) => {
            return data[index] = {
                key: item.id,
                productName: item.productName,
                type: typeToTypeName(this.props.state.product.productTypeList, item.type),
                img: item.img,
                features: item.features,
                promotionMessage: item.promotionMessage,
                promotionMessageSecond: item.promotionMessageSecond,
                usedPrice: item.usedPrice,
                nowPrice: item.nowPrice,
                createTime: timestampToTime(parseInt(item.createTime)),
                updateTime: timestampToTime(parseInt(item.updateTime)),
            }
        })
        this.props.changeProductData(data)
        this.props.changeProductDataLoading(false)
    }

    // feature
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
        console.log(this.props.form.getFieldsValue())
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldsValue({
            keys: nextKeys,
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

    handleChange = ({ file, fileList, event }) => {
        this.setState({ fileList: [...fileList] }, () => {
            if (file.status === "removed") {
                this.props.form.setFieldsValue({ img: '' });
                this.setState({ imgState: true, })
                return false
            }
            if (this.state.fileList[0].response) {
                const data = this.state.fileList[0].response.reqData
                this.props.form.setFieldsValue({ img: data });
                this.setState({
                    fileList: [{
                        uid: data,
                        name: data,
                        status: 'done',
                        url: data.split('http').length > 1 ? data : http.img + data
                    }]
                })

            }
        });
    }


    normFile = e => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


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
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 19, offset: 5 },
            },
        };

        let formItems;
        if (this.props.state.product.modelName == 'add') {
            getFieldDecorator('keys', { initialValue: [0] });
            const keys = getFieldValue('keys');
            formItems = keys.map((k, index) => (
                <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '参数规格' : ''}
                    style={{ marginBottom: '10px' }}
                    required={false}
                    key={k}>

                    {getFieldDecorator(`features[${k}]`, {
                        initialValue: '',
                        validateTrigger: 'onBlur',
                        rules: [
                            {
                                whitespace: true,
                                message: "请输入参数规格",
                            }
                        ],
                    })(<Input placeholder="请输入参数规格" key={'keys' + index} style={{ width: '78%', marginRight: 8 }} />)}
                    <Button icon="plus" onClick={this.add} style={{ marginRight: 8 }} />
                    {keys.length > 1 ? (
                        <Button icon="minus" onClick={() => this.remove(k)} />
                    ) : null}
                </Form.Item>
            ));
        } else if (this.props.state.product.modelName == 'edit' && getFieldValue('keys') && change.features) {

            console.log(getFieldsValue(), change.features)
            getFieldDecorator('keys', { initialValue: Array.from(new Array(change.features.length).keys()) });
            const keys = getFieldValue('keys');
            // console.log(keys)
            formItems = keys.map((k, index) => (
                <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '参数规格' : ''}
                    style={{ marginBottom: '10px' }}
                    required={false}
                    key={k}>

                    {getFieldDecorator(`features[${k}]`, {
                        initialValue: change.features[k],
                        validateTrigger: 'onBlur',
                        rules: [
                            {
                                // required: true,
                                whitespace: true,
                                message: "请输入参数规格",
                            }
                        ],
                    })(<Input placeholder="请输入参数规格" key={'keys' + index} style={{ width: '78%', marginRight: 8 }} />)}
                    <Button icon="plus" onClick={this.add} style={{ marginRight: 8 }} />
                    {keys.length > 1 ? (
                        <Button icon="minus" onClick={() => this.remove(k)} />
                    ) : null}
                </Form.Item>
            ));
        } else {
            getFieldDecorator('keys', { initialValue: [0] });
        }


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
                            // valuePropName: 'fileList',
                            // getValueFromEvent: this.normFile,
                            // initialValue: '',
                            // validateTrigger: 'onBlur',
                            // rules: [
                            //     {
                            //         required: true,
                            //         message: '请上传图片',
                            //     },
                            // ],
                        })(<div className="clearfix">
                            <Upload
                                action={http.ip + "/profile"}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
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
                        })(<Input type="number" placeholder="请输入价格" disabled={true} />)}
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