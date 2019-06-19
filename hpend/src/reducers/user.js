import {
    LOGINSTATE,
    USERNAME,
    MODELSTATE
  } from '../actions/index'
  
  const initValue = {
    modelState: false,
    loginState: 0,
    userName: ''
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case LOGINSTATE: {
        return Object.assign({}, state, { loginState: data })
      }
      case MODELSTATE: {
        return Object.assign({}, state, { modelState: data })
      }
      case USERNAME: {
        return Object.assign({}, state, { userName: data })
      }
      default: {
        return state;
      }
    }
  }