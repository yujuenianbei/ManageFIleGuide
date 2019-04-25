import { ip } from '../../http'
export const LOGIN_KEY = 'LOGIN_KEY';
export const LOGIN_NAME = 'LOGIN_NAME';
export const LOGIN_STATE = 'LOGIN_STATE';
export const SESSION = 'SESSION';

// 用户弹窗
export function session(data) {
  return {
    type: SESSION,
    data
  }
}

export function loginState(data) {
  return {
    type: LOGIN_STATE,
    data
  }
}

// 权限
export function loginKey(data) {
  return {
    type: LOGIN_KEY,
    data
  }
}
// 用户名
export function loginName(data) {
  return {
    type: LOGIN_NAME,
    data
  }
}

// 获取用户列表
export function checkLogin(data) {
  return (dispatch, getState) => {
    console.log(data);
    fetch(ip + '/api/userLogin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        if (JSON.parse(res).reqCode === 200) {
          localStorage.setItem("token", JSON.parse(res).token);
          localStorage.setItem("name", JSON.parse(res).userName);
          dispatch(loginName(JSON.parse(res).userName))
          if (JSON.parse(res).reqData === 'ENT.100') {
            dispatch(loginState('loginSuccess'))
          }
          if (JSON.parse(res).reqKey === 1) {
            dispatch(loginKey(1))
          }
        } else if (JSON.parse(res).reqCode === 500) {
          if (JSON.parse(res).reqData === 'ENT.500') {
            dispatch(loginState('loginFault'))
          }
        }
      })
  }
}
