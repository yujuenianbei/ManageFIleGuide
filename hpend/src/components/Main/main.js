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
import SettingContent from '../Setting';
// 路由
import EndRouters from '../../router/routers';
// 插件
import { Layout } from 'antd';
const { Content } = Layout;

class Main extends PureComponent {

    contentStyle = () => {
        const FH = this.props.state.setting.fixHeader;
        const LH = this.props.state.setting.leftFix;
        const LC = this.props.state.setting.leftCollapsed;
        if(!FH && !LH && !LC){
            return { margin: '0 16px' }
        } else if(!FH && !LH && LC) {
            return { margin: '0 16px', transition: 'all 0.2s' }
        } else if(!FH && LH && !LC) {
            return { margin: '0px 16px 0px 216px' }
        } else if(!FH && LH && LC) {
            return { margin: '0px 16px 0px 96px', transition: 'all 0.2s' }
        } else if(FH && !LH && !LC) {
            return { margin: '64px 16px 0px' }
        } else if(FH && !LH && LC) {
            return { margin: '64px 16px 0px 16px', transition: 'all 0.2s' }
        } else if(FH && LH && !LC) {
            return { margin: '64px 16px 0px 216px' }
        } else if(FH && LH && LC) {
            return { margin: '64px 16px 0px 96px', transition: 'all 0.2s' }
        }
    }

    render() {
        const FH = this.props.state.setting.fixHeader;
        const LH = this.props.state.setting.leftFix;
        const LC = this.props.state.setting.leftCollapsed;
        console.log(FH, LH, LC)
        return (
            <Fragment>
                {!!this.props.state.user.loginState &&
                    <Fragment>
                        <Layout style={{ minHeight: '100vh' }}>
                            <Left />
                            <Layout>
                                <Headers />
                                <Content className={styles.mainContent} style={this.contentStyle()}>
                                    <EndRouters />
                                </Content>
                                <ChatContent />
                                <SettingContent />
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