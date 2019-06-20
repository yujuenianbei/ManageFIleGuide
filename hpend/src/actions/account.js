export const MODELSTATE = 'MODLESTATE';
export const ACCOUNTDATA = 'ACCOUNTDATA';
export const ACCOUNTLOADING = 'ACCOUNTLOADING';
export const MODLENAME = 'MODLENAME';
export const MODELTITLE = 'MODELTITLE';
export const MODELDATA = 'MODELDATA'
// 弹出框状态
export function modleState(data) {
  return {
    type: MODELSTATE,
    data
  }
}
// 弹出框名称
export function modleName(data) {
  return {
    type: MODLENAME,
    data
  }
}
export function modleTitle(data) {
  return {
    type: MODELTITLE,
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
// 列表中的用户信息
export function modelData(data) {
  return {
    type: MODELDATA,
    data
  }
}
