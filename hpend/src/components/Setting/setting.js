import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import styles from './setting.module.less';
// 插件
// import UUID from 'uuid-js';
import { Drawer, Tabs, Row, Col, Radio, Switch } from 'antd';
// http
import { http } from '../../http'
const { TabPane } = Tabs;
const ref = React.createRef();
class ChatContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            height: document.body.offsetHeight - 110,
            chatContentHeight: document.body.offsetHeight - 150,
        };
    }


    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }
    onWindowResize = () => {
        this.setState({
            height: document.body.offsetHeight - 110,
            chatContentHeight: document.body.offsetHeight - 150,
        })
    }
    closeSetting = () => {
        this.props.changeSettingModel(!this.props.state.setting.modelState);
    }

    // 设置头部是否浮动
    changeHeader = () => {
        this.props.changeSettingHeader(!this.props.state.setting.fixHeader);
    }
    // 侧边栏
    changeLeftCollapsed = () => {
        this.props.changeSettingCollapsed(!this.props.state.setting.leftCollapsed);
    };
    // 固定侧边栏
    changeLeftFix = () => {
        this.props.changeSettingLeftFix(!this.props.state.setting.leftFix);
    }
    // 切换主题
    changeTheme = (e) => {
        // console.log(e.target.value)
        this.props.changeSettingMenuTheme(e.target.value);
    }

    render() {
        return (
            <Fragment>
                <Drawer
                    title="系统设置"
                    placement="right"
                    mask={false}
                    closable={true}
                    onClose={this.closeSetting}
                    width={400}
                    style={this.props.state.setting.fixHeader ? { top: 66 } : { top: 0 }}
                    bodyStyle={{ padding: 10 }}
                    visible={this.props.state.setting.modelState}
                >
                    <div>
                        <div className={styles.settingList}>
                            <Row justify='space-between'>
                                <Col span={24}>
                                    <Col span={16}>
                                        <label>系统主题</label>
                                    </Col>
                                    <Col span={8}>
                                        <Radio.Group onChange={this.changeTheme} defaultValue={this.props.state.setting.menuTheme}>
                                            <Radio.Button value="dark">深色</Radio.Button>
                                            <Radio.Button value="light">浅色</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.settingList}>
                            <Row justify='space-between'>
                                <Col span={24}>
                                    <Col span={21}>
                                        <label>固定头部</label>
                                    </Col>
                                    <Col span={3}>
                                        <Switch defaultChecked={this.props.state.setting.fixHeader} onChange={this.changeHeader} />
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.settingList}>
                            <Row justify='space-between'>
                                <Col span={24}>
                                    <Col span={21}>
                                        <label>收起侧边栏</label>
                                    </Col>
                                    <Col span={3}>
                                        <Switch defaultChecked={this.props.state.setting.leftCollapsed} onChange={this.changeLeftCollapsed} />
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.settingList}>
                            <Row justify='space-between'>
                                <Col span={24}>
                                    <Col span={21}>
                                        <label>固定侧边栏</label>
                                    </Col>
                                    <Col span={3}>
                                        <Switch defaultChecked={this.props.state.setting.leftFix} onChange={this.changeLeftFix} />
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Drawer>
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
        // 设置
        changeSettingModel: (data) => { dispatch(Actions.settingModel(data)) },
        changeSettingHeader: (data) => { dispatch(Actions.settingHeader(data)) },
        changeSettingCollapsed: (data) => { dispatch(Actions.settingCollapsed(data)) },
        changeSettingLeftFix: (data) => { dispatch(Actions.settingLeftFix(data)) },
        changeSettingMenuTheme: (data) => { dispatch(Actions.settingMenuTheme(data)) },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(ChatContent));