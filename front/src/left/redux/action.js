import { ip } from '../../http'
export const LEFT_LOADING = 'LEFT_LOADING'
export const COLLAPSED = 'COLLAPSED';
export const LINK = 'LINK';
export const INDEX = 'INDEX';
export const LEFT_LIST = 'LEFT_LIST'
export const GET_DATA = 'GET_DATA';

// loading 
export function leftLoading(data) {
    return {
        type: LEFT_LOADING,
        data
    }
}

export function collapsed(data) {
    return {
        type: COLLAPSED,
        data
    }
}

export function link(data) {
    return {
        type: LINK,
        data
    }
}

export function index(data) {
    return {
        type: INDEX,
        data
    }
}

export function leftList(data) {
    return {
        type: LEFT_LIST,
        data
    }
}

export function getData() {
    return (dispatch, getState) => {
        dispatch(leftLoading(true));
        fetch(ip + '/api/leftList', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        })
            .then((res) => {
                return res.text()
            })
            .then((res) => {
                dispatch(leftLoading(false));
                dispatch(leftList(JSON.parse(res).reqData.leftList));
            })
    }
}