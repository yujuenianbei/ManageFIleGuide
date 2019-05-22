import {
  PRODUCTINFO,
  PRODUCTNUM,
  USERINFO,
} from '../actions/index'

const initValue = {
  productInfo: [{
    id: 2,
    img: "https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_3_4.png",
    num: 1,
    price: 6999,
    productName: "惠普（HP）暗影精灵4代 OMEN Laptop 15-dc0153TX 15.6英寸游戏笔记本电脑 (i5-8300H 8G 512G GTX1050Ti 4G独显 IPS FHD）",
    promotionMessage: "",
  }],
  productNum: 1,
  userInfo: null,
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case PRODUCTINFO: {
      return Object.assign({}, state, { productInfo: data })
    }
    case PRODUCTNUM: {
      return Object.assign({}, state, { productNum: data })
    }
    case USERINFO: {
      return Object.assign({}, state, { userInfo: data })
    }
    default: {
      return state;
    }
  }
}