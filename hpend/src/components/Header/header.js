import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';

// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './header.module.less';

import { Layout, BackTop, Icon, Menu, Dropdown, Avatar } from 'antd';

const { Header } = Layout;

class Headers extends PureComponent {
    state = {

    };

    menuclick = (e) => {
        if(e.key === "0"){

        } else if(e.key === "1"){

        } else if(e.key === "2"){
            this.props.changeLoginstate(0);
            this.props.changeQrState(1);
            this.props.changeQrMessage('请扫描二维码')
            this.props.changeUsername('');
            this.props.changePageUid('')
            localStorage.removeItem("uid");
            console.log(localStorage.getItem('persist:root'))
        }
    }

    render() {
        const menu = (
            <Menu onClick={this.menuclick}>
                <Menu.Item key="0">
                    <Icon type="user" />
                    用户中心
                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="setting" />
                    个人设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        )
        return (
            <Fragment>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className={styles.userContol}>
                            <Avatar size="large" icon="user" title="用户管理" />
                            <span className={styles.userName}>{this.props.state.user.userName}</span>
                        </div>
                    </Dropdown>
                </Header>
                <BackTop>
                    <Icon className={styles.up} type="up" />
                </BackTop>
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
        changeLoginstate: (data) => { dispatch(Actions.loginstate(data)) }, 
        changePageUid: (data) => { dispatch(Actions.pageUid(data)) },
        changeQrState: (data) => { dispatch(Actions.qrState(data)) },
        changeQrMessage: (data) => { dispatch(Actions.qrMessage(data)) },
        changeUsername: (data) => { dispatch(Actions.username(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Headers));