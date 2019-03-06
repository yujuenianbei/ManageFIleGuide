import {
  CHAT_PART,
} from './action'

const initValue = {
  chatpartState: false,
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // session
    case CHAT_PART: {
      return Object.assign({}, state, { chatpartState: data })
    }
    default: {
      return state;
    }
  }
}