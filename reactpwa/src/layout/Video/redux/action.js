export const GET_VIDEO = 'GET_VIDEO';

// 用户弹窗
export function getData(data) {
    return {
        type: GET_VIDEO,
        data
    }
}

// 获取音乐列表
export function getVideo(id) {
    return (dispatch, getState) => {
        fetch('/api/video?id=' + id, {
            method: 'GET',
        }).then((res) => {
                return res.text();
            })
            .then((res) => {
                dispatch(getData(JSON.parse(res).reqData));
            })
    }
}