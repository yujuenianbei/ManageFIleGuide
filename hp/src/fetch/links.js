const states = {
    links: [
        {
            link: "account",
            name: "我的账户"
        },
        {
            link: "order",
            name: "我的订单"
        },
        {
            link: "booking",
            name: "我的预约"
        },
        {
            link: "coupon",
            name: "我的优惠券"
        },
        {
            link: "integral",
            name: "用户积分"
        },
        {
            link: "subscribe",
            name: "订阅"
        },
        {
            link: "bill",
            name: "发票设置"
        },
    ]
}

const changeCrumbs = (props) => {
    let name = props.location.pathname.split('/')[2];
    let itemName;
    states.links.map((item, index) => {
        if (item.link === name) {
            itemName = item.name
        }
    })
    return itemName;
}

export { states, changeCrumbs }
