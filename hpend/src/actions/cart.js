export const CARTMODELSTATE = 'CARTMODLESTATE';
export const CARTACCOUNTDATA = 'CARTACCOUNTDATA';
export const CARTACCOUNTLOADING = 'CARTACCOUNTLOADING';
export const CARTCONFIRMLOADING = 'CARTCONFIRMLOADING'
export const CARTMODLENAME = 'CARTMODLENAME';
export const CARTMODELTITLE = 'CARTMODELTITLE';
export const CARTMODELDATA = 'CARTMODELDATA';
export const CARTCHECKLISTCOL = 'CARTCHECKLISTCOL';
export const CARTALLCHECKCOL = 'CARTALLCHECKCOL';
export const CARTPAGESIZE = 'CARTPAGESIZE';  
export const CARTPAGETOTAL = 'CARTPAGETOTAL'//总页数
export const CARTPAGENOW = 'CARTPAGENOW';  //当前页数
export const CARTPAGESORT = 'CARTPAGESORT';  //排序
export const CARTPAGESORTCOL = 'CARTPAGESORTCOL'; // 排序字段
export const CARTSEARCHTYPE = 'CARTSEARCHTYPE'; //搜索类型
export const CARTSEARCHVALUE = 'CARTSEARCHVALUE'; //搜索内容
export const CARTYPELIST = 'CARTTYPELIST' //产品类别

// 弹出框状态
export function cartModleState(data) {
  return {
    type: CARTMODELSTATE,
    data
  }
}
// 弹出框名称
export function cartModleName(data) {
  return {
    type: CARTMODLENAME,
    data
  }
}
export function cartModleTitle(data) {
  return {
    type: CARTMODELTITLE,
    data
  }
}
// 列表loading
export function cartDataLoading(data) {
  return {
    type: CARTACCOUNTLOADING,
    data
  }
}
// 提交loading
export function cartConfirmLoading(data) {
  return {
    type: CARTCONFIRMLOADING,
    data
  }
}
// 列表中的用户信息
export function cartData(data) {
  return {
    type: CARTACCOUNTDATA,
    data
  }
}
// 列表中的用户信息
export function cartModelData(data) {
  return {
    type: CARTMODELDATA,
    data
  }
}

// 所有列 数组
export function cartAllCheckCols(data){
  return {
    type: CARTALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function cartCheckListCol(data){
  return {
    type: CARTCHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function cartPageSize(data){
  return {
    type: CARTPAGESIZE,
    data
  }
}
// 总页数
export function cartPageTotal(data){
  return {
    type: CARTPAGETOTAL,
    data
  }
}
// 当前页数
export function cartPageNow(data){
  return {
    type: CARTPAGENOW,
    data
  }
}
// 排序
export function cartPageSort(data){
  return {
    type: CARTPAGESORT,
    data
  }
}
// 排序字段
export function cartPageSortCol(data){
  return {
    type: CARTPAGESORTCOL,
    data
  }
}
// 搜索内容
export function cartSearchValue(data) {
  return {
    type: CARTSEARCHVALUE,
    data
  }
}
// 
export function cartSearchType(data) {
  return {
    type: CARTSEARCHTYPE,
    data
  }
}
// 
export function cartTypeList(data) {
  return {
    type: CARTYPELIST,
    data
  }
}



