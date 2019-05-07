export const LOADING = 'LOADING';

// 用户弹窗
export function loadingData(data) {
  return {
    type: LOADING,
    data
  }
}