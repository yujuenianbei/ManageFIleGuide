import {
    USERONLINELIST,
    CHATLISTSTATE,
  } from '../actions/index'
  
  const initValue = {
    userOnlineList: '',
    chatListState: false
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case USERONLINELIST: {
        return Object.assign({}, state, { userOnlineList: data })
      }
      case CHATLISTSTATE: {
        return Object.assign({}, state, { chatListState: data })
      }
      default: {
        return state;
      }
    }
  }