import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import classify from '@magento/venia-concept/esm/classify';
// import { Link, resourceUrl } from '@magento/venia-concept/esm/drivers';
// const SearchBar = React.lazy(() => import('src/components/SearchBar'));
// import { Icon } from '@material-ui/core';
import styles from './footerInfo.module.less';

class FooterInfo extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.contract}>
                    <ul className={styles.additional_links}>
                        <li><a href="https://www.hpstore.cn/terms-conditions/">销售服务条款条件</a></li>
                        <li><a href="https://www.hpstore.cn/limited-warranty-statement/">Limited warranty statement</a></li>
                        <li><a href="http://www8.hp.com/cn/zh/terms-of-use.html">使用条款</a></li>
                        <li><a href="http://www8.hp.com/cn/zh/sitemap.html">网站地图</a></li>
                        <li><a href="http://www8.hp.com/cn/zh/privacy/privacy.html">隐私声明</a></li>
                    </ul>
                    <div className={styles.disclaimer}>
                        <p>Ultrabook、赛扬、Celeron Inside、Core Inside、英特尔、英特尔标志、英特尔凌动、Intel Atom Inside、英特尔酷睿、Intel Inside、Intel Inside 标志、英特尔博锐、安腾、Itanium Inside、奔腾、Pentium Inside、vPro Inside、至强、至强融核、 Xeon Inside 和英特尔傲腾是英特尔公司或其子公司在美国和/或其他国家（地区）的商标。</p>
                        <p>并非所有功能都适用于所有版本或Windows版本。系统可能需要升级和/或单独购买的硬件，驱动程序和/或软件才能充分利用Windows功能。请访问 <a href="https://www.microsoft.com" rel="external nofollow">www.microsoft.com</a></p>
                        <p>以下情况适用于采用英特尔Skylake或基于Windows 7，Windows 8，Windows 8.1或Windows 10 Pro系统降级为Windows 7 Professional，Windows 8 Pro或Windows 8.1的下一代矽芯片系统的HP系统：此版本的使用该系统中使用的处理器或芯片组的Windows运行受到Microsoft的有限支持。有关Microsoft支持的更多信息，请参阅 <a href="https://support.microsoft.com/lifecycle" rel="external nofollow">www.support.microsoft.com/lifecycle</a>上的Microsoft支持生命周期常见问题解答</p>
                        <p>根据 <a href="https://blogs.windows.com/business/2016/08/11/updates-to-silicon-support-policy-for-windows/" rel="external nofollow">Microsoft Silicon Support Policy</a>, 惠普不支持或提供配置了英特尔或AMD第七代和转发处理器的产品上的Windows 8或Windows 7驱动程序</p>
                        <p><strong>请注意</strong>: 产品颜色和外观与网站上的视觉表现可能会有所不同。虽然我们努力检查定价，产品规格和其他错误，但偶尔会发生错误，惠普保留拒绝由此类错误引起的订单的权利。</p>
                        <p>HP 已拆分为两个公司。对于企业产品，请转到 Hewlett Packard Enterprise。 Copyright 2016 HP Development Company, L.P.</p>
                        <p>ICP经营许可证：沪ICP备15039448号</p>
                        <div></div>
                        <p>惠普中国在线商店由惠普授权北京京东世纪贸易有限公司经营(北京市大兴区经济技术开发区京东大厦)</p>
                        <small className="copyright">
                            <span>Copyright © 2018 HP Development Company, L.P.</span>
                        </small>
                        <br/>
                        <small className="bugs">
                            <a className="bugs-link" href="mailto:opsmanager@hp.com">
                                <span className="icn_bug">惠普员工：报告网站问题</span>
                            </a>
                            <a href="http://www.magentocommerce.com/bug-tracking" target="_blank" rel="noopener noreferrer"> </a>
                        </small>
                    </div>
                </div >
            </Fragment >
        );
    }
}
export default classify(styles)(FooterInfo);