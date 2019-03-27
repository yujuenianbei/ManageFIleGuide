import {
    GET_VIDEO_DATA,
    GET_BANNER_DATA
} from './action';

const initValue = {
    videoListData: '',
    bannerList: ''
}
export default (state = initValue, action) =>{
    const data = action.data
    switch (action.type) {
        case GET_VIDEO_DATA: {
            return Object.assign({}, state, { videoListData: data })
          }
        case GET_BANNER_DATA: {
            return Object.assign({}, state, { bannerList: data })
          }
          default: {
            return state;
          }
    }
}