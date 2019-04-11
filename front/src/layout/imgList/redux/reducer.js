import {
  IMG_LOADING,
  IMG_MODLE,
  IMG_MODLE_NAME,
  SARCH_IMG_NAME,
  SEARCH_IMG_LIST,
  ADD_LIST,
  ADD_PLAYER_LIST,
  IMG_MODLE_DATA,
  IMG_TOP_STATE,
  IMG_TYPE_LIST
} from './action'

const initValue = {
  imgLoading: false,
  imgModle: false,
  imgTop: false,
  modleName: 'add',
  imgTypeList: [],
  list: [],
  searchImgList: [],
  searchImgName: '',
  data: '',
  modleData: {}
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // loading
    case IMG_LOADING: {
      return Object.assign({}, state, { imgLoading: data })
    }
    // 弹框名称
    case IMG_MODLE_NAME: {
      return Object.assign({}, state, { modleName: data })
    }
    // 置顶状态
    case IMG_TOP_STATE: {
      return Object.assign({}, state, { imgTop: data })
    }
    // 弹框状态
    case IMG_MODLE: {
      return Object.assign({}, state, { imgModle: data })
    }
    // 弹框内容
    case IMG_MODLE_DATA: {
      return Object.assign({}, state, { modleData: data })
    }
    // 搜索名称
    case SARCH_IMG_NAME: {
      return Object.assign({}, state, { searchImgName: data })
    }
    // 搜索列表
    case SEARCH_IMG_LIST: {
      return Object.assign({}, state, { searchImgList: data })
    }
    // 图片种类
    case IMG_TYPE_LIST: {
      return Object.assign({}, state, { imgTypeList: data })
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