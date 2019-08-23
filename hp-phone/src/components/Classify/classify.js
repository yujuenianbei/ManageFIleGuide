import React, { Component, Fragment } from 'react';
import * as Actions from '../../actions/index';
import classify from '@magento/venia-concept/esm/classify';
import { connect } from 'react-redux';
import styles from './classify.module.less';
import './classify.css';
import { Drawer, List, NavBar, Icon, Carousel, WingBlank, Grid, Popover } from 'antd-mobile';
import Router from '../../router/detailRouter';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/fontawesome-free-solid'

import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from '../Loading';

// http
import { http } from '../../http';

const GET_TYPE = gql`
    query productType{
        productType{
            id,
            typeName,
            type
        }
}`;

class Home extends Component {
    componentDidMount() {
        document.getElementById('leftClassify').children[0].className = 'active';
        this.props.changeType(this.props.state.classify.type)
    }

    selectData = (index, item, data) => {
        if (this.props.state.classify.type !== item.id) {
            data.productType.forEach((items, indexes) => {
                if (indexes === index) {
                    document.getElementsByTagName('li')[index].className = 'active';
                    this.props.changeType(items.id)
                } else {
                    document.getElementsByTagName('li')[indexes].className = '';
                }
            })
        }
    }

    render() {
        return (<Fragment>
            <div className={styles.classify}>
                <div className={styles.classifyLeft} style={{ height: this.props.state.main.searchbar ? 'calc( 100vh - 162px )' : 'calc( 100vh - 112px )' }}>
                    <ul id="leftClassify">
                        <Query query={GET_TYPE}>
                            {({ loading, error, data, refetch }) => {
                                if (loading) return <div>
                                    <Loading />
                                </div>;
                                if (error) return `Error! ${error.message}`;
                                return data.productType.map((item, index) => {
                                    return <li key={"classifyList" + index} onClick={() => this.selectData(index, item, data)} className={index === 0 ? 'active' : ''}>
                                        <span>{item.typeName}</span>
                                    </li>
                                })
                            }}
                        </Query>
                    </ul>
                </div>
                <div className={styles.classifyContent}
                    style={{ height: this.props.state.main.searchbar ? 'calc( 100vh - 162px )' : 'calc( 100vh - 112px )' }}>
                    <ul>
                        {this.props.state.classify.typeLoading && <Loading />}
                        {this.props.state.classify.typeProduct && !this.props.state.classify.typeLoading && this.props.state.classify.typeProduct.map((item, index) => {
                            return <li key={"classifyContent" + index}>
                                <img src={item.img.split('http').length > 1 ? item.img : http.img + item.img} alt="" />
                            </li>
                        })}
                    </ul>
                </div>
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
        changeType: (data) => { dispatch(Actions.changeType(data)) }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(classify(styles)(Home)));
