import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './UserController.module.less';
import Icon from '@material-ui/core/Icon';

class UserController extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.userController}>
                    <Icon className={styles.userIcon}>phone</Icon>
                    <Icon className={styles.userIcon}>shopRounded</Icon>
                    <Icon className={styles.userIcon}>cast</Icon>
                    <Icon className={styles.userIcon}>cameraSharp</Icon>
                </div>
            </Fragment>
        );
    }
}
export default classify(styles)(UserController);