const ProductListData = {
    sliderSection: [0, 100],
    priceSection: [3899, 13289],
    selectPriceSection: [3899, 13289],
    classify: [
        { label: 'Spectre 幽灵系列', value: '001', num: 5 },
        { label: 'Omen暗影精灵系列', value: '002', num: 25 },
        { label: 'Pavilion畅游人、星系列', value: '003', num: 57 },
        { label: '惠普HP 小欧系列', value: '004', num: 2 },
        { label: 'ENVY薄锐系列', value: '005', num: 22 },
        { label: 'Pavilion 光影精灵系列', value: '006', num: 5 },
        { label: '学生', value: '007', num: 43 },
        { label: '旅行', value: '008', num: 75 },
    ],
    detailSelect: [
        { label: '家用', value: 'Home', num: 21 },
        { label: '商务', value: 'Business', num: 21 },
        { label: '游戏', value: 'Game', num: 21 },
        { label: '高端', value: 'HighEnd', num: 21 },
    ],
    cpuType: [
        { label: 'Intel Core i7', value: 'i7', num: 40 },
        { label: 'Intel Core i5', value: 'i5', num: 64 },
        { label: 'Intel Core i3', value: 'i3', num: 2 },
        { label: 'AMD Ryzen', value: 'Ryzen', num: 4 },
    ],
    cpuSerise: [
        { label: 'AMD Ryzen™ 5 处理器', value: 'Ryzen5', num: 2 },
        { label: 'AMD 锐龙™ 7 处理器', value: 'Ryzen7', num: 2 },
        { label: '第九代英特尔® 酷睿™ i5 处理器', value: '9i5', num: 6 },
        { label: '第九代英特尔® 酷睿™ i7 处理器', value: '9i7', num: 4 },
        { label: '第八代英特尔® 酷睿™ i3处理器', value: '8i3', num: 2 },
        { label: '第八代英特尔® 酷睿™ i5处理器', value: '8i5', num: 58 },
        { label: '第八代英特尔® 酷睿™ i7处理器', value: '8i7', num: 36 },
    ],
    outlook: [
        { label: '标准笔记本', value: 'normal', num: 94 },
        { label: '变形本', value: 'trans', num: 16 },
    ],
    screen: [
        { label: '12英寸-14英寸', value: '14', num: 55 },
        { label: '15.6英寸', value: '15.6', num: 51 },
        { label: '17.3英寸', value: '17.3', num: 4 },
    ],
    contain: [
        { label: 'Less than 500 GB', value: '500l', num: 29 },
        { label: '500 GB to 1 TB', value: '500m1Tl', num: 39 },
        { label: 'More than 1 TB', value: '1Tm', num: 40 },
    ],
    storage: [
        { label: '≤4G', value: '4', num: 4 },
        { label: '6G-8G', value: '6', num: 99 },
        { label: '≥8G', value: '8', num: 7 },
    ],
    system: [
        { label: 'Windows 10 Home 64', value: 'win10_64', num: 110 },
    ],
    graphic: [
        { label: 'NVIDIA GeForce', value: 'NVIDIA', num: 69 },
        { label: 'Intel UHD', value: 'INTEL', num: 31 },
        { label: 'AMD Radeon', value: 'AMD', num: 10 },
    ],
    weight: [
        { label: 'Less than 2 kg', value: '2l', num: 69 },
        { label: '2 kg - 2.5 kg', value: '2m2.5l', num: 31 },
        { label: 'More than 2.5 kg', value: '2.5m', num: 10 },
    ],
    use: [
        { label: '中高端电脑', value: 'HighEnd', num: 32 },
        { label: '日常办公', value: 'Business', num: 48 },
        { label: '游戏', value: 'Game', num: 30 },
    ],
    subsidiary: [
        { label: 'ENVY', value: 'envy', num: 27 },
        { label: '入门级', value: 'primer', num: 10 },
        { label: '惠普幽灵系列', value: 'ghost', num: 5 },
        { label: '惠普暗影精灵', value: 'shadow', num: 25 },
        { label: '惠普畅游人或星系列', value: 'swim', num: 43 },
    ],
    character: [
        { label: 'B', value: 'b', num: 27 },
        { label: 'Bang', value: 'bang', num: 10 },
        { label: 'Bang & Olufsen', value: 'olufsen', num: 5 },
        { label: 'SSD固态硬盘', value: 'ssd', num: 25 },
        { label: 'Wireless Display (WiDi)', value: 'WiDi', num: 43 },
        { label: '背光键盘', value: 'ledkeyboard', num: 43 },
        { label: '蓝牙', value: 'bluetooth', num: 43 },
        { label: '触摸屏', value: 'touch', num: 43 }
    ],


    tabHeader: [
        { label: '用途', value: 'use' },
        { label: '外观', value: 'outlook' },
        { label: '系列', value: 'serise' },
        { label: '查看全部', value: 'all' },
    ],


    purpose: [
        {
            img: "https://media.hpstore.cn/wysiwyg/use/ntb/gaming.png",
            title: "游戏",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/use/ntb/power-users.png",
            title: "高端",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/use/ntb/premium.png",
            title: "旅行",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/ntb_students222.png",
            title: "学生",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/use/ntb/travel.png",
            title: "高级用户",
            link: '/'
        }
    ],
    appearance: [
        {
            img: "https://media.hpstore.cn/wysiwyg/form_factor/ntb/x360.png",
            title: "翻转变形笔记本",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/form_factor/ntb/standard.png",
            title: "专业笔记本",
            link: '/'
        },
    ],
    series: [
        {
            img: "https://media.hpstore.cn/wysiwyg/brand/ntb/spectre.png",
            title: "SPECTRE 幽灵系列",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/brand/ntb/omennb.png",
            title: "OMEN暗影精灵系列",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/ntb_students222.png",
            title: "PAVILION星系列",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/pavilion_Untitled-2.png",
            title: "PAVILION光影精灵系列",
            link: '/'
        },
        {
            img: "https://media.hpstore.cn/wysiwyg/brand/ntb/essential.png",
            title: "HP 小欧系列",
            link: '/'
        }
    ],
    productListInfo: [
        {
            id: 1,
            link: `/productInfo/` + 1,
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
            id: 2,
            link: `/productInfo/` + 2,
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
            id: 3,
            link: `/productInfo/` + 3,
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
        },
        {
            id: 4,
            link: `/productInfo/` + 4,
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
        },
        {
            id: 5,
            link: `/productInfo/` + 5,
            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/f/i/file_8.png",
            productName: "惠普 (HP) 星 15-cs1006tx 超轻薄笔记本电脑",
            promotionMessage: "",
            featrues: [
                "第八代英特尔® 酷睿™ i5处理器",
                "Windows 10 家庭版 64",
                "500 GB SATA 硬盘 (5400 rpm)",
                "4 GB DDR4-2400 SDRAM (1 x 4 GB)",
                "15.6 英寸（对角）WLED 背光 HD SVA BrightView 超窄边框显示屏 (1366 x 768)",
                "NVIDIA® GeForce® MX150（2 GB GDDR5 独立显存）"
            ],
            promotionMessageSecond: "",
            usedPrice: 4699,
            nowPrice: 4599,
        },
        {
            id: 6,
            link: `/productInfo/` + 6,
            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/_/1/_1_1.png",
            productName: "惠普薄锐 ENVY 13-ah1002tx 笔记本电脑",
            promotionMessage: "5月16日11点-18日11点，限时抢购，数量有限，售完即止，不与其他优惠同享！",
            featrues: [
                "第八代英特尔® 酷睿™ i5处理器",
                "Windows 10 家庭版 64",
                "512 GB PCIe® NVMe™ M.2 SSD",
                "8 GB LPDDR3-2133 SDRAM（板载）",
                "13.3 英寸对角 FHD IPS ",
                "NVIDIA® GeForce® MX150（2 GB GDDR5 独立显存）"
            ],
            promotionMessageSecond: "日常销售价6699抢购价6399",
            usedPrice: 6899,
            nowPrice: 6399,
        },
        {
            id: 7,
            link: `/productInfo/` + 7,
            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_1_1.png",
            productName: "惠普薄锐 ENVY x360- 13-ag0007au 变形本",
            promotionMessage: "触控屏 72%色域  翻转笔记本",
            featrues: [
                "AMD Ryzen™ 5 处理器",
                "Windows 10 家庭版 64",
                "512 GB PCIe® NVMe™ M.2 SSD",
                "8 GB DDR4-2400 SDRAM（板载）",
                "13.3 英寸（对角）WLED 背光 FHD IPS 超窄边框触摸屏，采用康宁® 大猩猩® 玻璃 NBT™ (1920 x 1080)",
                "AMD Radeon™ Vega 8 显卡"
            ],
            promotionMessageSecond: "",
            usedPrice: 5799,
            nowPrice: 5599,
        },
        {
            id: 8,
            link: `/productInfo/` + 8,
            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_3_1.png",
            productName: "惠普光影精灵 15-cx0065tx 游戏本",
            promotionMessage: "",
            featrues: [
                "第八代英特尔® 酷睿™ i5处理器",
                "Windows 10 家庭版 64",
                "1 TB SATA 硬盘 (7200 rpm)",
                "128 GB PCIe® NVMe™ M.2 SSD",
                "8 GB DDR4-2666 SDRAM (1 x 8 GB)",
                "NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）"
            ],
            promotionMessageSecond: "",
            usedPrice: 6599,
            nowPrice: 6099,
        },
        {
            id: 9,
            link: `/productInfo/` + 9,
            img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/e/n/envy15-cn-h6_1.png",
            productName: "惠普薄锐 ENVY 15-cn1005tx x360变形本",
            promotionMessage: "",
            featrues: [
                "第八代英特尔® 酷睿™ i7处理器",
                "Windows 10 家庭版 64",
                "512 GB PCIe® NVMe™ M.2 SSD",
                "16 GB DDR4-2400 SDRAM (2 x 8 GB)",
                "15.6 英寸（对角）WLED 背光 4K IPS 超窄边框多点触摸无边框玻璃显示屏 (3840 x 2160)",
                "NVIDIA® GeForce® MX150（4 GB GDDR5 独立显存）"
            ],
            promotionMessageSecond: "",
            usedPrice: 10999,
            nowPrice: 10299,
        }
    ]
}

export default ProductListData;