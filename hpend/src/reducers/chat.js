import {
    USERONLINELIST,
    CHATLISTSTATE,
    CHATOBJECT
  } from '../actions/index'
  
  const initValue = {
    userOnlineList: '',
    chatListState: false,
    chatUsers: [
      { title: '文件管理器', content: '', key: '0', closable: false }
    ]
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
      case CHATOBJECT: {
        return Object.assign({}, state, { chatUsers: data })
      }
      default: {
        return state;
      }
    }
  }