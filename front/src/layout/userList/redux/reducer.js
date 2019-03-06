import {
  USER_ADD_MODLE,
  ADD_USER_LIST,
  USER_LOADING,
  USER_OPERATION_MODLE_NAME,
  USER_MODLE_DATA,
  USER_SEARCH_NAME,
  USER_SEARCH_LIST,
  SESSION
} from './action'

const initValue = {
  session: '',
  userLoading: false,
  addUserModle: false,
  modleName: '',
  modleData: {},
  userSearch: '',
  searchUserList: [],
  list: []
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // session
    case SESSION: {
      return Object.assign({}, state, { session: data })
    }
    // LOADING
    case USER_LOADING: {
      return Object.assign({}, state, { userLoading: data })
    }
    // 搜索用户
    case USER_SEARCH_NAME: {
      return Object.assign({}, state, { userSearch: data })
    }
    // 搜索用户
    case USER_SEARCH_LIST: {
      return Object.assign({}, state, { searchUserList: data })
    }
    // 用户操作modle新增还是编辑
    case USER_OPERATION_MODLE_NAME: {
      return Object.assign({}, state, { modleName: data })
    }
    // mdole中的内容
    case USER_MODLE_DATA: {
      return Object.assign({}, state, { modleData: data })
    }
    // 获取原先的列表内容
    case USER_ADD_MODLE: {
      return Object.assign({}, state, { addUserModle: data })
    }
    // 将新增加的列表内容写入
    case ADD_USER_LIST: {
      return Object.assign({}, state, { list: data })
    }
    default: {
      return state;
    }
  }
}