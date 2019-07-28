import React, { Component } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './deliveryAddress.module.less';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
class DeliveryAddress extends Component {
    render() {
        let errors;
        const { getFieldError, getFieldDecorator } = this.props.form;
        const { loginGoodsResInfo } = this.props;
        return (
            <div className={styles.deliveryAddress}>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>电子邮件地址</label>
                    {getFieldDecorator('email', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'email',
                                message: '请输入正确的邮箱',
                            }],
                        }],
                    })(
                        <input type="email" placeholder="请收入邮箱" className={(errors = getFieldError('email')) ? styles.userInput_error : styles.userInput} disabled={loginGoodsResInfo ? 'disabled' : ''} />
                    )}
                    {(errors = getFieldError('email')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>姓</label>
                    {getFieldDecorator('lastname', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <input type="text" placeholder="请输入您的姓" className={(errors = getFieldError('lastname')) ? styles.userInput_error : styles.userInput} />
                    )}
                    {(errors = getFieldError('lastname')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>名字</label>
                    {getFieldDecorator('firstname', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <input type="text" placeholder="请输入您的名字" className={(errors = getFieldError('firstname')) ? styles.userInput_error : styles.userInput} />
                    )}
                    {(errors = getFieldError('firstname')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>详细地址</label>
                    {getFieldDecorator('address', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <input type="text" placeholder="请输入您的地址" className={(errors = getFieldError('address')) ? styles.userInput_error : styles.userInput} />
                    )}
                    {(errors = getFieldError('address')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>电话号码</label>
                    {getFieldDecorator('phone', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <input type="text" placeholder="请输入您的地址" className={(errors = getFieldError('phone') || getFieldError('pin')) ? styles.phone_error : styles.phone} />
                    )}
                    {getFieldDecorator('phoneCode', {
                        initialValue: '86',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <select className={(errors = getFieldError('phone') || getFieldError('pin')) ? styles.userInputPhonePin_error : styles.phonePin}>
                            <option value="86">86</option>
                        </select>
                    )}
                    {(errors = getFieldError('phone') || getFieldError('pin')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>省</label>
                    {getFieldDecorator('province', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <select className={(errors = getFieldError('province')) ? styles.citySelectError : styles.citySelect} >
                            <option value="">请选择一个地区或省</option>
                            <option value="上海">上海</option>
                        </select>
                    )}
                    {(errors = getFieldError('province')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>市</label>
                    {getFieldDecorator('city', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <select className={(errors = getFieldError('city')) ? styles.citySelectError : styles.citySelect} >
                            <option value="">请选择一个城市</option>
                            <option value="嘉定区">嘉定区</option>
                        </select>
                    )}
                    {(errors = getFieldError('city')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>区</label>
                    {getFieldDecorator('district', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <select className={(errors = getFieldError('district')) ? styles.citySelectError : styles.citySelect} >
                            <option value="">请选择一个地区</option>
                            <option value="嘉定工业区">嘉定工业区</option>
                        </select>
                    )}
                    {(errors = getFieldError('district')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels}>城镇</label>
                    {getFieldDecorator('town', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: false,
                                type: 'string',
                                message: '这是一个必填项目',
                            }],
                        }],
                    })(
                        <select className={(errors = getFieldError('town')) ? styles.citySelectError : styles.citySelect} >
                            <option value="">请选择一个城镇</option>
                        </select>
                    )}
                    {(errors = getFieldError('town')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
                <div className={styles.deliveryAddressList}>
                    <label className={styles.labels} required>邮政编码</label>
                    {getFieldDecorator('postCode', {
                        initialValue: '',
                        validate: [{
                            trigger: ['onBlur', 'onChange'],
                            rules: [{
                                required: true,
                                type: 'string',
                                message: '请输入正确的邮编',
                            }],
                        }],
                    })(
                        <input type="text" placeholder="请输入您的邮编" className={(errors = getFieldError('postCode')) ? styles.userInput_error : styles.userInput} />
                    )}
                    {(errors = getFieldError('postCode')) ? <div className={styles.errorMessage}>{errors.join(',')}</div> : null}
                </div>
            </div>
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
        addProductNumInCart: (data) => { dispatch(Actions.productNumInCart(data)); },
        addProductInCart: (data) => { dispatch(Actions.productInCart(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(DeliveryAddress));