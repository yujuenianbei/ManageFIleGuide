import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './productHeader.module.less';

import { Link, withRouter } from 'react-router-dom';
import { Close, ArrowBack, Share } from '@material-ui/icons';

import Sharer from '../Share';
import Mask from '../Mask';

class ProductHeader extends Component {
    state = {
        shareState: true
    }
    goback = () => {
        this.props.props.history.goBack();
    }
    changeShare = () => {
        this.setState({ shareState: !this.state.shareState })
    }
    render() {
        return (<Fragment>
            <div className={styles.productHeader}>
                <div className={styles.headerContent}>
                    <span>
                        <ArrowBack onClick={this.goback}></ArrowBack>
                    </span>
                    <span>
                        <Share onClick={this.changeShare}></Share>
                    </span>
                </div>
            </div>
            <Mask click={this.changeShare} show={this.state.shareState} />
            <Sharer click={this.changeShare} show={this.state.shareState} />
        </Fragment>);
    }
}
const mapStateToProps = (state) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeTypeState: (data) => { dispatch(Actions.changeType(data)) },
        // changeShare: (data) => { dispatch(Actions.shareState(data)) }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(classify(styles)(ProductHeader)));