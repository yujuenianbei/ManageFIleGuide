import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './home.module.less';
import { Drawer, List, NavBar, Icon, Carousel, WingBlank, Grid, Popover } from 'antd-mobile';


import { Link, withRouter } from 'react-router-dom';
import Router from '../../router/detailRouter';

import { Query, Mutation } from "@apollo/react-components";
import gql from 'graphql-tag';

import Loading from '../Loading';
// func
import { imgLoading } from '../../func/commom'

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

class Home extends Component {

    state = {
        visible: false,
        selected: '',
        open: false,
        data: ['1', '2', '3'],
        imgHeight: 176,
        data0: Array.from(new Array(4)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
            text: `name${i}`,
        })),
        data1: Array.from(new Array(6)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
            text: `name${i}`,
        }))
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    render() {
        return (<Fragment>
            <WingBlank>
                <Query query={GET_BANNER}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return <div className={styles.bannerSpin}>
                            <Loading />
                        </div>;
                        if (error) return `Error! ${error.message}`;
                        return <Carousel
                            autoplay={true}
                            infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                        >
                            {data.banners.map((item, index) => (
                                <Link to={item.link}
                                    key={index + 'mainBanner_weqsdqwe'}
                                    href="http://www.alipay.com"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={item.img}
                                        alt="item.title"
                                        style={{ width: '100%', verticalAlign: 'top', display: "none" }}
                                        onLoad={(e) => {
                                            imgLoading(e);
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                    <img src="https://placehold.it/1920x694/f1f1f1/f1f1f1.png" />
                                </Link>
                            ))}
                        </Carousel>
                    }}
                </Query>
            </WingBlank>
            <Query query={GET_PROMISEING}>
                {({ loading, error, data, refetch }) => {
                    if (loading) return <div className={styles.commonaddsLoading}><Loading /></div>;
                    if (error) return `Error! ${error.message}`;
                    return <Grid
                        data={data.promiseing}
                        hasLine={false}
                        square={false}
                        columnNum={2}
                        renderItem={(dataItem, index) => (
                            <Fragment>
                                <img onLoad={(e)=>{imgLoading(e)}} src={dataItem.img} style={{ width: '100%', height: '100%', display: "none" }} alt={dataItem.title} />
                                <img style={{width: "100%", height: "100%"}} src="https://placehold.it/474x255/f1f1f1/f1f1f1.png" />
                            </Fragment>
                        )}
                    />
                }}
            </Query>

            <Grid
                data={this.state.data1}
                hasLine={false}
                square={false}
                columnNum={3}
                itemStyle={{ height: 130 }}
                renderItem={dataItem => (
                    <div key={dataItem.icon + '1'} style={{ padding: '7px 10.5px' }}>
                        <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                        <div style={{ color: '#888', fontSize: '14px' }}>
                            <span>{dataItem.text}</span>
                        </div>
                    </div>
                )} />
            <Grid
                data={this.state.data1}
                hasLine={false}
                square={false}
                columnNum={3}
                itemStyle={{ height: 130 }}
                renderItem={dataItem => (
                    <div key={dataItem.icon + '1'} style={{ padding: '7px 10.5px' }}>
                        <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                        <div style={{ color: '#888', fontSize: '14px' }}>
                            <span>{dataItem.text}</span>
                        </div>
                    </div>
                )} />
            <Grid
                data={this.state.data1}
                hasLine={false}
                square={false}
                columnNum={3}
                itemStyle={{ height: 130 }}
                renderItem={dataItem => (
                    <div key={dataItem.icon + '1'} style={{ padding: '7px 10.5px' }}>
                        <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                        <div style={{ color: '#888', fontSize: '14px' }}>
                            <span>{dataItem.text}</span>
                        </div>
                    </div>
                )} />
            <Grid
                data={this.state.data1}
                hasLine={false}
                square={false}
                columnNum={3}
                itemStyle={{ height: 130 }}
                renderItem={dataItem => (
                    <div key={dataItem.icon + '1'} style={{ padding: '7px 10.5px' }}>
                        <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                        <div style={{ color: '#888', fontSize: '14px' }}>
                            <span>{dataItem.text}</span>
                        </div>
                    </div>
                )} />
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
)(withRouter(classify(styles)(Home)));
