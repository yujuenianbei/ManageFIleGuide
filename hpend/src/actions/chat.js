export const USERONLINELIST = 'USERONLINELIST';
export const CHATLISTSTATE = 'CHATLISTSTATE';
// 登录的用户名
export function userOnlineList(data) {
  return {
    type: USERONLINELIST,
    data
  }
}

// 聊天框的显示
export function chatListState(data) {
  return {
    type: CHATLISTSTATE,
    data
  }
}
