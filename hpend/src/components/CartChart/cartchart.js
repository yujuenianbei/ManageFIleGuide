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
import { Tabs, Table, Divider, Dropdown, Checkbox, Menu, Icon, Tag, Breadcrumb, Input, Col, Row, Select, Button, Modal, Spin, Progress } from 'antd';
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
const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;

class CartChart extends PureComponent {
    state = {
        cartProductData: null,
        cartProductDv: {},
        cartProductCols: {},
        tabSelect: 1
    }
    componentDidMount() {
        ProductNumberOfTypeInCart(this.cartProductData)
    }
    tabCallback = (key) => {
        this.setState({ tabSelect: key })
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
        const _this = this;
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
        const areadata = [
            {
                country: 'Asia',
                year: '0',
                value: 502,
            },
            {
                country: 'Asia',
                year: '2',
                value: 635,
            },
            {
                country: 'Asia',
                year: '4',
                value: 809,
            },
            {
                country: 'Asia',
                year: '6',
                value: 5268,
            },
            {
                country: 'Asia',
                year: '8',
                value: 4400,
            },
            {
                country: 'Asia',
                year: '10',
                value: 3634,
            },
            {
                country: 'Asia',
                year: '12',
                value: 947,
            },
            {
                country: 'Asia',
                year: '14',
                value: 502,
            },
            {
                country: 'Asia',
                year: '16',
                value: 635,
            },
            {
                country: 'Asia',
                year: '18',
                value: 809,
            },
            {
                country: 'Asia',
                year: '20',
                value: 5268,
            },
            {
                country: 'Asia',
                year: '22',
                value: 4400,
            },
            {
                country: 'Asia',
                year: '24',
                value: 3634,
            },


            {
                country: 'Africa',
                year: '0',
                value: 106,
            },
            {
                country: 'Africa',
                year: '2',
                value: 107,
            },
            {
                country: 'Africa',
                year: '4',
                value: 111,
            },
            {
                country: 'Africa',
                year: '6',
                value: 1766,
            },
            {
                country: 'Africa',
                year: '8',
                value: 221,
            },
            {
                country: 'Africa',
                year: '10',
                value: 767,
            },
            {
                country: 'Africa',
                year: '12',
                value: 133,
            }, {
                country: 'Africa',
                year: '14',
                value: 106,
            },
            {
                country: 'Africa',
                year: '16',
                value: 107,
            },
            {
                country: 'Africa',
                year: '18',
                value: 111,
            },
            {
                country: 'Africa',
                year: '20',
                value: 1766,
            },
            {
                country: 'Africa',
                year: '22',
                value: 221,
            },
            {
                country: 'Africa',
                year: '24',
                value: 767,
            },
        ];
        const areacols = {
            year: {
                type: 'linear',
                tickInterval: 2,
            },
        };
        const operations = this.state.tabSelect === "2" ? <Fragment>
            <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                    Disabled
                    </Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Button>Extra Action</Button>
        </Fragment> : this.state.tabSelect === "3" ? <Fragment>
            <Search
                placeholder="请输入产品ID"
                enterButton
                size="default"
                onSearch={value => console.log(value)}
            />
        </Fragment> : '';



        const cartRatedata = [
            {
                country: "中国",
                population: 131744
            },
            {
                country: "印度",
                population: 104970
            },
            {
                country: "美国",
                population: 29034
            },
            {
                country: "印尼",
                population: 23489
            },
            {
                country: "巴西",
                population: 18203
            }
        ];
        const dscr = new DataSet();
        const dvcr = dscr.createView().source(cartRatedata);
        dvcr.source(cartRatedata).transform({
            type: "reverse",
            callback(a, b) {
                // 排序依据，和原生js的排序callback一致
                return a.population - b.population > 0;
            }
        });

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
                            height={165}
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
                        {/* 环形图 */}
                        {this.state.cartProductDv && this.state.cartProductCols &&
                            <Chart
                                height={155}
                                data={this.state.cartProductDv}
                                scale={this.state.cartProductCols}
                                padding={[0, 0, 0, -180]}
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
                                    useHtml={true}
                                    offsetX={-80}
                                    reactive={true}
                                    containerTpl={'<div class="g2-legend">' + '<table class="g2-legend-list"></table>' + '</div>'}
                                    itemTpl={(value, color, checked, index) => {
                                        var obj = _this.state.cartProductDv.rows[index];
                                        var percent = (obj.percent * 100).toFixed(2) + '%';
                                        checked = checked ? 'checked' : 'unChecked';
                                        return '<tr class="g2-legend-list-item item-' + index + ' ' + checked + '" data-value="' + value + '" data-color=' + color + ' >' + '<td style="width:120px;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' + '<span class="g2-legend-text" style="color: #666">' + value + '</span></td>' + '<td style="text-align: right">' + percent + '</td>' + '</tr>';
                                    }}
                                    g2-legend={{
                                        position: 'absolute'
                                    }}
                                    g2-legend-list={{
                                        listStyleType: 'none',
                                        margin: 0,
                                        padding: 0
                                    }}
                                    g2-legend-list-item={{
                                        marginRight: 5,
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
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
                                        marginLeft: -100,
                                        lineWidth: 1,
                                        stroke: "#fff"
                                    }}
                                    animate={{
                                        appear: {
                                            animation: 'zoomIn'
                                        },
                                        leave: {
                                            animation: 'fadeOut',
                                            easing: 'easeElasticOut',
                                            delay: index => {
                                                return index * 10;
                                            }
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
                        <span>购物车活跃时间</span>
                        <Chart height={150}
                            data={areadata}
                            scale={areacols}
                            padding={[15, 5, 20, 35]}
                            forceFit>
                            <Axis name="year" />
                            <Axis name="value" />
                            <Legend />
                            <Tooltip />
                            <Geom type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} />
                            <Geom type="lineStack" position="year*value" size={2} color={['country', ['rgba(0, 146, 255, 1)', '#00ff00']]} />
                        </Chart>
                    </div>
                    <div className={styles.charts}>
                        <span>购物车活跃时间</span>
                        <Chart height={150}
                            data={areadata}
                            scale={areacols}
                            padding={[15, 5, 20, 35]}
                            forceFit>
                            <Axis name="year" />
                            <Axis name="value" />
                            <Legend />
                            <Tooltip />
                            <Geom type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} />
                            <Geom type="lineStack" position="year*value" size={2} color={['country', ['rgba(0, 146, 255, 1)', '#00ff00']]} />
                        </Chart>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.tabcharts}>
                        <Tabs defaultActiveKey="1" onChange={this.tabCallback} tabBarExtraContent={operations}>
                            <TabPane tab="总库存" key="1">
                                <Chart height={300}
                                    data={areadata}
                                    scale={areacols}
                                    padding={[15, 5, 20, 35]}
                                    forceFit>
                                    <Axis name="year" />
                                    <Axis name="value" />
                                    <Legend />
                                    <Tooltip />
                                    <Geom type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} />
                                    <Geom type="lineStack" position="year*value" size={2} color={['country', ['rgba(0, 146, 255, 1)', '#00ff00']]} />
                                </Chart>
                            </TabPane>
                            <TabPane tab="类库存" key="2">
                                <Chart height={300}
                                    data={areadata}
                                    scale={areacols}
                                    padding={[15, 5, 20, 35]}
                                    forceFit>
                                    <Axis name="year" />
                                    <Axis name="value" />
                                    <Legend />
                                    <Tooltip />
                                    <Geom type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} />
                                    <Geom type="lineStack" position="year*value" size={2} color={['country', ['rgba(0, 146, 255, 1)', '#00ff00']]} />
                                </Chart>
                            </TabPane>
                            <TabPane tab="产品库存和购物车" key="3">
                                <Chart height={300}
                                    data={areadata}
                                    scale={areacols}
                                    padding={[15, 5, 20, 35]}
                                    forceFit>
                                    <Axis name="year" />
                                    <Axis name="value" />
                                    <Legend />
                                    <Tooltip />
                                    <Geom type="areaStack" position="year*value" color={['country', ['l (90) 0:rgba(0, 146, 255, 1) 1:rgba(0, 146, 255, 0.1)', 'l (90) 0:rgba(0, 268, 0, 1) 1:rgba(0, 268, 0, 0.1)']]} />
                                    <Geom type="lineStack" position="year*value" size={2} color={['country', ['rgba(0, 146, 255, 1)', '#00ff00']]} />
                                </Chart>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className={styles.chart}>
                        <span>当前各地库存总数</span>
                        <Chart
                            height={350}
                            data={dvcr}
                            padding={[5, 20, 20, 30]}
                            forceFit>
                            <Coord transpose />
                            <Axis
                                name="country"
                                label={{
                                    offset: 6
                                }}
                            />
                            <Axis name="population" />
                            <Tooltip />
                            <Geom type="interval" position="country*population" />
                        </Chart>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.cartRate}>
                        <div className={styles.cartRateTitle}>
                            <span>1</span>
                        </div>
                        <Progress
                            type="circle"
                            width={140}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={90}
                        />
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
