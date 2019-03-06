import {
  VIDEO_TITLE,
} from '../action/index'

const initValue = {
  videoTitle: ''
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // 获取原先的列表内容
    case VIDEO_TITLE: {
      return Object.assign({}, state, { videoTitle: data })
    }
    default: {
      return state;
    }
  }
}