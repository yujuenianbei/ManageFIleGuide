import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import classify from '@magento/venia-concept/esm/classify';

// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './header.module.less';

import { Layout, BackTop, Icon } from 'antd';

const { Header } = Layout;

class Headers extends PureComponent {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Fragment>
                <Header style={{ background: '#fff', padding: 0 }} />
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
export default connect(
    mapStateToProps,
)(classify(styles)(Headers));