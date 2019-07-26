export const ACCOUNTMODELSTATE = 'ACCOUNTMODLESTATE';
export const ACCOUNTDATA = 'ACCOUNTDATA';
export const ACCOUNTLOADING = 'ACCOUNTLOADING';
export const ACCOUNTCONFIRMLOADING = 'ACCOUNTCONFIRMLOADING'
export const ACCOUNTMODLENAME = 'ACCOUNTMODLENAME';
export const ACCOUNTMODELTITLE = 'ACCOUNTMODELTITLE';
export const ACCOUNTMODELDATA = 'ACCOUNTMODELDATA';
export const ACCOUNTCHECKLISTCOL = 'ACCOUNTCHECKLISTCOL';
export const ACCOUNTALLCHECKCOL = 'ACCOUNTALLCHECKCOL';
export const ACCOUNTPAGESIZE = 'ACCOUNTPAGESIZE';  
export const ACCOUNTPAGETOTAL = 'ACCOUNTPAGETOTAL'//总页数
export const ACCOUNTPAGENOW = 'ACCOUNTPAGENOW';  //当前页数
export const ACCOUNTPAGESORT = 'ACCOUNTPAGESORT';  //排序
export const ACCOUNTPAGESORTCOL = 'ACCOUNTPAGESORTCOL'; // 排序字段
export const ACCOUNTSEARCHTYPE = 'ACCOUNTSEARCHTYPE'; //搜索类型
export const ACCOUNTSEARCHVALUE = 'ACCOUNTSEARCHVALUE'; //搜索内容

// 弹出框状态
export function accountModleState(data) {
  return {
    type: ACCOUNTMODELSTATE,
    data
  }
}
// 弹出框名称
export function accountModleName(data) {
  return {
    type: ACCOUNTMODLENAME,
    data
  }
}
export function accountModleTitle(data) {
  return {
    type: ACCOUNTMODELTITLE,
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
// 提交loading
export function accountConfirmLoading(data) {
  return {
    type: ACCOUNTCONFIRMLOADING,
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
export function accountModelData(data) {
  return {
    type: ACCOUNTMODELDATA,
    data
  }
}

// 所有列 数组
export function accountAllCheckCols(data){
  return {
    type: ACCOUNTALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function accountCheckListCol(data){
  return {
    type: ACCOUNTCHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function accountPageSize(data){
  return {
    type: ACCOUNTPAGESIZE,
    data
  }
}
// 总页数
export function accountPageTotal(data){
  return {
    type: ACCOUNTPAGETOTAL,
    data
  }
}
// 当前页数
export function accountPageNow(data){
  return {
    type: ACCOUNTPAGENOW,
    data
  }
}
// 排序
export function accountPageSort(data){
  return {
    type: ACCOUNTPAGESORT,
    data
  }
}
// 排序字段
export function accountPageSortCol(data){
  return {
    type: ACCOUNTPAGESORTCOL,
    data
  }
}
// 搜索内容
export function accountSearchUserValue(data) {
  return {
    type: ACCOUNTSEARCHVALUE,
    data
  }
}
// 
export function accountSearchUserType(data) {
  return {
    type: ACCOUNTSEARCHTYPE,
    data
  }
}

