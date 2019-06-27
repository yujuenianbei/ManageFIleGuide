export const LOGINSTATE = 'LOGINSTATE';
export const USERNAME = 'USERNAME';
export const PAGEUID = 'PAGEUID';
export const QRSTATE = 'QRSTATE';
export const QRMESSAGE = 'QRMESSAGE';
// 登录状态
export function loginstate(data) {
  localStorage.setItem("loginState", data);
  if (data === 0) {
    localStorage.removeItem("token");
  }
  return {
    type: LOGINSTATE,
    data
  }
}

// 登录的用户名
export function username(data) {
  return {
    type: USERNAME,
    data
  }
}

// 二维码UID
export function pageUid(data) {
  return {
    type: PAGEUID,
    data
  }
}
// 二维码扫描状态
export function qrState(data) {
  return {
    type: QRSTATE,
    data
  }
}
// 二维码状态信息
export function qrMessage(data) {
  return {
    type: QRMESSAGE,
    data
  }
}
