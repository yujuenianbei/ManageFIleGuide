import {
  PRODUCTINFO,
  PRODUCTNUM,
  CARTTOORDER,
  CARTTOORDERITEM,
  CARTERROR,
  MESSAGEPRODUCT,
  MESSAGEEXPRESS,
  CARTDELIVERYLIST,
  CARTCOUNTPRICE
} from '../actions/index'

const initValue = {
  productInfo: [],
  productNum: 0,
  productOrderPrice: 0,
  deliveryList: [],
  cartToOrder: [],
  cartToOrderItem: [],
  cartError: false,
  messageProduct: '',
  messageExpress: ''
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
    case CARTCOUNTPRICE: {
      return Object.assign({}, state, { productOrderPrice: data })
    }
    case CARTTOORDER: {
      return Object.assign({}, state, { cartToOrder: data })
    }
    case CARTTOORDERITEM: {
      return Object.assign({}, state, { cartToOrderItem: data })
    }
    case CARTDELIVERYLIST: {
      return Object.assign({}, state, { deliveryList: data })
    }
    case CARTERROR: {
      return Object.assign({}, state, { cartError: data })
    }
    case MESSAGEPRODUCT: {
      return Object.assign({}, state, { messageProduct: data })
    }
    case MESSAGEEXPRESS: {
      return Object.assign({}, state, { messageExpress: data })
    }
    default: {
      return state;
    }
  }
}