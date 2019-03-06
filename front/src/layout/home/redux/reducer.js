import {
  ADD_SONG,
  ADD_LIST,
} from './action'

const initValue = {
  addSongModle: false,
  list:[]
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // 获取原先的列表内容
    case ADD_SONG: {
      return Object.assign({}, state, {addSongModle: data})
    }
    // 将新增加的列表内容写入
    case ADD_LIST: {
      return Object.assign({}, state, action.data)
    }
    default: {
      return state;
    }
  }
}