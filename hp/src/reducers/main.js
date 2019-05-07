import {
    LOADING
    } from '../actions/index'
    
    const initValue = {
        loading: false,
    }
    export default (state = initValue, action) => {
      const data = action.data
      switch (action.type) {
        case LOADING: {
          return Object.assign({}, state, {loading: data})
        }
        default: {
          return state;
        }
      }
    }