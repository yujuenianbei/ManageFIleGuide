import {
  PRODUCTINFO,
  PRODUCTNUM,
  USERINFO,
  EXPRESSINCART
} from '../actions/index'

const initValue = {
  productInfo: [],
  productNum: 0,
  userInfo: null,
  express: null
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
    case EXPRESSINCART: {
      return Object.assign({}, state, { express: data })
    }
    default: {
      return state;
    }
  }
}