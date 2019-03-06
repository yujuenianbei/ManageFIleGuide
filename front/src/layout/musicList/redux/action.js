import _ from 'lodash'
import { addSong, songPlayNow } from '../../../play/redux/action/index'
import { exportCsv } from '../../userList/redux/index'
export const SONG_LOADING = 'SONG_LOADING';
export const SONG_MODLE = 'SONG_MODLE';
export const SONG_MODLE_NAME = 'SONG_MODLE_NAME';
export const SARCH_SONG_NAME = 'SARCH_SONG_NAME';
export const SEARCH_MUSIC_LIST = 'SEARCH_MUSIC_LIST';
export const ADD_LIST = 'ADD_LIST';
export const ADD_PLAYER_LIST = 'ADD_PLAYER_LIST';
export const SONG_MODLE_DATA = 'SONG_MODLE_DATA';
// loading
export function songLoading(data) {
  return {
    type: SONG_LOADING,
    data
  }
}
// 操作弹窗
export function songModle(data) {
  return {
    type: SONG_MODLE,
    data
  }
}
// 弹框名称
export function modleName(data) {
  return {
    type: SONG_MODLE_NAME,
    data
  }
}
// 添加歌曲到播放列表
export function addList(data) {
  return {
    type: ADD_LIST,
    data
  }
}

// 弹窗内容
export function modleData(data) {
  return {
    type: SONG_MODLE_DATA,
    data
  }
}

// 搜索名称
export function searchMusicName(data) {
  return {
    type: SARCH_SONG_NAME,
    data
  }
}

// 搜索列表
export function searchMusicList(data) {
  return {
    type: SEARCH_MUSIC_LIST,
    data
  }
}

// 搜索列表
export function getSearchMusicList(data) {
  return (dispatch, getState) => {
    const musicData = getState().musicList.list.filter(item => {
      if (data !== '') {
        return item.song_name.indexOf(data) > -1;
      }
      return item;
    })
    dispatch(searchMusicList(musicData));
  }
}

// 获取音乐列表
export function getList() {
  return (dispatch, getState) => {
    dispatch(songLoading(true));
    fetch('/api/songList', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        dispatch(addList(JSON.parse(res).reqData.songInfo));
        dispatch(getSearchMusicList(getState().musicList.searchMusicName))
        dispatch(songLoading(false));
      })
  }
}

// 通过列表添加歌曲
export function addSongToList(data) {
  return (dispatch, getState) => {
    const newSongData = {
      sid: getState().music.data.length + 1,
      name: data.songName,
      img: 'http://localhost:3000/api/img/' + data.songImg,
      author: data.authorName,
      time: data.songTime,
      album: data.songAlbum,
      src: 'http://localhost:3000/api/music/' + data.songUrl,
    }
    const dataList = _.concat(getState().music.data, newSongData);
    const newData = _.sortBy(dataList, function (item) {
      return item.sid;
    })
    getState().music.data = newData.reverse();
    // 修改播放器状态
    dispatch(addSong(!getState().music.add))
    // 第一首触发播放
    if (getState().music.data.length === 1) {
        dispatch(songPlayNow({
          sid: getState().music.data.length + 1,
          songName: data.songName,
          songImg: 'http://localhost:3000/api/img/' + data.songImg,
          songAuthor: data.authorName,
          time: data.songTime,
          src: 'http://localhost:3000/api/music/' + data.songUrl,
        }
      ))
    }
  }
}

// 修改歌曲信息
export function editSongInfo(data) {
  return (dispatch, getState) => {
    dispatch(songLoading(true));
    console.log(data)
    fetch('/api/songInfo', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: data
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(songModle(false));
        dispatch(songLoading(false));
        dispatch(getList());
      })
  }
}

// 删除音乐 以及对应的文件
export function deletSongInfo(data) {
  return (dispatch, getState) => {
    dispatch(songLoading(true));
    fetch('/api/songInfoDelete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: data
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(songModle(false));
        dispatch(songLoading(false));
        dispatch(getList());
      })
  }
}