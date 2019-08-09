import React, { Fragment, PureComponent } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import { Link, withRouter } from 'react-router-dom';
import styles from './login.module.less';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThLarge, faShoppingCart, faUser, } from '@fortawesome/fontawesome-free-solid'
import { createForm } from 'rc-form';
import { Button } from 'antd-mobile';
import { gql } from "apollo-boost";
// http
import { http } from '../../http';
const POST_VERIFYUSER = gql`
mutation login($email: String,$name: String, $password: String){
  login(email: $email,name: $name, password: $password){
    name,
    state
  } 
}`

class LoginForm extends PureComponent {
  state = {
    error: false
  }
  componentDidMount() {
    window.addEventListener('keydown', this.keypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keypress);
  }

  keypress = (e) => {
    e.stopPropagation();
    if (e.which === 13) {
      this.submit();
    }
  }

  submit = (addTodo) => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      if (!error) {
        var query = `mutation login($email: String,$name: String, $password: String){
                login(email: $email,name: $name, password: $password){
                  id,
                  email,
                  name,
                  state,
                  token
                } 
              }`;
        fetch(http.port, {
          method: 'POST',
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'login': localStorage.getItem('loginState'),
            'token': localStorage.getItem('token')
          },
          body: JSON.stringify({
            query,
            variables: {
              name: value.username,
              password: value.password,
            }
          })
        })
          .then(r => r.json())
          .then(result => {
            if (result.data.login && result.data.login[0].state === "1") {
              localStorage.setItem("token", result.data.login[0].token);
              localStorage.setItem("id", result.data.login[0].id);
              this.props.changeLoginstate(1);
              this.props.changeUserEmail(result.data.login[0].email)
              this.props.changeUsername(result.data.login[0].name)
              this.props.props.history.push('/');
            } else {
              this.openNotification()
            }
          });
      }
    });
  }
  openNotification = () => {
    // notification.open({
    //   message: '用户名或密码错误',
    //   description:
    //     '您输入的用户名或密码有误',
    //   onClick: () => {
    //     console.log('Notification Clicked!');
    //   },
    // });
  };

  userNameChange = (e) => {
    // console.log(e.target.value)
  }
  validateUserNameTimely = (rule, value, callback) => {
    // console.log(value)
    // var regu = /^[1][3][0-9]{9}$/;
    // var re = new RegExp(regu);
    // if (re.test(value)) {
    callback()
    // } else {
    //     callback('false')
    // }
  }
  render() {
    let errors;
    const { getFieldError, getFieldDecorator } = this.props.form;
    return (
      <div className={styles.Login}>
        <div className={styles.logo}>
          <img src="https://media.hpstore.cn/static/version1565215005/frontend/HPOLS/default/zh_Hans_CN/images/logo.svg" title="HP官网- 惠普中国在线商店" alt="HP官网- 惠普中国在线商店" />
        </div>
        <div className={styles.LoginForm}>
          {getFieldDecorator('username', {
            initialValue: '',
            validateFirst: true,
            validate: [{
              trigger: ['onBlur', 'onChange'],
              rules: [{
                // 可以通过这种方式实时校验（自定义校验规则）
                message: '请输入正确的用户名',
                validator: (rule, value, cb) => this.validateUserNameTimely(rule, value, cb),
              }],
            }],
            // rules: [{ required: true, message: '请输入用户名' }],
          })(<input type="text" onChange={this.userNameChange} placeholder="电子邮件地址或手机号" className={(errors = getFieldError('username')) ? styles.input_error : styles.input_normal} />)}
          {(errors = getFieldError('username')) ? <div className={styles.error}>{errors.join(',')}</div> : null}

          {getFieldDecorator('password', {
            initialValue: '',
            validate: [{
              trigger: ['onBlur', 'onChange'],
              rules: [{
                required: true,
                type: 'string',
                message: '请输入正确的密码',
              }],
            }],
            // rules: [{ required: true, message: '请输入密码' }],
          })(<input type="password" onChange={this.userNameChange} placeholder="密码" className={(errors = getFieldError('password')) ? styles.input_error : styles.input_normal} />)}
          {(errors = getFieldError('password')) ? <div className={styles.error}>{errors.join(',')}</div> : null}

          <button className={styles.LoginSubmit + ' ' + styles.prime} type="primary" onClick={() => this.submit()}>登录</button>
        </div>
        <div className={styles.regAndForget}>
          <a>短信验证登录</a>
          <a>新用户注册</a>
        </div>
        <div className={styles.otherLogin}>
          <div className={styles.otherTitle}>
            其他登录方式‘
            <div></div>
            <span>登录代表您已同意<a>《惠普隐私策略》</a></span>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(classify(styles)(createForm()(LoginForm))));