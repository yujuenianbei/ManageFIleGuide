import {
  PRODUCTINFO,
  PRODUCTNUM,
  USERINFO,
  CARTERROR,
  MESSAGEPRODUCT,
  MESSAGEEXPRESS
} from '../actions/index'

const initValue = {
  productInfo: [],
  productNum: 0,
  userInfo: null,
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
    case USERINFO: {
      return Object.assign({}, state, { userInfo: data })
    }
    // case EXPRESSINCART: {
    //   return Object.assign({}, state, { express: data })
    // }
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