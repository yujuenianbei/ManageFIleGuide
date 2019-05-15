import React, { Component, Fragment } from 'react';
import classify from '@magento/venia-concept/esm/classify';
import styles from './Main.module.less';
import Crumbs from '../Crumbs';
import ProductImg from '../ProductImg';
import ProductDetailInfo from '../ProductDetailInfo';
import ProductWatched from '../ProductWtched';

import Product from '../../data/product';
class Main extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll) //监听滚动
    }
    handleScroll = (e) => {
        // console.log(document.documentElement.scrollTop)
        if (document.documentElement.scrollTop < 867) {
            this.setState({ detailHeaderFixed: false });
        } else {
            this.setState({ detailHeaderFixed: true });
        }
    }
    state = {
        type: 0,
        detailHeaderFixed: false,
        productTitle: Product.productTitle,
        productMayLike: Product.productMayLike,
        productWatched: Product.productWatched
    }
    changeProductDetails = (index) => {
        this.setState({ type: index });
        if (this.state.detailHeaderFixed) {
            window.scrollTo(0, 867);
        }
        // 原生实现滚动
        // let scroll_top = document.documentElement.scrollTop;
        // if (scroll_top > 871){
        //     const timer = setInterval(function () {
        //         let speed = (0 - document.documentElement.scrollTop) / 100;
        //         speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        //         scroll_top = scroll_top + speed;
        //         document.documentElement.scrollTop = scroll_top;
        //         if (scroll_top <= 868 - speed) {
        //             console.log(speed)
        //             console.log(document.documentElement.scrollTop)
        //             clearInterval(timer)
        //         }
        //     }, 10)
        // }   
    }
    render() {
        return (
            <div className={styles.productInfo}>
                <Crumbs />
                <div className={styles.product}>
                    <div className={styles.productImg}>
                        <h1>{Product.productName}</h1>
                        <ProductImg />
                    </div>
                    <div className={styles.productDetailInfo}>
                        <ProductDetailInfo />
                    </div>
                </div>
                <div className={styles.productDetail}>
                    <div className={this.state.detailHeaderFixed ? styles.productDetailHeaderFix : styles.productDetailHeaderunFix}>

                    </div>
                    <div className={this.state.detailHeaderFixed ? styles.productDetailHeader + " " + styles.productDetailHeaderFixed : styles.productDetailHeader}>
                        <ul>
                            {this.state.productTitle.map((item, index) => {
                                return <li key={index} className={this.state.type === index ? styles.active : styles.common} onClick={() => this.changeProductDetails(index)}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.productDetailContent}>
                        <div className={this.state.type === 0 ? styles.active + ' ' + styles.first : styles.common}>
                            <img src={Product.productFirst.topImg} />
                            <img src={Product.productFirst.contentImg} />
                            <div className={styles.detailContent}>
                                {Product.productFirst.detailContent.map(item=> {
                                    return <Fragment><p className={styles.strong}>{item.title}</p><p className={styles.thin}>{item.content}</p></Fragment>
                                })}
                            </div>
                            <div className={styles.moreContent}>
                                <ul>
                                    {Product.productFirst.moreContent.map(item=> {
                                        return  <li>{item}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={this.state.type === 1 ? styles.active + ' ' + styles.second : styles.common}>
                            <h2>产品规格</h2>
                            <table>
                                <tbody>
                                    <tr className={styles.header}>
                                        <th>系统功能</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>操作系统</th>
                                        <td>Windows 10 家庭版 64</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>处理器</th>
                                        <td>英特尔® 酷睿™ i5-8300H 处理器（2.3 Ghz 基本频率、采用英特尔® Turbo Boost 技术可高达 4 GHz、8 MB 高速缓存、4 核）</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Processor footnote</th>
                                        <td>[6] 多核技术旨在提高某些软件产品的性能。 该技术不一定适用于每个客户或软件应用程序。 性能和时钟频率随应用程序工作负载及软硬件配置而异。 英特尔的编号与性能高低测量无关。 英特尔、奔腾、英特尔酷睿、赛扬、英特尔徽标和英特尔内部徽标是英特尔公司在美国和其他国家/地区的商标。[7] 英特尔® Turbo Boost 性能随硬件、软件和整体系统配置而异。 有关详细信息，请访问 http://www.intel.com/technology/turboboost/。</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>处理器系列</th>
                                        <td>第八代英特尔® 酷睿™ i5处理器</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>外形</th>
                                        <td>标准笔记本</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>内存</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>内存（标配）</th>
                                        <td>8 GB DDR4-2666 SDRAM</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Memory Note</th>
                                        <td>传输速率高达 2666 MT/s。</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>存储</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>硬盘说明</th>
                                        <td>512 GB PCIe® NVMe™ M.2 SSD</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>存储类型</th>
                                        <td>SSD</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>显示和图形</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>显示屏</th>
                                        <td>15.6 英寸（对角）WLED 背光 FHD IPS 防眩光超窄边框显示屏 (1920 x 1080)</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>显示屏</th>
                                        <td>39.6 厘米（15.6 英寸，对角）WLED 背光 FHD IPS 防眩光超窄边框显示屏 (1920 x 1080)</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>显卡</th>
                                        <td>NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>扩展功能</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>端口</th>
                                        <td>1 个 HDMI 2.0 端口；1 个耳机/麦克风组合插孔；1 个麦克风输入端口；1 个 Mini DisplayPort™ 端口；1 个 RJ-45 端口；1 个 USB 3.1 Type-C™ 端口（数据传输速率高达 5 Gb/秒、DP1.2、惠普睡眠充电端口）；3 个第 1 代 USB 3.1 端口（1 个惠普睡眠充电端口）</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>媒体设备</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>音频功能</th>
                                        <td>支持 Bang & Olufsen、双扬声器、HP Audio Boost、DTS Headphone:X™</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Webcam</th>
                                        <td>带有集成数字麦克风的 HP Webcam 摄像头</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>输入设备</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>指向设备</th>
                                        <td>支持多点触摸手势的触摸板</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>键盘</th>
                                        <td>带数字键盘和 NKRO 的全尺寸 2 区照明背光键盘</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>通信</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>网络接口</th>
                                        <td>集成 10/100/1000 GbE 局域网</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>无线</th>
                                        <td>英特尔® 无线 AC 9560 802.11a/b/g/n/ac (2x2) Wi-Fi® 和 Bluetooth® 5 Combo</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Wireless note</th>
                                        <td>支持 MU-MIMO；兼容 Miracast</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>电源和运行要求</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>电源类型</th>
                                        <td>150 瓦交流电源适配器</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>电池类型</th>
                                        <td>3 芯 52 瓦时棱柱型锂电池</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>电池重量</th>
                                        <td>222 克</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>能源效率</th>
                                        <td>符合能源之星® 认证； EPEAT® 银奖注册产品</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>尺寸和重量</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>最低规格（宽 x 深 x 高）</th>
                                        <td>36 x 26.3 x 2.5 厘米</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>尺寸（宽 x 深 x 高）说明</th>
                                        <td>外形尺寸依配置而异</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>重量</th>
                                        <td>2.25 千克起</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>设计</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>产品颜色</th>
                                        <td>暗影黑色</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Product design</th>
                                        <td>碳纤维护盖图案，喷砂发纹键盘架饰面</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>软件</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>HP 应用</th>
                                        <td>HP 3D DriveGuard；HP Audio Switch；惠普文档；HP ePrint；HP e-Service；HP JumpStart；HP Recovery Manager；HP Support Assistant；OMEN Command Center；HP Connection Optimizer</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>HP Apps footnote</th>
                                        <td>[5] HP 3D DriveGuard：仅 HDD
                                            [8] HP e-Service：仅在中国大陆提供。</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>附带软件</th>
                                        <td>McAfee LiveSafe™</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Software footnote</th>
                                        <td>[1] McAfee LiveSafe 30 天免费试用（需接入互联网。 包括前 30 天。 之后的实时更新需要订阅。）</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>预装软件</th>
                                        <td>iQiyi</td>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>Pre-installed software footnote</th>
                                        <td>[4] iQiyi：仅在中国大陆提供。</td>
                                    </tr>
                                    <tr className={styles.header}>
                                        <th>保修和服务</th>
                                    </tr>
                                    <tr className={styles.content}>
                                        <th>保修</th>
                                        <td>一年整机保修（对于个人消费者用户，惠普将严格按照三包规定，提供一年整机保修，两年主要部件保修的售后服务）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={this.state.type === 2 ? styles.active + ' ' + styles.third : styles.common}>
                            <div className={styles.content}>
                                <p>大屏轻薄机身、电竞键盘、 8mm主热管、GTX 1050Ti 显卡</p>
                                <p>随主机购买配件更优惠，请点击推荐产品查询优惠价格！</p>
                                <p>随主机购买暗影鼠标、耳机更优惠，请点击推荐产品查询优惠价格</p>
                            </div>
                        </div>
                        <div className={this.state.type === 3 ? styles.active + ' ' + styles.fourth : styles.common}>
                            4
                        </div>
                        <div className={this.state.type === 4 ? styles.active + ' ' + styles.fiveth : styles.common}>
                            5
                        </div>
                        <div className={this.state.type === 5 ? styles.active + ' ' + styles.sixth : styles.common}>
                            <div className={styles.form}>
                                <div className={styles.form_item}>
                                    <label className={styles.title + " " + styles.required}>姓名</label>
                                    <input required type="text" className={styles.text} placeholder="请输入您的姓名" />
                                </div>
                                <div className={styles.form_item}>
                                    <label className={styles.title + " " + styles.required}>电子邮件地址</label>
                                    <input required type="email" className={styles.text} placeholder="请输入您的电子邮件地址" />
                                </div>
                                <div className={styles.form_item}>
                                    <label className={styles.title + " " + styles.required}>重新输入电子邮件</label>
                                    <input required type="text" className={styles.text} placeholder="请重新输入您的电子邮件地址" />
                                </div>
                                <div className={styles.form_item}>
                                    <label className={styles.title + " " + styles.required}>手机号码</label>
                                    <input required type="text" className={styles.text} placeholder="请输入您的手机号码" />
                                </div>
                                <div className={styles.form_item}>
                                    <label className={styles.title + " " + styles.required}>询问信息</label>
                                    <textarea required cols="30" rows="5" className={styles.text} />
                                </div>
                            </div>
                            <button className={styles.formUpload + " " + styles.prime}>提交</button>
                        </div>
                    </div>
                </div>
                <div className={styles.mayLike}>
                    <h2>你也可以考虑:</h2>
                    <div className={styles.content}>
                        {this.state.productMayLike.map((item, index) => {
                            return <ProductWatched key={index + 'productMayLike'}
                                name={item.name}
                                img={item.img}
                                link={item.link}
                                message={item.message}
                                price={item.price}
                            />
                        })}
                    </div>
                </div>
                <div className={styles.mayLike}>
                    <h2>您最近浏览的产品:</h2>
                    <div className={styles.content}>
                        {this.state.productWatched.map((item, index) => {
                            return <ProductWatched key={index + 'productWatched'}
                                name={item.name}
                                img={item.img}
                                link={item.link}
                                message={item.message}
                                price={item.price}
                            />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default classify(styles)(Main);