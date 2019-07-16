import React, { PureComponent, Fragment } from 'react';
import * as Actions from '../../actions/index';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
import styles from './cartchart.module.less';
import { searchCart, searchCartTotal } from '../../fetch/cart'
import { getAllproductType } from '../../fetch/productType'
import { timestampToTime, typeToTypeName } from '../../func/common'
import { Table, Divider, Dropdown, Checkbox, Menu, Icon, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin } from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import { ProductNumberOfTypeInCart } from '../../fetch/cartChart'

class CartChart extends PureComponent {
    state = {
        cartProductData: []
    }
    componentDidMount() {
        ProductNumberOfTypeInCart(this.cartProductData)
    }
    cartProductData = (result) => {
        // console.log(result.data.queryProductNumberOfType)
        this.setState({ cartProductData: result.data.queryProductNumberOfType })
    }
    refreshCartProductData = () => {
        ProductNumberOfTypeInCart(this.cartProductData)
    }
    render() {
        const { DataView } = DataSet;
        const { Html } = Guide;
        const data = [
            {
                item: "consumable",
                count: 40
            },
            {
                item: "display",
                count: 21
            },
            {
                item: "gamebook",
                count: 17
            },
            {
                item: "notebook",
                count: 13
            },
            {
                item: "peripheral",
                count: 9
            },
            {
                item: "printer",
                count: 9
            }
        ];
        const dv = new DataView();
        console.log(dv)
        dv.source(this.state.cartProductData).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = parseInt(val * 100) + "%";
                    return val;
                }
            }
        };
        return (
            <Fragment>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>购物车管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.content}>
                    <div className={styles.charts}>
                        <Icon type="reload" onClick={this.refreshCartProductData} />
                        <Chart
                            height={500}
                            width={500}
                            data={dv}
                            scale={cols}
                            padding={[80, 100, 80, 80]}
                            forceFit
                        >
                            <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                            <Axis name="percent" />
                            <Legend
                                position="right"
                                // offsetY={-window.innerHeight / 2 + 120}
                                offsetX={-100}
                            />
                            <Tooltip
                                showTitle={false}
                                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                            />
                            <Guide>
                                <Html
                                    position={["50%", "50%"]}
                                    html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                                    alignX="middle"
                                    alignY="middle"
                                />
                            </Guide>
                            <Geom
                                type="intervalStack"
                                position="percent"
                                color="item"
                                tooltip={[
                                    "item*percent",
                                    (item, percent) => {
                                        percent = parseInt(percent * 100) + "%";
                                        return {
                                            name: item,
                                            value: percent
                                        };
                                    }
                                ]}
                                style={{
                                    lineWidth: 1,
                                    stroke: "#fff"
                                }}
                                animate={{
                                    update: {
                                    animation: 'fadeIn',
                                    easing: 'easeElasticOut',
                                    delay: index => {
                                      return index * 10;
                                    }
                                    }
                            >
                                <Label
                                    content="percent"
                                    formatter={(val, item) => {
                                        return item.point.item + ": " + val;
                                    }}
                                />
                            </Geom>
                        </Chart>
                    </div>
                </div>
            </Fragment>
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
        changeModleState: (data) => { dispatch(Actions.cartModleState(data)); },
        changeCartDataLoading: (data) => { dispatch(Actions.cartDataLoading(data)); },
        changeCartData: (data) => { dispatch(Actions.cartData(data)); },
        changeModleName: (data) => { dispatch(Actions.cartModleName(data)); },
        changeModleTitle: (data) => { dispatch(Actions.cartModleTitle(data)); },
        changeModelData: (data) => { dispatch(Actions.cartModelData(data)); },
        changeCheckListCol: (data) => { dispatch(Actions.cartCheckListCol(data)); },
        changePageSize: (data) => { dispatch(Actions.cartPageSize(data)); },
        changePageNow: (data) => { dispatch(Actions.cartPageNow(data)); },
        changePageTotal: (data) => { dispatch(Actions.cartPageTotal(data)); },
        changeSearchValue: (data) => { dispatch(Actions.cartSearchValue(data)); },
        changeSearchType: (data) => { dispatch(Actions.cartSearchType(data)); },

        // 排序
        changePageSort: (data) => { dispatch(Actions.cartPageSort(data)); },
        changePageSortCol: (data) => { dispatch(Actions.cartPageSortCol(data)); },
        // 产品分类
        changeCartTypeList: (data) => { dispatch(Actions.cartTypeList(data)); },
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(classify(styles)(CartChart));
