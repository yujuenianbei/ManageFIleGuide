import {
  LOGIN_KEY,
  LOGIN_NAME,
  LOGIN_STATE,
  SESSION
} from './action'

const initValue = {
  loginState: 'login',
  loginKey: 0,
  session: false,
  userName: ''
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    // session
    case SESSION: {
      return Object.assign({}, state, { session: data })
    }
    // loginstate
    case LOGIN_STATE: {
      return Object.assign({}, state, { loginState: data })
    }
    // loginKey
    case LOGIN_KEY: {
      return Object.assign({}, state, { loginKey: data })
    }
    // userName
    case LOGIN_NAME: {
      return Object.assign({}, state, { userName: data })
    }
    default: {
      return state;
    }
  }
}