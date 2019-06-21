import {
    MODELSTATE,
    ACCOUNTDATA,
    ACCOUNTLOADING,
    MODLENAME,
    MODELTITLE,
    MODELDATA,
    CONFIRMLOADING
  } from '../actions/index'
  
  const initValue = {
    confirmLoading: false,
    modelName: '',
    modelTitle: '',
    modelState: false,
    modelData: null,
    accountLoading: false,
    accountData: []
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case MODELSTATE: {
        return Object.assign({}, state, { modelState: data })
      }
      case MODLENAME: {
        return Object.assign({}, state, { modelName: data })
      }
      case MODELTITLE: {
        return Object.assign({}, state, { modelTitle: data })
      }
      case MODELDATA: {
        return Object.assign({}, state, { modelData: data })
      }
      case ACCOUNTDATA: {
        return Object.assign({}, state, { accountData: data })
      }
      case ACCOUNTLOADING: {
        return Object.assign({}, state, { accountLoading: data })
      }
      case CONFIRMLOADING: {
        return Object.assign({}, state, { confirmLoading: data })
      }
      default: {
        return state;
      }
    }
  }