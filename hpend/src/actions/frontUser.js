export const FRONTUSERMODELSTATE = 'FRONTUSERMODLESTATE';
export const FRONTUSERDATA = 'FRONTUSERDATA';
export const FRONTUSERLOADING = 'FRONTUSERLOADING';
export const FRONTUSERCONFIRMLOADING = 'FRONTUSERCONFIRMLOADING'
export const FRONTUSERMODLENAME = 'FRONTUSERMODLENAME';
export const FRONTUSERMODELTITLE = 'FRONTUSERMODELTITLE';
export const FRONTUSERMODELDATA = 'FRONTUSERMODELDATA';
export const FRONTUSERCHECKLISTCOL = 'FRONTUSERCHECKLISTCOL';
export const FRONTUSERALLCHECKCOL = 'FRONTUSERALLCHECKCOL';
export const FRONTUSERPAGESIZE = 'FRONTUSERPAGESIZE';  
export const FRONTUSERPAGETOTAL = 'FRONTUSERPAGETOTAL'//总页数
export const FRONTUSERPAGENOW = 'FRONTUSERPAGENOW';  //当前页数
export const FRONTUSERPAGESORT = 'FRONTUSERPAGESORT';  //排序
export const FRONTUSERPAGESORTCOL = 'FRONTUSERPAGESORTCOL'; // 排序字段
export const FRONTUSERSEARCHTYPE = 'FRONTUSERSEARCHTYPE'; //搜索类型
export const FRONTUSERSEARCHVALUE = 'FRONTUSERSEARCHVALUE'; //搜索内容

// 弹出框状态
export function frontUserModleState(data) {
  return {
    type: FRONTUSERMODELSTATE,
    data
  }
}
// 弹出框名称
export function frontUserModleName(data) {
  return {
    type: FRONTUSERMODLENAME,
    data
  }
}
export function frontUserModleTitle(data) {
  return {
    type: FRONTUSERMODELTITLE,
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
    type: FRONTUSERCONFIRMLOADING,
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
    type: FRONTUSERMODELDATA,
    data
  }
}

// 所有列 数组
export function frontUserAllCheckCols(data){
  return {
    type: FRONTUSERALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function frontUserCheckListCol(data){
  return {
    type: FRONTUSERCHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function frontUserPageSize(data){
  return {
    type: FRONTUSERPAGESIZE,
    data
  }
}
// 总页数
export function frontUserPageTotal(data){
  return {
    type: FRONTUSERPAGETOTAL,
    data
  }
}
// 当前页数
export function frontUserPageNow(data){
  return {
    type: FRONTUSERPAGENOW,
    data
  }
}
// 排序
export function frontUserPageSort(data){
  return {
    type: FRONTUSERPAGESORT,
    data
  }
}
// 排序字段
export function frontUserPageSortCol(data){
  return {
    type: FRONTUSERPAGESORTCOL,
    data
  }
}
// 搜索内容
export function frontUserSearchUserValue(data) {
  return {
    type: FRONTUSERSEARCHVALUE,
    data
  }
}
// 
export function frontUserSearchUserType(data) {
  return {
    type: FRONTUSERSEARCHTYPE,
    data
  }
}

