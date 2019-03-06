import {
  SET_PLAYER_List,
  ADD_PLAYER_LIST,
  SONG_LIKE,
  SONG_LIST_TOGGLE,
  SONG_PLAY_STATE,
  SONG_PLAY_NOW,
  ADD_SONG
} from '../action/index'

const initValue = {
  add: false,
  like: false,
  sid: 1,
  songId: 1,
  songImg: './default_album.jpg',
  songName: '暂无音乐',
  songAuthor: "暂无歌手",
  src: 'http://oqimv5cbl.bkt.clouddn.com/Vonikk%20-%20Phoenix.mp3',
  data: []
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // 获取原先的列表内容
    case SET_PLAYER_List: {
      return Object.assign({}, state, { data, })
    }
    // 将新增加的列表内容写入
    case ADD_PLAYER_LIST: {
      return Object.assign({}, state, { data, })
    }
    // 收藏歌曲
    case SONG_LIKE: {
      return Object.assign({}, state, { like: data })
    }
    // 打开播放列表
    case SONG_LIST_TOGGLE: {
      return Object.assign({}, state, { songListShow: data })
    }
    // 播放
    case SONG_PLAY_STATE: {
      return Object.assign({}, state, { playstate: data })
    }
    // 修改当前歌曲信息
    case SONG_PLAY_NOW: {
      return Object.assign({}, state, action.data)
    }
    // 修改当前歌曲信息
    case ADD_SONG: {
      return Object.assign({}, state, { add: data })
    }
    default: {
      return state;
    }
  }
}