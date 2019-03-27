export const GET_VIDEO_DATA = 'GET_VIDEO_DATA';
export const GET_BANNER_DATA = 'GET_BANNER_DATA';
// video列表
export function getData(data) {
    return {
        type: GET_VIDEO_DATA,
        data
    }
}
// banner列表
export function getBannerData(data) {
    return {
        type: GET_BANNER_DATA,
        data
    }
}
// 获取banner列表
export function getbanner() {
    return (dispatch, getState) => {
        fetch(getState().Http.api+ 'imgList', {
            method: 'GET',
        })
            .then((res) => {
                return res.text();
            })
            .then((res) => {
                dispatch(getBannerData(JSON.parse(res).reqData.imgInfo));
            })
    }
}

// 获取音乐列表
export function getList() {
    return (dispatch, getState) => {
        fetch(getState().Http.api+ 'videoList', {
            method: 'GET',
        })
            .then((res) => {
                return res.text();
            })
            .then((res) => {
                dispatch(getData(JSON.parse(res).reqData.videoInfo));
            })
    }
}