import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './product.module.less';
import { Drawer, List, NavBar, Icon, Carousel, WingBlank, Grid, Popover } from 'antd-mobile';
import Router from '../../router/detailRouter';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/fontawesome-free-solid';


import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from '../Loading';
import ProductHeader from '../ProductHeader';

const QUERY_PRODUCT = gql`query queryProductById($id: Int){
    queryProductById(id: $id){
        id
        img
        productName
        promotionMessage
        features
        promotionMessageSecond
        usedPrice
        nowPrice
    }
}`
class Product extends Component {
    render() {
        return (<Fragment>
            <ProductHeader props={this.props} />
            <div className={styles.product}>
                <Query query={QUERY_PRODUCT} variables={{ id: parseInt(this.props.match.params.id) }}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <div>
                            <Loading />
                        </div>;
                        if (error) return `Error! ${error.message}`;
                        console.log(data)
                        return 123123
                    }}
                </Query>
            </div>
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

    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(classify(styles)(Product)));
