import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import { Icon } from '@material-ui/core';
import styles from './footer.module.less';
import { Layout, Icon } from 'antd';

const { Footer } = Layout;
class Footer extends Component {
    render() {
        // const { searchOpen, classes, toggleSearch } = this.props;
        return (
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        );
    }
}
export default classify(styles)(Footer);