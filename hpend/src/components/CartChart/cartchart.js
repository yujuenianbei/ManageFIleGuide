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
        cartProductData: null,
        cartProductDv: {},
        cartProductCols: {},
    }
    componentDidMount() {
        ProductNumberOfTypeInCart(this.cartProductData)
    }
    cartProductData = (result) => {
        if (result.data.queryProductNumberOfType.length > 0) {
            console.log(result)
            this.setState({
                cartProductData: result.data.queryProductNumberOfType,
            }, () => {
                const { DataView } = DataSet;
                const dv = new DataView();
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
                this.setState({
                    cartProductDv: dv,
                    cartProductCols: cols
                })
            })
        }
    }
    refreshCartProductData = () => {
        ProductNumberOfTypeInCart(this.cartProductData)
    }
    render() {
        const { Html } = Guide;

        const data = [
            {
                year: "1951 年",
                sales: 38
            },
            {
                year: "1952 年",
                sales: 52
            },
            {
                year: "1956 年",
                sales: 61
            },
            {
                year: "1957 年",
                sales: 145
            },
            {
                year: "1958 年",
                sales: 48
            },
            {
                year: "1959 年",
                sales: 38
            },
            {
                year: "1960 年",
                sales: 38
            },
            {
                year: "1962 年",
                sales: 38
            }
        ];
        const cols = {
            sales: {
                tickInterval: 20
            }
        };

        const label = {
            offset: 5, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
            rotate: 0, // 旋转角度
            // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
            rotate: 0, //文本旋转角度
            textStyle: {
                textAlign: 'center', // 文本对齐方向，可取值为： start center end
                fill: '#404040', // 文本的颜色
                fontSize: '12', // 文本大小
                fontWeight: 'bold', // 文本粗细
                textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
            },
            autoRotate: false, // 文本是否需要自动旋转，默认为 true
        }

        return (
            <Fragment>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>购物车管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.content}>
                    <div className={styles.charts}>
                        <Chart
                            marginLeft={30}
                            height={155}
                            data={data}
                            scale={cols}
                            padding={[15, 5, 20, 15]}
                            forceFit>
                            <Axis name="year" />
                            <Axis name="sales" label={label} />
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="year*sales" />
                        </Chart>
                    </div>
                    <div className={styles.charts}>
                        <span>各分类购物车收藏量</span>
                        <Icon type="reload" onClick={this.refreshCartProductData} />
                        {this.state.cartProductDv && this.state.cartProductCols &&
                            <Chart
                                height={145}
                                data={this.state.cartProductDv}
                                scale={this.state.cartProductCols}
                                padding={[0, 0, 0, -50]}
                                forceFit
                                onGetG2Instance={g2Chart => {
                                    g2Chart.animate(false);
                                    console.log(g2Chart);
                                }}
                            >
                                <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                                <Axis name="percent" />
                                {/* <Legend
                                    itemFormatter(val) {
                                        return val + "xxx"; // val 为每个图例项的文本值
                                    }
                                /> */}
                                <Legend
                                    position="right"
                                    // offsetY={-window.innerHeight / 2 + 120}
                                    offsetX={-100}
                                // useHtml={true}
                                // custom={true}
                                // containerTpl={'<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">'
                                // + '<h4 class="g2-legend-title"></h4>' 
                                // + '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>'
                                // + '</div>'}
                                // itemTpl={'<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px;">'
                                // + '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>'
                                // + '<span class="g2-legend-text">{value}:111</span>'
                                // + '</li>'}
                                // items={[
                                //     { value: 'value', marker: {symbol: 'diamond', fill: '#3182bd', radius: 5} }
                                //   ]}
                                />
                                <Tooltip
                                    showTitle={false}
                                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                                />
                                {/* <Guide>
                                    <Html
                                        position={["50%", "50%"]}
                                        html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                                        alignX="middle"
                                        alignY="middle"
                                    />
                                </Guide> */}
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
                                        appear: {
                                            animation: 'zoomIn'
                                        },
                                        leave: {
                                            animation: 'fadeOut',
                                            // easing: 'easeElasticOut',
                                            // delay: index => {
                                            //     return index * 10;
                                            // }
                                        }
                                    }}
                                >
                                    <Label
                                        content="percent"
                                        formatter={(val, item) => {
                                            return;
                                        }}
                                    />
                                </Geom>
                            </Chart>
                        }
                    </div>
                    <div className={styles.charts}>
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
