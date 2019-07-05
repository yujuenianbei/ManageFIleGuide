import {
  USERONLINELIST,
  CHATLISTSTATE,
  CHATOBJECT,
  CHATCONTENT,
  CHATNOWUSER,
  CHATTOPTAB,
  CHATROOMS
} from '../actions/index'

const initValue = {
  userOnlineList: '',
  chatListState: false,
  chatUsers: [
    { title: '文件管理器', content: '', key: '0', closable: false }
  ],
  chatContent: {},
  chatNowUser: {
    key: "0",
    userName: "文件管理器"
  },
  chatTopTab: "1",
  chatRooms: {}
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
    case CHATCONTENT: {
      return Object.assign({}, state, { chatContent: data })
    }
    case CHATNOWUSER: {
      return Object.assign({}, state, { chatNowUser: data })
    }
    case CHATTOPTAB: {
      return Object.assign({}, state, { chatTopTab: data })
    }
    case CHATROOMS: {
      return Object.assign({}, state, { chatRooms: data })
    }
    default: {
      return state;
    }
  }
}