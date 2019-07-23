import {
  ORDERADDRESS,
  ORDERADDRESSITEM,
  ORDERPAYMENTMETHOD,
  ORDERPRODUCTLIST,
  ORDERDELIVERY
} from '../actions/index'

const initValue = {
  orderAddress: [],
  orderAddressItem: '',
  orderPayment: 0,
  orderProductList: [],
  delivery: null,
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case ORDERADDRESS: {
      return Object.assign({}, state, { orderAddress: data })
    }
    case ORDERADDRESSITEM: {
      return Object.assign({}, state, { orderAddressItem: data })
    }
    case ORDERPAYMENTMETHOD: {
      return Object.assign({}, state, { orderPayment: data })
    }
    case ORDERPRODUCTLIST: {
      return Object.assign({}, state, { orderProductList: data })
    }
    case ORDERDELIVERY: {
      return Object.assign({}, state, { delivery: data })
    }
    default: {
      return state;
    }
  }
}