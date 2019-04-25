import { ip } from '../../../http'
export const ADD_SONG = 'ADD_SONG';
export const ADD_LIST = 'ADD_LIST';

// 新增歌曲
export function addSong(data) {
    return {
        type: ADD_SONG,
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

export function getList() {
    return (dispatch) => {
        fetch(ip + '/api/userList', {
                method: 'GET',
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                return res.text()
            })
            .then((res) => {
                dispatch(addList({
                    list: JSON.parse(res).reqData.userInfo
                }))
                console.log(JSON.parse(res).reqData.userInfo);
            })
    }
}