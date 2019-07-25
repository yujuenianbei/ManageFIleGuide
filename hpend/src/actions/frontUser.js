export const MODELSTATE = 'MODLESTATE';
export const FRONTUSERDATA = 'FRONTUSERDATA';
export const FRONTUSERLOADING = 'FRONTUSERLOADING';
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
export function frontUserModleState(data) {
  return {
    type: MODELSTATE,
    data
  }
}
// 弹出框名称
export function frontUserModleName(data) {
  return {
    type: MODLENAME,
    data
  }
}
export function frontUserModleTitle(data) {
  return {
    type: MODELTITLE,
    data
  }
}
// 列表loading
export function frontUserDataLoading(data) {
  return {
    type: FRONTUSERLOADING,
    data
  }
}
// 提交loading
export function frontUserConfirmLoading(data) {
  return {
    type: CONFIRMLOADING,
    data
  }
}
// 列表中的用户信息
export function frontUserData(data) {
  return {
    type: FRONTUSERDATA,
    data
  }
}
// 列表中的用户信息
export function frontUserModelData(data) {
  return {
    type: MODELDATA,
    data
  }
}

// 所有列 数组
export function frontUserAllCheckCols(data){
  return {
    type: ALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function frontUserCheckListCol(data){
  return {
    type: CHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function frontUserPageSize(data){
  return {
    type: PAGESIZE,
    data
  }
}
// 总页数
export function frontUserPageTotal(data){
  return {
    type: PAGETOTAL,
    data
  }
}
// 当前页数
export function frontUserPageNow(data){
  return {
    type: PAGENOW,
    data
  }
}
// 排序
export function frontUserPageSort(data){
  return {
    type: PAGESORT,
    data
  }
}
// 排序字段
export function frontUserPageSortCol(data){
  return {
    type: PAGESORTCOL,
    data
  }
}
// 搜索内容
export function frontUserSearchUserValue(data) {
  return {
    type: SEARCHVALUE,
    data
  }
}
// 
export function frontUserSearchUserType(data) {
  return {
    type: SEARCHTYPE,
    data
  }
}

