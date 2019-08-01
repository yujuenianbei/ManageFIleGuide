import {
  LOGINSTATE,
  USERNAME,
  EMAIL,
  USERADDRESS
} from '../actions/index'

const initValue = {
  loginState: 0,
  userName: '',
  useremail: '',
  userAddress: []
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
    case USERADDRESS: {
      return Object.assign({}, state, { userAddress: data })
    }
    default: {
      return state;
    }
  }
}