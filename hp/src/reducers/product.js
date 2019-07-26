import {
  PRODUCTIMG,
  PRODUCTNAME,
  PRODUCTfeatureS,
  PRODUCTPROMOTIONMESSAGE,
  PRODUCTPROMOTIONMESSAGESECOND,
  PRODUCTNOWPRICE,
  PRODUCTUSEDPRICE
} from '../actions/index';
const initValue = {
  productImg: '',
  productName: '',
  productfeatures: '',
  productPromotionMessage: '',
  productPromotionMessageSecond: '',
  productUsedPrice: '',
  productNowPrice: ''
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case PRODUCTIMG: {
      return Object.assign({}, state, { productImg: data })
    }
    case PRODUCTNAME: {
      return Object.assign({}, state, { productName: data })
    }
    case PRODUCTfeatureS: {
      return Object.assign({}, state, { productfeatures: data })
    }
    case PRODUCTPROMOTIONMESSAGE: {
      return Object.assign({}, state, { productPromotionMessage: data })
    }
    case PRODUCTPROMOTIONMESSAGESECOND: {
      return Object.assign({}, state, { productPromotionMessageSecond: data })
    }
    case PRODUCTNOWPRICE: {
      return Object.assign({}, state, { productUsedPrice: data })
    }
    case PRODUCTUSEDPRICE: {
      return Object.assign({}, state, { productNowPrice: data })
    }
    default: {
      return state;
    }
  }
}