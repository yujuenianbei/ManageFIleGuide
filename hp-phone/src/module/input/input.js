import React, { Fragment, PureComponent } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './login.module.less';

class Main extends PureComponent {
    render() {
        const { type, placeholder, defaultValue } = this.props
        return (
            <Fragment>
                <input
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </Fragment>
        )
    }
}
export default classify(styles)(Main);