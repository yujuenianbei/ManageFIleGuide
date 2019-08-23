export const LOADING = 'LOADING';
export const LOADINGHEADER = 'LOADINGHEADER';
export const OFFLINE = 'OFFLINE';
export const OFFLINENOTE = 'OFFLINENOTE';
export const SEARCHBARSTATE = 'SEARCHBARSTATE';
export const DRAWERSTATE = 'DRAWERSTATE';
// 用户弹窗
export function loadingData(data) {
  return {
    type: LOADING,
    data
  }
}

// 用户弹窗
export function loadingHeader(data) {
  return {
    type: LOADINGHEADER,
    data
  }
}

// 离线状态
export function offLine(data) {
  return {
    type: OFFLINE,
    data
  }
}

// 离线提示
export function offLineNote(data) {
  return {
    type: OFFLINENOTE,
    data
  }
}

// 搜索弹出状态
export function searchBarState(data) {
  return {
    type: SEARCHBARSTATE,
    data
  }
}

// 搜索弹出状态
export function drawerState(data) {
  return {
    type: DRAWERSTATE,
    data
  }
}