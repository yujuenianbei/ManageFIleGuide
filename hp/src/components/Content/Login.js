import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Login.module.less';
import Crumbs from '../Crumbs';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import LoginForm from '../LoginForm'
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className={styles.login}>
                <Crumbs links={[{
                    link: '/',
                    name: '登录'
                }]} />
                <div className={styles.content}>
                    <div className={styles.oldUser}>
                        <h3>登录到您的HP Store帐户</h3>
                        <LoginForm />
                    </div>
                    <div className={styles.newUser}>
                        <div className={styles.reg}>
                            <h3>登录到您的HP Store帐户</h3>
                            <div className={styles.regTitle}>
                            立即加入成为『 HP Store 帐户』 ，简单、方便，一旦保存你的基本资料，你可在下次订购时， 无需重新输入。更快捷及方便。
                            </div>
                            <Link to={'/'} className={styles.regBtn + " " + styles.prime} onClick={this.submit}>
                                创建用户
                            </Link>
                        </div>
                        <div className={styles.context}>
                            <h3>登录到您的HP Store帐户</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(Login);
