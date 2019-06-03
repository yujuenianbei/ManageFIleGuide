export const LOGINSTATE = 'LOGINSTATE';
export const USERNAME = 'USERNAME';
// 登录状态
export function loginstate(data) {
  return {
    type: LOGINSTATE,
    data
  }
}

// 登录状态
export function usernanme(data) {
    return {
      type: USERNAME,
      data
    }
  }
