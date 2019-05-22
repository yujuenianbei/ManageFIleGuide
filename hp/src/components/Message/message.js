import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './message.module.less';
import { Icon } from 'antd';

class Message extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.type === "warn" &&
                    <div className={styles.message + " " + styles.warn}>
                        <Icon theme="twoTone" twoToneColor="#eea236" type="info-circle" />
                        {this.props.children}
                    </div>
                }
                {
                    this.props.type === "alert" &&
                    <div className={styles.message + " " + styles.alert}>
                        <Icon theme="twoTone" twoToneColor="#ff0909" type="close-circle" />
                        {this.props.children}
                    </div>
                }
                {
                    this.props.type === "success" &&
                    <div className={styles.message + " " + styles.success}>
                        <Icon theme="twoTone" twoToneColor="#52c41a" type="check-circle" />
                        {this.props.children}
                    </div>
                }
            </Fragment>
        );
    }
}

export default classify(styles)(Message);

