import {
  LOGINSTATE,
  USERNAME,
  EMAIL
} from '../actions/index'

const initValue = {
  loginState: 0,
  userName: '',
  useremail: '',
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case LOGINSTATE: {
      return Object.assign({}, state, { loginState: data })
    }
    case USERNAME: {
      return Object.assign({}, state, { userName: data })
    }
    case EMAIL: {
      return Object.assign({}, state, { useremail: data })
    }
    default: {
      return state;
    }
  }
}