import {
  PRODUCTIMG,
  PRODUCTNAME,
  PRODUCTFEATRUES,
  PRODUCTPROMOTIONMESSAGE,
  PRODUCTPROMOTIONMESSAGESECOND,
  PRODUCTNOWPRICE,
  PRODUCTUSEDPRICE
} from '../actions/index';
const initValue = {
  productImg: '',
  productName: '',
  productFeatrues: '',
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
    case PRODUCTFEATRUES: {
      return Object.assign({}, state, { productFeatrues: data })
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