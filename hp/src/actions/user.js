export const LOGINSTATE = 'LOGINSTATE';
export const USERNAME = 'USERNAME';
export const EMAIL = 'EMAIL';
export const USERADDRESS = 'USERADDRESS';
// 登录状态
export function loginstate(data) {
  localStorage.setItem("loginState", data);
  if(data === 0){
    localStorage.setItem("token", null);
    localStorage.setItem("id", null);
  }
  return {
    type: LOGINSTATE,
    data
  }
}

// 登录的用户名
export function usernanme(data) {
    return {
      type: USERNAME,
      data
    }
  }

// 登录的用户名
export function useremail(data) {
  return {
    type: EMAIL,
    data
  }
}

// 用户收货地址
export function userAddress(data) {
  return {
    type: USERADDRESS,
    data
  }
}