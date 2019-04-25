import _ from 'lodash'
import { ip } from '../../../http'
import { exportCsv } from '../../userList/redux/index'
export const VIDEO_LOADING = 'VIDEO_LOADING';
export const VIDEO_MODLE = 'VIDEO_MODLE';
export const VIDEO_MODLE_NAME = 'VIDEO_MODLE_NAME';
export const SARCH_VIDEO_NAME = 'SARCH_VIDEO_NAME';
export const SEARCH_Video_LIST = 'SEARCH_Video_LIST';
export const ADD_LIST = 'ADD_LIST';
export const ADD_PLAYER_LIST = 'ADD_PLAYER_LIST';
export const VIDEO_MODLE_DATA = 'VIDEO_MODLE_DATA';

// loading
export function videoLoading(data) {
  return {
    type: VIDEO_LOADING,
    data
  }
}
// 操作弹窗
export function videoModle(data) {
  return {
    type: VIDEO_MODLE,
    data
  }
}
// 弹框名称
export function modleName(data) {
  return {
    type: VIDEO_MODLE_NAME,
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
    type: VIDEO_MODLE_DATA,
    data
  }
}

// 搜索名称
export function searchVideoName(data) {
  return {
    type: SARCH_VIDEO_NAME,
    data
  }
}

// 搜索列表
export function searchVideoList(data) {
  return {
    type: SEARCH_Video_LIST,
    data
  }
}

// 搜索列表
export function getSearchVideoList(data) {
  return (dispatch, getState) => {
    const VideoData = getState().videoList.list.filter(item => {
      if (data !== '') {
        return item.video_name.indexOf(data) > -1;
      }
      return item;
    })
    dispatch(searchVideoList(VideoData));
  }
}

// 获取音乐列表
export function getList() {
  return (dispatch, getState) => {
    dispatch(videoLoading(true));
    fetch(ip + '/api/videoList', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        dispatch(addList(JSON.parse(res).reqData.videoInfo));
        dispatch(getSearchVideoList(getState().videoList.searchVideoName))
        dispatch(videoLoading(false));
      })
  }
}

// 通过列表添加歌曲
export function addvideoToList(data) {
  return (dispatch, getState) => {
    const newvideoData = {
      sid: getState().Video.data.length + 1,
      name: data.videoName,
      img: ip + '/api/img/' + data.videoImg,
      author: data.authorName,
      time: data.videoTime,
      album: data.videoAlbum,
      src: ip + '/api/Video/' + data.videoUrl,
    }
    const dataList = _.concat(getState().Video.data, newvideoData);
    const newData = _.sortBy(dataList, function (item) {
      return item.sid;
    })
    getState().Video.data = newData.reverse();
  }
}

// 修改歌曲信息
export function editvideoInfo(data) {
  return (dispatch, getState) => {
    dispatch(videoLoading(true));
    console.log(data)
    fetch(ip + '/api/videoInfo', {
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
        dispatch(videoModle(false));
        dispatch(videoLoading(false));
        dispatch(getList());
      })
  }
}

// 删除音乐 以及对应的文件
export function deletvideoInfo(data) {
  return (dispatch, getState) => {
    dispatch(videoLoading(true));
    fetch(ip + '/api/videoInfoDelete', {
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
        dispatch(videoModle(false));
        dispatch(videoLoading(false));
        dispatch(getList());
      })
  }
}