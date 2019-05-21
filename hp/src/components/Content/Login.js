import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Login.module.less';
import Crumbs from '../Crumbs';
import LoginForm from '../LoginForm'
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Login extends Component {
    state = {
        vipContent: [
            {
                icon: "tags",
                title: "跟踪您的订单",
                content: "实时跟踪您的订单直到您成功签收您的订单。"
            }, {
                icon: "cloud",
                title: "快速结帐",
                content: "只需填写一次记录您的联系信息，之后您无需再次填写繁琐的信息。"
            }, {
                icon: "heart",
                title: "成为HP Store 会员,接收最新资讯",
                content: "会员可定时收到HP Store为您提供之会员优惠及资讯。"
            }
        ]
    }
    render() {
        const props = this.props;
        return (
            <div className={styles.login}>
                <Crumbs links={[{
                    link: '/',
                    name: '登录'
                }]} />
                <div className={styles.content}>
                    <div className={styles.oldUser}>
                        <h3>登录到您的HP Store帐户</h3>
                        <LoginForm props={props} />
                    </div>
                    <div className={styles.newUser}>
                        <div className={styles.reg}>
                            <h3>新客户</h3>
                            <div className={styles.regTitle}>
                                立即加入成为『 HP Store 帐户』 ，简单、方便，一旦保存你的基本资料，你可在下次订购时， 无需重新输入。更快捷及方便。
                            </div>
                            <Link to={'/account/register'} className={styles.regBtn + " " + styles.prime} onClick={this.submit}>
                                创建用户
                            </Link>
                        </div>
                        <div className={styles.context}>
                            <h3>会员福利</h3>
                            <ul>
                                {this.state.vipContent.map((item, index) => {
                                    return <li key={index + "vipContent_sdasdadf"}>
                                        <div className={styles.leftIcon}>
                                            <Icon type={item.icon} />
                                        </div>
                                        <div className={styles.rightContent}>
                                            <h3>{item.title}</h3>
                                            <span>{item.content}</span>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(Login);
