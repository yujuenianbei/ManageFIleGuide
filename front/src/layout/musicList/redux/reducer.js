import {
  SONG_LOADING,
  SONG_MODLE,
  SONG_MODLE_NAME,
  SARCH_SONG_NAME,
  SEARCH_MUSIC_LIST,
  ADD_LIST,
  ADD_PLAYER_LIST,
  SONG_MODLE_DATA
} from './action'

const initValue = {
  musicLoading: false,
  songModle: false,
  modleName: 'add',
  list: [],
  searchMusicList: [],
  searchMusicName: '',
  data: '',
  modleData: {}
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // loading
    case SONG_LOADING: {
      return Object.assign({}, state, { musicLoading: data })
    }
    // 弹框名称
    case SONG_MODLE_NAME: {
      return Object.assign({}, state, { modleName: data })
    }
    // 弹框状态
    case SONG_MODLE: {
      return Object.assign({}, state, { songModle: data })
    }
    // 弹框内容
    case SONG_MODLE_DATA: {
      return Object.assign({}, state, { modleData: data })
    }
    // 搜索名称
    case SARCH_SONG_NAME: {
      return Object.assign({}, state, { searchMusicName: data })
    }
    // 搜索列表
    case SEARCH_MUSIC_LIST: {
      return Object.assign({}, state, { searchMusicList: data })
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