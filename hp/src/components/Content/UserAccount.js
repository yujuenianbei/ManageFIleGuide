import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './UserAccount.module.less';
import Crumbs from '../Crumbs';
import RegForm from '../RegForm';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class RegUser extends Component {
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
            <div className={styles.register}>
                <Crumbs links={[{
                    link: '/',
                    name: '我的账户'
                }]} />
                <div className={styles.reguser}>
                    <div className={styles.reg}>
                        <h3>创建帐户</h3>
                        <RegForm props={props} />
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
        );
    }
}
export default classify(styles)(RegUser);
