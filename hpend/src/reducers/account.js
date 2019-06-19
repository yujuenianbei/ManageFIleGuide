import {
    MODELSTATE,
    ACCOUNTDATA,
    ACCOUNTLOADING,
  } from '../actions/index'
  
  const initValue = {
    modelState: false,
    accountLoading: false,
    accountData: []
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case MODELSTATE: {
        return Object.assign({}, state, { modelState: data })
      }
      case ACCOUNTDATA: {
        return Object.assign({}, state, { accountData: data })
      }
      case ACCOUNTLOADING: {
        return Object.assign({}, state, { accountLoading: data })
      }
      default: {
        return state;
      }
    }
  }