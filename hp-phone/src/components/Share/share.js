import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './share.module.less';

import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faWeixin, faWeibo, faQq, faHtml5  } from '@fortawesome/fontawesome-free-brands'

const Sharer = (props) => {
    const { show, click } = props;
    return (<Fragment>
        <div className={styles.share} style={{ bottom: show ? '0px' : '-254px' }} >
            <div className={styles.title}>
                <span className={styles.name}>分享到</span>
            </div>
            <div className={styles.shareContent}>
                <div className={styles.shareBtn}>
                    <span className={styles.wx + ' ' + styles.shareIcon}>
                        <FontAwesomeIcon icon={faWeixin} />
                    </span>
                    <span className={styles.iconName}>微信好友</span>
                </div>
                <div className={styles.shareBtn}>
                    <span className={styles.weibo + ' ' + styles.shareIcon}>
                        <FontAwesomeIcon icon={faWeibo} />
                    </span>
                    <span className={styles.iconName}>新浪微博</span>
                </div>
                <div className={styles.shareBtn}>
                    <span className={styles.qq + ' ' + styles.shareIcon}>
                        <FontAwesomeIcon icon={faQq} />
                    </span>
                    <span className={styles.iconName}>QQ好友</span>
                </div>
                <div className={styles.shareBtn}>
                    <span className={styles.html + ' ' + styles.shareIcon}>
                        <FontAwesomeIcon icon={faHtml5} />
                    </span>
                    <span className={styles.iconName}>分享页面</span>
                </div>
                <div className={styles.shareBtn}>
                    <span className={styles.Pimg + ' ' + styles.shareIcon}>
                        <FontAwesomeIcon icon={faImage} />
                    </span>
                    <span className={styles.iconName}>分享图片</span>
                </div>
            </div>
            <div className={styles.cancel} onClick={click}>取消</div>
        </div>
    </Fragment>)
}
const mapStateToProps = (state) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(classify(styles)(Sharer)));