import {
    LOGINSTATE,
    USERNAME,
    PAGEUID,
    QRSTATE,
    QRMESSAGE
  } from '../actions/index'
  
  const initValue = {
    pageUid: '',
    qrState: 1,
    qrMessage: '请扫描二维码',
    loginState: 0,
    userName: ''
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case LOGINSTATE: {
        return Object.assign({}, state, { loginState: data })
      }
      case USERNAME: {
        return Object.assign({}, state, { userName: data })
      }
      case PAGEUID: {
        return Object.assign({}, state, { pageUid: data })
      }
      case QRSTATE: {
        return Object.assign({}, state, { qrState: data })
      }
      case QRMESSAGE: {
        return Object.assign({}, state, { qrMessage: data })
      }
      default: {
        return state;
      }
    }
  }