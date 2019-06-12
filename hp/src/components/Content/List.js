import React, { PureComponent, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Main.module.less';
import Crumbs from '../Crumbs';
import { Collapse, Slider, Checkbox, Row, Col, Icon, Pagination, Spin } from 'antd';
import { getProductsByPage } from '../../fetch/product'
import ProductListData from '../../data/productListData';
import ProductListInfoDetail from '../ProductListInfoDetail';
import ProductListLink from '../ProductListLink';
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;

function callback(key) {
    console.log(key);
}
class ProductList extends PureComponent {
    state = {
        sliderSection: ProductListData.sliderSection,
        priceSection: ProductListData.priceSection,
        selectPriceSection: ProductListData.selectPriceSection,
        classify: ProductListData.classify,
        detailSelect: ProductListData.detailSelect,
        cpuType: ProductListData.cpuType,
        cpuSerise: ProductListData.cpuSerise,
        outlook: ProductListData.outlook,
        screen: ProductListData.screen,
        contain: ProductListData.contain,
        storage: ProductListData.storage,
        system: ProductListData.system,
        graphic: ProductListData.graphic,
        weight: ProductListData.weight,
        use: ProductListData.use,
        subsidiary: ProductListData.subsidiary,
        character: ProductListData.character,

        categoryDescriptionSwtich: false,

        tabHeader: ProductListData.tabHeader,

        tabIndex: 0,
        start: 0,
        pageSize: 9,
        loading: false,
        productListInfo: []
    }
    componentDidMount() {
        this.setState({ loading: true })
        getProductsByPage(this.state.start, this.state.pageSize, this.loadProducts);
    }
    // 加载产品
    loadProducts = (reslut) => {
        this.setState({ productListInfo: reslut.data.queryProducts, loading: false })
    }
    onChange = (value) => {
        // console.log('moving: ', value);
        const price = value.map(item => {
            return Math.floor(item * (this.state.priceSection[1] - this.state.priceSection[0]) / 100 + this.state.priceSection[0])
        })
        this.setState({ sliderSection: value, selectPriceSection: price })
    }

    onAfterChange = (value) => {
        console.log('moved: ', value);
    }
    onSelectChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    categorySwtich = () => {
        this.setState({ categoryDescriptionSwtich: !this.state.categoryDescriptionSwtich })
    }
    // tab切换
    changeTab = (index) => {
        this.setState({ tabIndex: index })
    }
    // 分页
    pageChange = (current, pageSize) => {
        this.setState({ start: (current - 1) * pageSize }, () => {
            window.scrollTo(0, 0);
            this.setState({ loading: true })
            getProductsByPage(this.state.start, this.state.pageSize, this.loadProducts);
        })
        console.log(current, pageSize);
    }
    onShowSizeChange = (current, pageSize) => {
        // console.log(current, pageSize);
        this.setState({ pageSize, }, () => {
            this.setState({ loading: true })
            getProductsByPage(this.state.start, this.state.pageSize, this.loadProducts);
        })
    }
    render() {
        return (
            <div className={styles.productList}>
                <Crumbs links={[{
                    link: '/',
                    name: '家用'
                }]} />
                <div className={styles.productListContent}>
                    <div className={styles.productListFilter} >
                        <h2>购物选项</h2>
                        <Collapse defaultActiveKey={['1']} onChange={callback} expandIconPosition={'right'}>
                            <Panel header="价格范围" key="1">
                                <div className={styles.price}>
                                    <div className={styles.priceValue}>
                                        <span className={styles.minPrice}>￥ {this.state.selectPriceSection[0]}</span>
                                        <span className={styles.maxPrice}>￥ {this.state.selectPriceSection[1]}</span>
                                    </div>
                                    <Slider
                                        range
                                        step={1}
                                        tipFormatter={null}
                                        defaultValue={this.state.sliderSection}
                                        onChange={this.onChange}
                                        onAfterChange={this.onAfterChange}
                                    />
                                </div>
                            </Panel>
                            <Panel header="类别" key="2">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.classify.map((item, index) => {
                                            return <Col span={24} key={index + "classify"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="细分" key="3">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.detailSelect.map((item, index) => {
                                            return <Col span={24} key={index + "detailSelect"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="处理器" key="4">
                                <Collapse defaultActiveKey={['1']} onChange={callback} expandIconPosition={'right'}>
                                    <Panel header="处理器类型" key="31">
                                        <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                            <Row>
                                                {this.state.cpuType.map((item, index) => {
                                                    return <Col span={24} key={index + "cpuType"}>
                                                        <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                                    </Col>
                                                })}
                                            </Row>
                                        </CheckboxGroup>
                                    </Panel>
                                    <Panel header="处理器系列" key="32">
                                        <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                            <Row>
                                                {this.state.cpuSerise.map((item, index) => {
                                                    return <Col span={24} key={index + "cpuSerise"}>
                                                        <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                                    </Col>
                                                })}
                                            </Row>
                                        </CheckboxGroup>
                                    </Panel>
                                </Collapse>
                            </Panel>
                            <Panel header="外形" key="5">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.outlook.map((item, index) => {
                                            return <Col span={24} key={index + "outlook"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="屏幕尺寸" key="6">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.screen.map((item, index) => {
                                            return <Col span={24} key={index + "screen"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="容量" key="7">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.contain.map((item, index) => {
                                            return <Col span={24} key={index + "contain"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="标准内存" key="8">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.storage.map((item, index) => {
                                            return <Col span={24} key={index + "storage"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="操作系统" key="9">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.system.map((item, index) => {
                                            return <Col span={24} key={index + "system"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="显卡" key="10">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.graphic.map((item, index) => {
                                            return <Col span={24} key={index + "graphic"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="重量（公制）" key="11">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.weight.map((item, index) => {
                                            return <Col span={24} key={index + "weight"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="使用情况" key="12">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.use.map((item, index) => {
                                            return <Col span={24} key={index + "use"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="子品牌" key="13">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.subsidiary.map((item, index) => {
                                            return <Col span={24} key={index + "subsidiary"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                            <Panel header="特性" key="14">
                                <CheckboxGroup style={{ width: '100%' }} onChange={this.onSelectChange}>
                                    <Row>
                                        {this.state.character.map((item, index) => {
                                            return <Col span={24} key={index + "character"}>
                                                <Checkbox value={item.value}>{item.label}({item.num})</Checkbox>
                                            </Col>
                                        })}
                                    </Row>
                                </CheckboxGroup>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={styles.productListProduct}>
                        <div className={styles.productListTitle}>
                            <h4>家用笔记本</h4>
                            <span onClick={this.categorySwtich}>阅读有关 家用笔记本 的信息<Icon type={this.state.categoryDescriptionSwtich ? "up" : "down"} /></span>
                        </div>
                        <div className={this.state.categoryDescriptionSwtich ? styles.categoryDescriptionOn : styles.categoryDescriptionOff}>
                            <p>
                                想要购买一台笔记本电脑供个人或家庭使用？ 惠普为您提供了多种选择，无论是工作，学习还是休闲。 对于那些只想要简单机器的人来说，我们的Essential系列产品致力于让您随时随地享受随意的浏览和媒体娱乐。 如果您想要轻便便携的轻便笔记本电脑，请选择我们的HP Envy或Spectre。 它们纤薄时尚，但它们还具有出色的性能，可满足您在旅途中的需求。 我们的Pavilion系列是一款适用于多媒体和游戏的功能强大的多功能笔记本电脑，但如果您认真对待虚拟世界，我们的HP Omen笔记本电脑将使您在战场上随时随地无与伦比。 浏览我们的个人笔记本电脑
                            </p>
                        </div>
                        <div className={styles.productListProductAd}>
                            <img src="https://servedbyadbutler.com/getad.img/;libID=651581" alt="ads" />
                        </div>
                        <div className={styles.productListProductDetail}>
                            <div className={styles.topSelect}>
                                <ul>
                                    {this.state.tabHeader.map((item, index) => {
                                        return <li key={index + "tabHeader_123123"} className={this.state.tabIndex === index ? styles.active : ''} onClick={() => this.changeTab(index)}>{item.label}</li>
                                    })}
                                </ul>
                            </div>
                            <div className={styles.productListProductContent}>
                                <div className={this.state.tabIndex === 0 ? styles.active + ' ' + styles.content : styles.common}>
                                    <div className={styles.spin}><Spin spinning={this.state.loading}></Spin></div>
                                    {!this.state.loading &&
                                        <Fragment>
                                            <ul className={styles.product}>
                                                {ProductListData.purpose.map((item, index) => {
                                                    return <li key={index + "purpose_sdasq123"}>
                                                        <ProductListLink
                                                            img={item.img}
                                                            title={item.title}
                                                            link={item.link}
                                                        />
                                                    </li>
                                                })}
                                            </ul>
                                        </Fragment>}
                                </div>
                                <div className={this.state.tabIndex === 1 ? styles.active + ' ' + styles.content : styles.common}>
                                    <div className={styles.spin}><Spin spinning={this.state.loading}></Spin></div>
                                    {!this.state.loading &&
                                        <Fragment>
                                            <ul className={styles.product}>
                                                {ProductListData.appearance.map((item, index) => {
                                                    return <li key={index + "appearance_123sadacvhh"}>
                                                        <ProductListLink
                                                            img={item.img}
                                                            title={item.title}
                                                            link={item.link}
                                                        />
                                                    </li>
                                                })}
                                            </ul>
                                        </Fragment>
                                    }
                                </div>
                                <div className={this.state.tabIndex === 2 ? styles.active + ' ' + styles.content : styles.common}>
                                    <div className={styles.spin}><Spin spinning={this.state.loading}></Spin></div>
                                    {!this.state.loading &&
                                        <Fragment>
                                            <ul className={styles.product}>
                                                {ProductListData.series.map((item, index) => {
                                                    return <li key={index + "series_fgdsret"}>
                                                        <ProductListLink
                                                            img={item.img}
                                                            title={item.title}
                                                            link={item.link}
                                                        />
                                                    </li>
                                                })}
                                            </ul>
                                        </Fragment>}
                                </div>
                                <div className={this.state.tabIndex === 3 ? styles.active + ' ' + styles.content : styles.common}>
                                    <div className={styles.spin}><Spin spinning={this.state.loading}></Spin></div>
                                    {!this.state.loading &&
                                        <Fragment>
                                            <ul className={styles.product}>
                                                {this.state.productListInfo.length > 0 && this.state.productListInfo.map((item, index) => {
                                                    return <li key={index + "productListInfo_qwexca"}>
                                                        <ProductListInfoDetail
                                                            id={item.id}
                                                            img={item.img}
                                                            productName={item.productName}
                                                            promotionMessage={item.promotionMessage}
                                                            featrues={item.featrues}
                                                            promotionMessageSecond={item.promotionMessageSecond}
                                                            usedPrice={item.usedPrice}
                                                            nowPrice={item.nowPrice}
                                                        />
                                                    </li>
                                                })}
                                            </ul>
                                        </Fragment>}
                                    <Pagination
                                        pageSize={this.state.pageSize}
                                        pageSizeOptions={['6', '9', '12', '15']}
                                        onChange={this.pageChange}
                                        showSizeChanger
                                        onShowSizeChange={this.onShowSizeChange}
                                        defaultCurrent={1}
                                        total={500}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(ProductList);