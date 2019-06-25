export const MODELSTATE = 'MODLESTATE';
export const ACCOUNTDATA = 'ACCOUNTDATA';
export const ACCOUNTLOADING = 'ACCOUNTLOADING';
export const CONFIRMLOADING = 'CONFIRMLOADING'
export const MODLENAME = 'MODLENAME';
export const MODELTITLE = 'MODELTITLE';
export const MODELDATA = 'MODELDATA';
export const CHECKLISTCOL = 'CHECKLISTCOL';
export const ALLCHECKCOL = 'ALLCHECKCOL';
export const PAGESIZE = 'PAGESIZE';  
export const PAGETOTAL = 'PAGETOTAL'//总页数
export const PAGENOW = 'PAGENOW';  //当前页数
export const PAGESORT = 'PAGESORT';  //排序
export const PAGESORTCOL = 'PAGESORTCOL'; // 排序字段
export const SEARCHTYPE = 'SEARCHTYPE'; //搜索类型
export const SEARCHVALUE = 'SEARCHVALUE'; //搜索内容

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
// 提交loading
export function confirmLoading(data) {
  return {
    type: CONFIRMLOADING,
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

// 所有列 数组
export function allCheckCols(data){
  return {
    type: ALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function checkListCol(data){
  return {
    type: CHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function pageSize(data){
  return {
    type: PAGESIZE,
    data
  }
}
// 总页数
export function pageTotal(data){
  return {
    type: PAGETOTAL,
    data
  }
}
// 当前页数
export function pageNow(data){
  return {
    type: PAGENOW,
    data
  }
}
// 排序
export function pageSort(data){
  return {
    type: PAGESORT,
    data
  }
}
// 排序字段
export function pageSortCol(data){
  return {
    type: PAGESORTCOL,
    data
  }
}
// 搜索内容
export function searchUserValue(data) {
  return {
    type: SEARCHVALUE,
    data
  }
}
// 
export function searchUserType(data) {
  return {
    type: SEARCHTYPE,
    data
  }
}

