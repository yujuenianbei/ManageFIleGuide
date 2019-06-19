export const MODELSTATE = 'MODLESTATE';
export const ACCOUNTDATA = 'ACCOUNTDATA';
export const ACCOUNTLOADING = 'ACCOUNTLOADING';
// 弹出框状态
export function modleState(data) {
  return {
    type: MODELSTATE,
    data
  }
}
// 列表loading
export function accountDataLoading(data) {
  return {
    type: ACCOUNTLOADING,
    data
  }
}
// 列表中的用户信息
export function accountData(data) {
  return {
    type: ACCOUNTDATA,
    data
  }
}
