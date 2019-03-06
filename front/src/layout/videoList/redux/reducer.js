import {
  VIDEO_LOADING,
  VIDEO_MODLE,
  VIDEO_MODLE_NAME,
  SARCH_VIDEO_NAME,
  SEARCH_Video_LIST,
  ADD_LIST,
  ADD_PLAYER_LIST,
  VIDEO_MODLE_DATA
} from './action'

const initValue = {
  videoLoading: false,
  videoModle: false,
  modleName: 'add',
  list: [],
  searchVideoList: [],
  searchVideoName: '',
  data: '',
  modleData: {}
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // loading
    case VIDEO_LOADING: {
      return Object.assign({}, state, { videoLoading: data })
    }
    // 弹框名称
    case VIDEO_MODLE_NAME: {
      return Object.assign({}, state, { modleName: data })
    }
    // 弹框状态
    case VIDEO_MODLE: {
      return Object.assign({}, state, { videoModle: data })
    }
    // 弹框内容
    case VIDEO_MODLE_DATA: {
      return Object.assign({}, state, { modleData: data })
    }
    // 搜索名称
    case SARCH_VIDEO_NAME: {
      return Object.assign({}, state, { searchVideoName: data })
    }
    // 搜索列表
    case SEARCH_Video_LIST: {
      return Object.assign({}, state, { searchVideoList: data })
    }
    // 将新增加的列表内容写入
    case ADD_LIST: {
      return Object.assign({}, state, { list: data })
    }
    // 将歌曲添加到播放列表
    case ADD_PLAYER_LIST: {
      return Object.assign({}, state, { data: data })
    }
    default: {
      return state;
    }
  }
}