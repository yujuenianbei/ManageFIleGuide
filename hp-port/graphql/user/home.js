var $sql = require('../../dao/userSqlMapping');
var { searchSql } = require("../../sql/init")
var {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLScalarType,
    GraphQLEnumValue,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');
const Db = require('../../sql/db');

//定义schema及resolver
const Banners = new GraphQLObjectType({
    name: 'Banners',
    description: "首页banner",
    fields: () => {
        return ({
            // 这种可以
            title: {
                type: GraphQLString, resolve(data) {
                    return data.title;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            }
        });
    },
});

const Promiseing = new GraphQLObjectType({
    name: 'Promiseing',
    description: "首页Promiseing",
    fields: () => {
        return ({
            // 这种可以
            title: {
                type: GraphQLString, resolve(data) {
                    return data.title;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            }
        });
    },
});

const ProductList = new GraphQLObjectType({
    name: 'ProductList',
    description: "首页ProductListImg",
    fields: () => {
        return ({
            // 这种可以
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            title: {
                type: GraphQLString, resolve(data) {
                    return data.title;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            }
        });
    },
});


const ProductListInfoOne = new GraphQLObjectType({
    name: 'ProductInfo',
    description: "ProductInfo",
    fields: () => {
        return ({
            // 这种可以
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            promotionMessage: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessage;
                }
            },
            featrues: {
                // 返回数组
                type: new GraphQLList(GraphQLString), resolve(data) {
                    return data.featrues;
                }
            },
            promotionMessageSecond: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessageSecond;
                }
            },
            usedPrice: {
                type: GraphQLString, resolve(data) {
                    return data.usedPrice;
                }
            },
            nowPrice: {
                type: GraphQLString, resolve(data) {
                    return data.nowPrice;
                }
            }
        });
    },
});



const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: "用户信息Input实体",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        sex: { type: GraphQLString },
        intro: { type: GraphQLString },
    }),
});

module.exports = {
    query: {
        banners: {
            type: new GraphQLList(Banners),
            description: '查询首页banner',
            resolve: async function () {
                return await [
                    {
                        title: "PAVILION星系列",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/pavilon_0219_pc_nx.jpg",
                        link: '/productList/'
                    }, {
                        title: "星14微边框轻薄本",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/XINGPC-20190508.jpg",
                        link: '/productList/'
                    }, {
                        title: "战66二代",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/BannerZHAN66-20190426PC.jpg",
                        link: '/productList/'
                    }, {
                        title: "暗影精灵4代游戏本",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/20190403_nx.jpg",
                        link: '/productList/'
                    },
                    {
                        title: "PAVILION星系列",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/pavilon_0219_pc_nx.jpg",
                        link: '/productList/'
                    }, {
                        title: "星14微边框轻薄本",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/XINGPC-20190508.jpg",
                        link: '/productList/'
                    }, {
                        title: "战66二代",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/BannerZHAN66-20190426PC.jpg",
                        link: '/productList/'
                    }, {
                        title: "暗影精灵4代游戏本",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/20190403_nx.jpg",
                        link: '/productList/'
                    }
                ];
            }
        },
        promiseing: {
            type: new GraphQLList(Promiseing),
            description: '查询首页Promiseing',
            resolve: async function () {
                return await [
                    {
                        title: "战神系列",
                        img: "https://adbutler-fermion.com/getad.img/;libID=653547",
                        link: '/productList/' + 123456
                    }, {
                        title: "热门爆款",
                        img: "https://adbutler-fermion.com/getad.img/;libID=653548",
                        link: '/productList/' + 123456
                    }, {
                        title: "满额立减",
                        img: "https://adbutler-fermion.com/getad.img/;libID=653549",
                        link: '/productList/' + 123456
                    }, {
                        title: "新人礼包",
                        img: "https://adbutler-fermion.com/getad.img/;libID=653550",
                        link: '/productList/' + 123456
                    }
                ];
            }
        },
        productList: {
            type: new GraphQLList(ProductList),
            description: '首页产品列表个数',
            resolve: async function (root, args) {
                // console.log(args);
                return await [
                    {
                        id: 1,
                        title: "暗影精灵4代",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/laptop001-20190319mmq.jpg",
                        link: '/productList/' + 123456
                    }, {
                        id: 2,
                        title: "暗影精灵",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/desktop001-20190319mmq.jpg",
                        link: '/productList/' + 123456
                    }, {
                        id: 3,
                        title: "商用打印机",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/0222-3OfficeIPG423x689.jpg",
                        link: '/productList/' + 123456
                    }, {
                        id: 4,
                        title: "原装耗材",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/0222-4Supply423x689.jpg",
                        link: '/productList/' + 123456
                    }, {
                        id: 5,
                        title: "显示器",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/monitor001-20190319mmq.jpg",
                        link: '/productList/' + 123456
                    }, {
                        id: 6,
                        title: "酷炫装备",
                        img: "https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/ass001-20190319mmq.jpg",
                        link: '/productList/' + 123456
                    }
                ];
            }
        },
        productListInfoOne: {
            type: new GraphQLList(ProductListInfoOne),
            description: '查询首页ProductInfo',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async function (root, args) {
                console.log(args);
                if(args.id === 1){
                    return await [
                        {
                            id: 11,
                            link: `/productInfo/` + 11,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/6/K/6KL73PA-1_T1552906332.png",
                            productName: "惠普（HP）暗影精灵4代 OMEN Laptop 15-dc0153TX 15.6英寸游戏笔记本电脑  (i5-8300H 8G 512G GTX1050Ti 4G独显 IPS FHD）",
                            promotionMessage: "5月10日11点-5月11日11点，限时抢购使用优惠券:Flashsale201905106KL73PA400，数量有限，售完即止，不与其他优惠同享！",
                            featrues: [
                                "第八代英特尔® 酷睿™ i5处理器",
                                "Windows 10 家庭版 64",
                                "512 GB PCIe® NVMe™ M.2 SSD",
                                "8 GB DDR4-2666 SDRAM",
                                "NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）",
                                "15.6 英寸（对角）WLED 背光 FHD IPS 防眩光超窄边框显示屏 (1920 x 1080)"
                            ],
                            promotionMessageSecond: "日常销售价6199抢购价5799",
                            usedPrice: 6599,
                            nowPrice: 6199,
                        },
                        {
                            id: 12,
                            link: `/productInfo/` + 12,
                            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_3_4.png",
                            productName: "惠普光影精灵 15-cx0068tx 游戏本",
                            promotionMessage: "",
                            featrues: [
                                "第八代英特尔® 酷睿™ i7处理器",
                                "Windows 10 家庭版 64",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "128 GB PCIe® NVMe™ M.2 SSD",
                                "8 GB DDR4-2666 SDRAM (1 x 8 GB)",
                                "NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）"
                            ],
                            promotionMessageSecond: "",
                            usedPrice: 7799,
                            nowPrice: 6999,
                        },
                        {
                            id: 13,
                            link: `/productInfo/` + 13,
                            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/p/n/png_1.png",
                            productName: "惠普暗影精灵4代 15-dc0014tx 15.6 英寸游戏笔记本电脑 ",
                            promotionMessage: "",
                            featrues: [
                                "第八代英特尔® 酷睿™ i7处理器",
                                "Windows 10 家庭版 64",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "256 GB PCIe® NVMe™ M.2 SSD",
                                "16 GB DDR4-2666 SDRAM (1 x 16 GB)",
                                "GeForce® GTX 1070搭载Max-Q设计（8 GB GDDR5 独立显存）"
                            ],
                            promotionMessageSecond: "",
                            usedPrice: 12499,
                            nowPrice: 11499,
                        }, {
                            id: 14,
                            link: `/productInfo/` + 14,
                            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/p/n/png.png",
                            productName: "惠普暗影精灵4代  15-dc0124tx 15.6 英寸游戏笔记本电脑 ",
                            promotionMessage: "",
                            featrues: [
                                "第八代英特尔® 酷睿™ i7处理器",
                                "Windows 10 家庭版 64",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "256 GB PCIe® NVMe™ M.2 SSD",
                                "16 GB DDR4-2666 SDRAM (2 x 8 GB)",
                                "NVIDIA® GeForce® GTX 1060（6 GB GDDR5 独立显存）"
                            ],
                            promotionMessageSecond: "日常销售价9399抢购价8999",
                            usedPrice: 10999,
                            nowPrice: 9399,
                        }];
                } else if(args.id === 2){
                    return await [
                        {
                            id: 21,
                            link: `/productInfo/` + 21,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/c/a/catalog-product-n-e-nelson_p_gaming_front_2.png",
                            productName: "惠普暗影精灵3   690-078ccn游戏台式电脑（i7-8700 16G高频 1T+256GSSD GTX1060 6G独显 三年上门）",
                            promotionMessage: "5月27日10点-5月29日10点，限时抢购，数量有限，售完即止，不与其他优惠同享！",
                            featrues: [
                                "第八代英特尔® 酷睿™ i7处理器",
                                "Windows 10 家庭版 64",
                                "16 GB DDR4-2666 SDRAM (2 x 8 GB)",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "英特尔® UHD 630 显卡",
                                "NVIDIA® GeForce® GTX 1060（6 GB GDDR5 独立显存）"
                            ],
                            promotionMessageSecond: "日常销售价7999抢购价7499",
                            usedPrice: 8199,
                            nowPrice: 7499,
                        },
                        {
                            id: 22,
                            link: `/productInfo/` + 22,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/6/D/6DW53AA-1_T1555385248.png",
                            productName: "惠普（HP）小欧24-f031 商务娱乐高清一体机电脑23.8英寸（八代i3-8130U 8G 1T UMA WiFi蓝牙）FHD",
                            promotionMessage: "高72%NTSC高色域   全高清IPS  大功率音响",
                            featrues: [
                                "Windows 10 家庭版 64",
                                "第八代英特尔® 酷睿™ i3处理器",
                                "8 GB DDR4-2400 SDRAM (1 x 8 GB)",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "英特尔® UHD 620 显卡"
                            ],
                            promotionMessageSecond: "",
                            usedPrice: 4399,
                            nowPrice: 4099,
                        },
                        {
                            id: 23,
                            link: `/productInfo/` + 23,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/4/E/4EA08AA-1_T1555384797.png",
                            productName: "惠普（HP）小欧290 商务办公台式电脑主机（i3-8100 4G 1TB WiFi串口 Win10 ）",
                            promotionMessage: "纤细机身 充沛动能 丰富接口 高效办公",
                            featrues: [
                                "Windows 10 家庭版 64",
                                "第八代英特尔® 酷睿™ i3处理器",
                                "4 GB DDR4-2400 SDRAM (1 x 4 GB)",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "英特尔® UHD 630 显卡", 
                            ],
                            promotionMessageSecond: "",
                            usedPrice: 2999,
                            nowPrice: 2699,
                        },
                        {
                            id: 24,
                            link: `/productInfo/` + 24,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/5/M/5MY94PA-1_T1545710096.png",
                            productName: "惠普战 99 Pro G1 台式电脑 ",
                            promotionMessage: "战66 AMD新品火爆来袭，晒单还赠包鼠！点击查看：",
                            featrues: [
                                "Windows 10 家庭版 64 – 惠普建议使用 Windows 10 Pro。",
                                "第八代英特尔® 酷睿™ i5处理器",
                                "8 GB DDR4-2666 SDRAM (1 X 8 GB)",
                                "1 TB SATA 硬盘 (7200 rpm)",
                                "NVIDIA® GeForce® GTX 1060（3 GB GDDR5 独立显存）",
                            ],
                            promotionMessageSecond: "年中采购节，惊喜优惠券限量秒，使用优惠券: MayPro201905200620BPC300下单即可享300元优惠，抢完即止。",
                            usedPrice: null,
                            nowPrice: 5999,
                        }];
                } else if(args.id === 3){
                    return await [
                        {
                            id: 31,
                            link: `/productInfo/` + 31,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/Y/5/Y5S47A-1_T1544696674.png",
                            productName: "HP LaserJet Pro M17w 打印机",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Functions: 打印",
                                "Apple AirPrint™; Google Cloud Print™; Wireless direct printing"
                            ],
                            promotionMessageSecond: "5月订单满599减12；满1999减45；",
                            usedPrice: 979,
                            nowPrice: 899,
                        },
                        {
                            id: 32,
                            link: `/productInfo/` + 32,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/G/3/G3Q62A-1_T1539226532.png",
                            productName: "HP LaserJet Pro M132nw 多功能一体机",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Functions: 打印、复印、扫描"
                            ],
                            promotionMessageSecond: "5月订单满599减12；满1999减45；",
                            usedPrice: 2399,
                            nowPrice: 1499,
                        },
                        {
                            id: 13,
                            link: `/productInfo/` + 33,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/J/7/J7K33A-1_T1539225863.png",
                            productName: "HP OfficeJet Pro 6960 多功能一体机",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Functions: 打印、复印、扫描、传真",
                                "Print Speed (Black): 高达 30 页/分钟",
                                "Apple AirPrint™; Ethernet networking; HP ePrint; Mopria™; USB; Wireless (Wi-Fi®); Wireless direct printing",
                                "Automatic document feeder; Front USB flash drive port; Print from mobile device; Scan to email; Scan to PDF; Two-sided printing; Two-sided scanning"
                            ],
                            promotionMessageSecond: "5月订单满599减12；满1999减45；",
                            usedPrice: 2099,
                            nowPrice: 1099,
                        },
                        {
                            id: 34,
                            link: `/productInfo/` + 34,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/Z/6/Z6Z13A-1_T1542177284.png",
                            productName: "HP Ink Tank 319 ",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Functions: 打印、复印、扫描",
                                "Print Speed (Black): 高达 19 页/分钟",
                                "USB",
                                "Ink tank system; Scan to PDF"
                            ],
                            promotionMessageSecond: "5月订单满599减12；满1999减45；",
                            usedPrice: null,
                            nowPrice: 1299,
                        }];
                } else if(args.id === 4){
                    return await [
                        {
                            id: 41,
                            link: `/productInfo/` + 41,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/C/F/CF218A-1_T1539226626.png",
                            productName: "HP LaserJet 18A 黑色原装硒鼓",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Cartridge Colors: Black",
                                "Print Technology: Laser",
                                "Product type: 标准容量墨盒"
                            ],
                            promotionMessageSecond: "5月耗材订单满399减20；满999减50；",
                            usedPrice: null,
                            nowPrice: 411,
                        },
                        {
                            id: 42,
                            link: `/productInfo/` + 42,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/C/F/CF256A-1_T1539225585.png",
                            productName: "HP LaserJet 56A 黑色原装硒鼓",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Cartridge Colors: Black",
                                "Print Technology: Laser",
                                "Product type: 标准容量墨盒"
                            ],
                            promotionMessageSecond: "5月耗材订单满399减20；满999减50；",
                            usedPrice: null,
                            nowPrice: 279,
                        },
                        {
                            id: 43,
                            link: `/productInfo/` + 43,
                            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_3_1.png",
                            productName: "HP 678 号 2 件套黑色/三色原装 Ink Advantage 墨盒",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "Cartridge Colors: Black; Tri-color",
                                "Print Technology: Ink",
                                "Product type: 组合包"
                            ],
                            promotionMessageSecond: "5月耗材订单满399减20；满999减50；",
                            usedPrice: 122,
                            nowPrice: 106,
                        },
                        {
                            id: 44,
                            link: `/productInfo/` + 44,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/T/0/T0A80AA-1_T1539228420.jpg",
                            productName: "惠普 932XL 黑色/933XL 青色/品红色/黄色 4 件套原装墨盒",
                            promotionMessage: "领取5月限量优惠券，先到先得",
                            featrues: [
                                "硬件兼容性: HP Officejet 6100 云打印机、HP Officejet 6600 云多功能一体机、HP Officejet 6700 Premium 云多功能一体机、HP Officejet 7110 宽幅云打印机、HP Officejet 7610 宽幅云多功能一体机"
                            ],
                            promotionMessageSecond: "5月耗材订单满399减20；满999减50；",
                            usedPrice: null,
                            nowPrice: 569,
                        }];
                }else if(args.id === 5){
                    return await [
                        {
                            id: 51,
                            link: `/productInfo/` + 51,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/X/9/X9K72AA-1_T1531207907.png",
                            productName: "HP 24o 24 英寸 LED 背光显示器",
                            promotionMessage: "5月23日-5月30日限时抢购，数量有限，售完即止，",
                            featrues: [
                                "鲜活的视觉体验",
                                "轻松连接",
                                "消除运动模糊现象",
                                "全高清显示屏 / 1080p 显示屏",
                                "明亮的 24 英寸对角全高清显示屏，帮助增强游戏和电影效果。[1]",
                                "带 VGA、DVI 和 HDMI 端口，可轻松连接您的设备，无需使用适配器。",
                                "2 毫秒响应时间，杜绝游戏、视频和电影的不稳定现象。[2]"
                            ],
                            promotionMessageSecond: "日常销售价999抢购价799",
                            usedPrice: 1149,
                            nowPrice: 799,
                        },
                        {
                            id: 52,
                            link: `/productInfo/` + 52,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/2/G/2GB27AA-1_T1533274603.png",
                            productName: "HP 27y 27 英寸显示屏",
                            promotionMessage: "5月23日-5月30日限时抢购，数量有限，售完即止，",
                            featrues: [
                                "图片清晰明亮",
                                "品质优良，全无死角",
                                "适合当今时代的连接性",
                                "27 英寸（对角）全高清[1] 屏幕，支持显示各类文档、视频和电子邮件，呈现出的效果色彩逼真、细节清晰。",
                                "这款 27 英寸（对角）IPS 显示屏具有 178° 的广阔视角，能够提供更优质娱乐体验。",
                                "借助 VGA、DVI 和 HDMI 端口方便地连接您的设备。"
                            ],
                            promotionMessageSecond: "日常销售价1299抢购价1099",
                            usedPrice: 1399,
                            nowPrice: 1099,
                        },
                        {
                            id: 53,
                            link: `/productInfo/` + 53,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/3/W/3WL51AA-1_T1533276610.png",
                            productName: "惠普（HP）25X 暗影精灵 24.5英寸 FHD分辨率 144Hz游戏电竞 电脑液晶爱眼显示器",
                            promotionMessage: "5月23日-5月30日限时抢购，数量有限，售完即止，",
                            featrues: [
                                "飞快速度应你所想",
                                "顺畅画质令人惊艳",
                                "舒适感",
                                "采用 Overdrive 技术，实现 1 毫秒响应时间",
                                "144 赫兹刷新率和 1 毫秒响应时间，可消除屏幕撕裂和运动模糊现象。[1]",
                                "显示屏采用 AMD® FreeSync™[2] 技术，为您带来不同凡响的流畅游戏体验。",
                                "可调节范围达 100 毫米，让您可以轻松地将显示屏调节到舒适高度。"
                            ],
                            promotionMessageSecond: "日常销售价1599抢购价1499",
                            usedPrice: 1699,
                            nowPrice: 1499,
                        },
                        {
                            id: 54,
                            link: `/productInfo/` + 54,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/3/K/3KS65AA-1_T1547113222.png",
                            productName: "惠普（HP）星系列 27FW 27英寸 FHD高分辨率 低蓝光爱眼 电脑办公显示器屏",
                            promotionMessage: "5月23日-5月30日限时抢购，数量有限，售完即止，",
                            featrues: [
                                "迷人的超薄设计",
                                "无边框设计效果出众",
                                "提供多种娱乐功能",
                                "超窄边框显示屏",
                                "这款超薄显示屏让您无需支付高昂的费用即可享受现代质感。",
                                "这款微边框显示屏配备色彩艳丽的 IPS 面板，可提供超宽的可视角度和清晰锐利的画质。",
                                "配备全高清[1] 分辨率和 AMD FreeSync™[2]，让您尽享毫无模糊和延迟的清晰画质和游戏效果。",
                            ],
                            promotionMessageSecond: "5月耗材订单满399减20；满999减50；",
                            usedPrice: null,
                            nowPrice: 569,
                        }];
                }else if(args.id === 6){
                    return await [
                        {
                            id: 61,
                            link: `/productInfo/` + 61,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/X/7/X7Q44AA-1_T1539224592.png",
                            productName: "惠普 Z3700 银色无线鼠标",
                            promotionMessage: "",
                            featrues: [
                                "别具匠心的设计",
                                "无线便利性",
                                "持久的电池续航时间"
                            ],
                            promotionMessageSecond: "",
                            usedPrice: null,
                            nowPrice: 99,
                        },
                        {
                            id: 62,
                            link: `/productInfo/` + 62,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/1/K/1KF75AA-1_T1539224526.png",
                            productName: "惠普暗影精灵鼠标 600",
                            promotionMessage: "",
                            featrues: [
                                "准确移动",
                                "瞬时设置",
                                "自由定义理想重量"
                            ],
                            promotionMessageSecond: "",
                            usedPrice: 299,
                            nowPrice: 249,
                        },
                        {
                            id: 63,
                            link: `/productInfo/` + 63,
                            img: "https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/1/K/1KF76AA-1_T1539224519.png",
                            productName: "惠普暗影精灵耳机 800",
                            promotionMessage: "",
                            featrues: [
                                "沉浸式音效",
                                "多维音效",
                                "出色舒适度",
                            ],
                            promotionMessageSecond: "",
                            usedPrice: 399,
                            nowPrice: 369,
                        }];
                }
                
            }
        }
    },
    mutation: {

    }
};