import React, { Component, Fragment, useState, useEffect } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './headerSearch.module.less';

import { Link, withRouter } from 'react-router-dom';
// icon
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faBars } from '@fortawesome/fontawesome-free-solid';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';

import { Close, Search } from '@material-ui/icons';

const HeaderSearch = (props) => {
    const { showSearch } = props;
    const [search, setSearch] = useState('');
    useEffect(() => {
        console.log(search)
      });

    return (<Fragment>
        {showSearch && <div className={styles.headerSearch}>
            <div className={styles.headerSearchContainer}>
                <div className={styles.searchBar}>
                    <span className={styles.searchRoot}>
                        <span className={styles.input}>
                            <input className={styles.searchInput} value={search} onChange={(e) => setSearch(e.target.value)} />
                        </span>
                        <span className={styles.inputBefore}><Search /></span>
                        {search &&
                            <span className={styles.inputAfter}><Close onClick={() => setSearch('')}/></span>
                        }
                    </span>
                </div>
            </div>
        </div>}
    </Fragment>);
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
)(withRouter(classify(styles)(HeaderSearch)));
