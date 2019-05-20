import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
// import classify from '@magento/venia-concept/esm/classify';
// import { connect } from '@magento/venia-concept/esm/drivers';

// import { Link, resourceUrl, Route } from '@magento/venia-concept/esm/drivers';
import { connect } from 'react-redux';
import styles from './Notification.module.less';
// import Icon from '@material-ui/core/Icon';

class Notification extends Component {
    componentDidMount() {

    }
    hideNotification = () => {
        this.props.offlinenote(!this.props.state.main.offlineNote)
    }
    render() {
        return (
            <Fragment>
                { this.props.state.main.offlineNote && this.props.state.main.offline &&
                    <button className={styles.note} onClick={this.hideNotification}>您已处于离线状态</button>
                }
                { this.props.state.main.offlineNote && !this.props.state.main.offline &&
                    <button className={styles.note} onClick={this.hideNotification}>您已处于在线状态</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        offlinenote: (data) => { dispatch(Actions.offLineNote(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);