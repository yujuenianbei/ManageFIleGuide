import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';
// 组件
import LoginForm from './loginForm';
// 插件
import { Layout, Tabs } from 'antd';
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
class Login extends PureComponent {
    render() {
        return (
            <Fragment>
                <Layout className={styles.loginBg}>
                    <div className={styles.loginForm}>
                        <Tabs
                            defaultActiveKey="1"
                            onChange={callback}
                            tabBarStyle={{ width: '100%' }}
                        >
                            <TabPane tab="账号登录" key="1">
                                <LoginForm />
                            </TabPane>
                            <TabPane tab="扫码登录" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs>
                    </div>
                </Layout>
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
        changeModleState: (data) => { dispatch(Actions.modleState(data)); },
        changeAccountDataLoading: (data) => { dispatch(Actions.accountDataLoading(data)); },
        changeAccountData: (data) => { dispatch(Actions.accountData(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Login));