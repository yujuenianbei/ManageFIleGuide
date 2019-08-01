import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './main.module.less';
import './main.css';
// 组件
import Headers from '../Header';
import Left from '../Left';
import Notification from '../Notification';
import Login from '../Login';
import ChatContent from '../Chat';
// 路由
import EndRouters from '../../router/routers';
// 插件
import { Layout } from 'antd';
const { Content } = Layout;

class Main extends PureComponent {
    render() {
        return (
            <Fragment>
                {!!this.props.state.user.loginState &&
                    <Fragment>
                        <Layout style={{ minHeight: '100vh' }}>
                            <Left />
                            <Layout>
                                <Headers />
                                <Content style={{ margin: '0 16px' }}>
                                    <EndRouters />
                                </Content>
                                <ChatContent />
                            </Layout>
                        </Layout>
                        <Notification />
                    </Fragment>
                }
                {!this.props.state.user.loginState &&
                    <Login />
                }
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state
    };
};
export default connect(
    mapStateToProps,
)(classify(styles)(Main));