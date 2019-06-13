import {
    SORTFILTER,
    SORTFILTERNAME
    } from '../actions/index'
    
    const initValue = {
        productSortFilter: 1,
        productSortFilterName: "惠普推荐",
    }
    export default (state = initValue, action) => {
      const data = action.data
      switch (action.type) {
        case SORTFILTER: {
          return Object.assign({}, state, {productSortFilter: data})
        }
        case SORTFILTERNAME: {
          return Object.assign({}, state, {productSortFilterName: data})
        }
        default: {
          return state;
        }
      }
    }