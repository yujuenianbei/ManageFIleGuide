import {
    PRODUCTINFO,
    PRODUCTNUM,
    USERINFO,
    } from '../actions/index'
    
    const initValue = {
        productInfo: [],
        productNum: 0,
        userInfo: null,
    }
    export default (state = initValue, action) => {
      const data = action.data
      switch (action.type) {
        case PRODUCTINFO: {
          return Object.assign({}, state, {productInfo: data})
        }
        case PRODUCTNUM: {
            return Object.assign({}, state, {productNum: data})
          }
        case USERINFO: {
          return Object.assign({}, state, {userInfo: data})
        }
        default: {
          return state;
        }
      }
    }