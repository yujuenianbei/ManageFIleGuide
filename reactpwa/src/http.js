
export const VIDEO_HTTP = 'VIDEO_HTTP';
export const IMG_HTTP = 'IMG_HTTP';
export const MUSIC_HTTP = 'MUSIC_HTTP';
export const FILE_HTTP = 'FILE_HTTP';
export const API_HTTP = 'API_HTTP';

const initValue = {
    video: 'http://192.168.1.128:3000/api/video/',
    img: 'http://192.168.1.128:3000/api/img/',
    music: 'http://192.168.1.128:3000/api/music/',
    file: 'http://192.168.1.128:3000/api/output/',
    api:  'http://192.168.1.128:3000/api/',
}
const HttpsReducer = (state = initValue, action) =>{
    const data = action.data
    switch (action.type) {
        case VIDEO_HTTP: {
          return Object.assign({}, state, { video: data })
        }
        case IMG_HTTP: {
          return Object.assign({}, state, { img: data })
        }
        case MUSIC_HTTP: {
          return Object.assign({}, state, { music: data })
        }
        case FILE_HTTP: {
          return Object.assign({}, state, { file: data })
        }
        case API_HTTP: {
          return Object.assign({}, state, { api: data })
        }
        default: {
          return state;
        }
    }
}

export { HttpsReducer }