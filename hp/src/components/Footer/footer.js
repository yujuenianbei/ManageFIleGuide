import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import { Icon } from '@material-ui/core';
import styles from './footer.module.less';
import jd from '../../img/jd.png';
import wx from '../../img/weixin.png';
import cash from '../../img/cash.png';
import FooterLinks from './footerLinks';
import FooterInfo from './footerInfo';
class Footer extends Component {
    render() {
        // const { searchOpen, classes, toggleSearch } = this.props;
        return (
            <div className={styles.footer}>
                <div className={styles.country}>
                    <Icon>search</Icon>
                    <span>中华人民共和国  |  </span>
                    <a href="tel:400-820-1015">400-820-1015</a>
                </div>
                <div className={styles.payment}>
                    <ul>
                        <li>
                            <img src={jd} title="JD" alt="JD" />
                        </li>
                        <li>
                            <img src={wx} title="WeiXin" alt="WeiXin" />
                        </li>
                        <li>
                            <img src={cash} title="MPOS" alt="MPOS" />
                        </li>
                    </ul>
                </div>
                <FooterLinks />
                <FooterInfo />
            </div>
        );
    }
}
export default classify(styles)(Footer);