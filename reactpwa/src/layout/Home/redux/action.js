export const GET_VIDEO_DATA = 'GET_VIDEO_DATA';

// 用户弹窗
export function getData(data) {
    return {
        type: GET_VIDEO_DATA,
        data
    }
}

// 获取音乐列表
export function getList() {

    return (dispatch, getState) => {
        console.log(getState().Http.api)
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