import {
    ORDERADDRESS,
    ORDERADDRESSITEM
    } from '../actions/index'
    
    const initValue = {
        orderAddress: [],
        orderAddressItem: '',
    }
    export default (state = initValue, action) => {
      const data = action.data
      switch (action.type) {
        case ORDERADDRESS: {
          return Object.assign({}, state, {orderAddress: data})
        }
        case ORDERADDRESSITEM: {
            return Object.assign({}, state, {orderAddressItem: data}) 
        }
        default: {
          return state;
        }
      }
    }