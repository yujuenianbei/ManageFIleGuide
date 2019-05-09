export const LOADING = 'LOADING';
export const OFFLINE = 'OFFLINE';
export const OFFLINENOTE = 'OFFLINENOTE';
// 用户弹窗
export function loadingData(data) {
  return {
    type: LOADING,
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