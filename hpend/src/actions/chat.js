import { func } from "prop-types";

export const USERONLINELIST = 'USERONLINELIST';
export const CHATLISTSTATE = 'CHATLISTSTATE';
export const CHATOBJECT = 'CHATOBJECT';
export const CHATCONTENT = 'CHATCONTENT';
export const CHATNOWUSER = 'CHATNOWUSER';
export const CHATTOPTAB = 'CHATTOPTAB';
export const CHATROOMS = 'CHATROOMS';
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

// 聊天对象
export function chatUsers(data) {
  return {
    type: CHATOBJECT,
    data
  } 
}

// 聊天记录
export function chatContent(data) {
  return {
    type: CHATCONTENT,
    data
  } 
}

// 当前聊天对象
export function chatNowUser(data) {
  return {
    type: CHATNOWUSER,
    data
  } 
}

// 当前切换的顶层tab
export function chatTopTab(data) {
  return {
    type: CHATTOPTAB,
    data
  } 
}

// 存储之前聊天过的房间号
export function chatRooms(data) {
  return {
    type: CHATROOMS,
    data
  } 
}