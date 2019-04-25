import _ from 'lodash';
import { ip } from '../../../http'
export const IMG_LOADING = 'IMG_LOADING';
export const IMG_MODLE = 'IMG_MODLE';
export const IMG_MODLE_NAME = 'IMG_MODLE_NAME';
export const SARCH_IMG_NAME = 'SARCH_IMG_NAME';
export const SEARCH_IMG_LIST = 'SEARCH_IMG_LIST';
export const ADD_LIST = 'ADD_LIST';
export const ADD_PLAYER_LIST = 'ADD_PLAYER_LIST';
export const IMG_MODLE_DATA = 'IMG_MODLE_DATA';
export const IMG_TOP_STATE = 'IMG_TOP_STATE';
export const IMG_TYPE_LIST = 'IMG_TYPE_LIST';
// loading
export function imgLoading(data) {
  return {
    type: IMG_LOADING,
    data
  }
}
// 操作弹窗
export function imgModle(data) {
  return {
    type: IMG_MODLE,
    data
  }
}
// 弹框名称
export function modleName(data) {
  return {
    type: IMG_MODLE_NAME,
    data
  }
}
// 图片是否置顶
export function imgTopState(data) {
  return {
    type: IMG_TOP_STATE,
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
    type: IMG_MODLE_DATA,
    data
  }
}

// 搜索图片名称
export function searchImgName(data) {
  return {
    type: SARCH_IMG_NAME,
    data
  }
}

// 搜索图片列表
export function searchImgList(data) {
  return {
    type: SEARCH_IMG_LIST,
    data
  }
}

// 搜索图片列表
export function ImgTypeList(data) {
  return {
    type: IMG_TYPE_LIST,
    data
  }
}

// 搜索图片列表
export function getSearchImgList(data) {
  return (dispatch, getState) => {
    const imgData = getState().imgList.list.filter(item => {
      if (data !== '') {
        return item.img_name.indexOf(data) > -1;
      }
      return item;
    })
    dispatch(searchImgList(imgData));
  }
}


// 获取图片分类列表
export function getImgTypeList() {
  return (dispatch, getState) => {
    dispatch(imgLoading(true));
    fetch(ip + '/api/imgTypeList', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        dispatch(ImgTypeList(JSON.parse(res).reqData.imgTypeList));
      })
  }
}

// 获取图片列表
export function getList() {
  return (dispatch, getState) => {
    dispatch(imgLoading(true));
    fetch(ip + '/api/imgList', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        const data = JSON.parse(res).reqData.imgInfo.map((item) => {
          if (item.img_top == 1) {
            item.img_top = true
          } else {
            item.img_top = false
          }
          return item
        })
        dispatch(addList(data));
        dispatch(getSearchImgList(getState().imgList.searchImgName))
        dispatch(imgLoading(false));
      })
  }
}


// 修改图片信息
export function editImgInfo(data) {
  return (dispatch, getState) => {
    dispatch(imgLoading(true));
    fetch(ip + '/api/imgInfo', {
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
        dispatch(imgModle(false));
        dispatch(imgLoading(false));
        dispatch(getList());
      })
  }
}

// 删除图片 以及对应的文件
export function deletImgInfo(data) {
  return (dispatch, getState) => {
    dispatch(imgLoading(true));
    fetch(ip + '/api/imgInfoDelete', {
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
        dispatch(imgModle(false));
        dispatch(imgLoading(false));
        dispatch(getList());
      })
  }
}