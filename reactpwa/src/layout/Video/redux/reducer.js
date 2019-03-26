import {
    GET_VIDEO
} from './action';

const initValue = {
    videoData: ''
}
export default (state = initValue, action) =>{
    const data = action.data
    switch (action.type) {
        case GET_VIDEO: {
            return Object.assign({}, state, { videoData: data })
          }
          default: {
            return state;
          }
    }
}