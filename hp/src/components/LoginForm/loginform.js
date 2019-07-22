import React, { PureComponent, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import styles from './loginform.module.less';
import { createForm } from 'rc-form';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { notification } from 'antd';

const POST_VERIFYUSER = gql`
mutation login($email: String,$name: String, $password: String){
  login(email: $email,name: $name, password: $password){
    name,
    state
  } 
}`

class Form extends PureComponent {
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
                // addTodo({ variables: { name: value.username, password: value.password } });
                var query = `mutation login($email: String,$name: String, $password: String){
                    login(email: $email,name: $name, password: $password){
                      id,
                      email,
                      name,
                      state,
                      token
                    } 
                  }`;
                fetch('http://localhost:3004/graphql', {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'login' : localStorage.getItem('loginState'),
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
        notification.open({
            message: '用户名或密码错误',
            description:
                '您输入的用户名或密码有误',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
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
            <Fragment>
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
                <button className={styles.loginBtn + " " + styles.prime} onClick={() => this.submit()}>登录</button>


                {/* <Mutation mutation={POST_VERIFYUSER} >
                    {(addTodo, { loading, error, data }) => {
                        if (loading) return "Loading...";
                        // if (error) return `Error! ${error.message}`;
                        if (data && data.login[0].state === "1") {
                            this.props.props.history.push('/');
                        } else if (error || (data && data.login[0].state === "2")) {
                            this.openNotification()
                        }
                        return (<button className={styles.loginBtn + " " + styles.prime} onClick={() => this.submit(addTodo)}>登录</button>);
                    }}
                </Mutation> */}

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
        changeLoginstate: (data) => { dispatch(Actions.loginstate(data)); },
        changeUsername: (data) => { dispatch(Actions.usernanme(data)); },
        changeUserEmail: (data) => { dispatch(Actions.useremail(data)) }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(createForm()(Form)));

