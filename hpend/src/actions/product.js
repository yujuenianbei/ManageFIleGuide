export const PRODUCTMODELSTATE = 'PRODUCTMODLESTATE';
export const PRODUCTACCOUNTDATA = 'PRODUCTACCOUNTDATA';
export const PRODUCTACCOUNTLOADING = 'PRODUCTACCOUNTLOADING';
export const PRODUCTCONFIRMLOADING = 'PRODUCTCONFIRMLOADING'
export const PRODUCTMODLENAME = 'PRODUCTMODLENAME';
export const PRODUCTMODELTITLE = 'PRODUCTMODELTITLE';
export const PRODUCTMODELDATA = 'PRODUCTMODELDATA';
export const PRODUCTCHECKLISTCOL = 'PRODUCTCHECKLISTCOL';
export const PRODUCTALLCHECKCOL = 'PRODUCTALLCHECKCOL';
export const PRODUCTPAGESIZE = 'PRODUCTPAGESIZE';  
export const PRODUCTPAGETOTAL = 'PRODUCTPAGETOTAL'//总页数
export const PRODUCTPAGENOW = 'PRODUCTPAGENOW';  //当前页数
export const PRODUCTPAGESORT = 'PRODUCTPAGESORT';  //排序
export const PRODUCTPAGESORTCOL = 'PRODUCTPAGESORTCOL'; // 排序字段
export const PRODUCTSEARCHTYPE = 'PRODUCTSEARCHTYPE'; //搜索类型
export const PRODUCTSEARCHVALUE = 'PRODUCTSEARCHVALUE'; //搜索内容
export const PRODUCTYPELIST = 'PRODUCTTYPELIST' //产品类别

// 弹出框状态
export function productModleState(data) {
  return {
    type: PRODUCTMODELSTATE,
    data
  }
}
// 弹出框名称
export function productModleName(data) {
  return {
    type: PRODUCTMODLENAME,
    data
  }
}
export function productModleTitle(data) {
  return {
    type: PRODUCTMODELTITLE,
    data
  }
}
// 列表loading
export function productDataLoading(data) {
  return {
    type: PRODUCTACCOUNTLOADING,
    data
  }
}
// 提交loading
export function productConfirmLoading(data) {
  return {
    type: PRODUCTCONFIRMLOADING,
    data
  }
}
// 列表中的用户信息
export function productData(data) {
  return {
    type: PRODUCTACCOUNTDATA,
    data
  }
}
// 列表中的用户信息
export function productModelData(data) {
  return {
    type: PRODUCTMODELDATA,
    data
  }
}

// 所有列 数组
export function productAllCheckCols(data){
  return {
    type: PRODUCTALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function productCheckListCol(data){
  return {
    type: PRODUCTCHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function productPageSize(data){
  return {
    type: PRODUCTPAGESIZE,
    data
  }
}
// 总页数
export function productPageTotal(data){
  return {
    type: PRODUCTPAGETOTAL,
    data
  }
}
// 当前页数
export function productPageNow(data){
  return {
    type: PRODUCTPAGENOW,
    data
  }
}
// 排序
export function productPageSort(data){
  return {
    type: PRODUCTPAGESORT,
    data
  }
}
// 排序字段
export function productPageSortCol(data){
  return {
    type: PRODUCTPAGESORTCOL,
    data
  }
}
// 搜索内容
export function productSearchValue(data) {
  return {
    type: PRODUCTSEARCHVALUE,
    data
  }
}
// 
export function productSearchType(data) {
  return {
    type: PRODUCTSEARCHTYPE,
    data
  }
}
// 
export function productTypeList(data) {
  return {
    type: PRODUCTYPELIST,
    data
  }
}



