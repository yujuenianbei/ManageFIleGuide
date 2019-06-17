import React, { PureComponent } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
import classify from '@magento/venia-concept/esm/classify';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Slider from "react-slick";
import ProductListMain from '../ProductListMain/index'
import ProductListBanner from '../ProductListBanner/index'
import styles from './Main.module.less';
import { Link } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import { Spin } from 'antd';
import './Main.css';

const GET_BANNER = gql`
query banner{
    banners{
        title
        img
        link
        __typename
    }
}
`;

const GET_PROMISEING = gql`
query promiseing{
    promiseing{
        title
        img
        link
        __typename
    }
}
`;

const GET_PRODUCTLIST = gql`
query productList{
    productList{
        id
        title
        img
        link
    }
}
`;


class Main extends PureComponent {
    state = {

    }
    render() {
        return (
            <div className="container">
                <Query query={GET_BANNER}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <div className={styles.bannerSpin}>
                            <Spin></Spin>
                        </div>;
                        if (error) return `Error! ${error.message}`;
                        return <Slider {...{
                            customPaging: function (i) {
                                if (data.banners.length > 0) {
                                    return (
                                        <Link to={data.banners[i].link}>
                                            {data.banners[i].title}
                                        </Link>
                                    );
                                }
                            },
                            dots: true,
                            dotsClass: "slick-dots slick-thumb",
                            infinite: true,
                            speed: 500,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: true,
                            autoplaySpeed: 5000
                        }}>
                            {data.banners.map((item, index) => (
                                <Link to={item.link} key={index + 'mainBanner_weqsdqwe'}>
                                    <div>
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                </Link>
                            ))}
                        </Slider>
                    }}
                </Query>
                <div className={styles.commonadds}>
                    <ul className={styles.topStaticAdds}>
                        <Query query={GET_PROMISEING}>
                            {({ loading, error, data, refetch }) => {
                                if (loading) return <div className={styles.commonaddsLoading}><Spin></Spin></div>;
                                if (error) return `Error! ${error.message}`;
                                return data.promiseing.map((item, index) => (
                                    <li key={index + "promiseing_123sdasd"}>
                                        <Link to={item.link}>
                                            <img src={item.img} alt={item.title} />
                                        </Link>
                                    </li>
                                ))
                            }}
                        </Query>
                    </ul>
                </div>
                <div className={styles.promiseing}>
                    <ul className={styles.promise_ul}>
                        <li>
                            <Icon className={styles.promise_icon}>search</Icon>
                            <h4>专属客服</h4>
                            <span className={styles.promise_info}>致电 <a href="tel:400-820-1015">400-820-1015</a></span>
                        </li>
                        <li>
                            <Icon className={styles.promise_icon}>search</Icon>
                            <h4>极速发货</h4>
                            <span className={styles.promise_info}>多仓直发</span>
                        </li>
                        <li>
                            <Icon className={styles.promise_icon}>search</Icon>
                            <h4>快捷支付</h4>
                            <span className={styles.promise_info}>多种支付方式</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.productContent}>
                    <div className={styles.productList}>
                        <h2>特色产品</h2>
                        <Query query={GET_PRODUCTLIST}>
                            {({ loading, error, data, refetch }) => {
                                if (loading) return <div className={styles.productListLoading}><Spin></Spin></div>;
                                if (error) return `Error! ${error.message}`;
                                return data.productList.map((item, index) => (
                                    <ProductListMain category={item} />
                                ))
                            }}
                        </Query>
                    </div>
                </div>
                <div className={styles.product}>
                    <ProductListBanner />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loading: (data) => { dispatch(Actions.loadingData(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(Main));