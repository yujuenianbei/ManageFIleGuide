import {
  ORDERADDRESS,
  ORDERADDRESSITEM,
  ORDERPAYMENTMETHOD,
  ORDERPRODUCTLIST,
  ORDERDELIVERY,
  ORDERPRODUCT,
  ORDERTOTALCOST,
  ORDERERROR ,
  MESSAGEADDRESS,
  MESSAGEPAYMENT,
  ORDERADDADDRESS
} from '../actions/index'
const initValue = {
  orderAddressMessage: '',
  orderPaymentMessage: '',
  orderError: false,
  orderAddress: [],
  orderAddressItem: '',
  orderPayment: 0,
  orderTotalCost: 0,
  orderProducts: [],
  orderProductList: [],
  addAddressState: false,
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
    case ORDERPRODUCT: {
      return Object.assign({}, state, { orderProducts: data })
    }
    case ORDERTOTALCOST: {
      return Object.assign({}, state, { orderTotalCost: data })
    }
    case ORDERERROR: {
      return Object.assign({}, state, { orderError: data })
    }
    case MESSAGEADDRESS: {
      return Object.assign({}, state, { orderAddressMessage: data })
    }
    case MESSAGEPAYMENT: {
      return Object.assign({}, state, { orderPaymentMessage: data })
    }
    case ORDERADDADDRESS: {
      return Object.assign({}, state, { addAddressState: data })
    }
    default: {
      return state;
    }
  }
}