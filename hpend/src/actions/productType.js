export const PRODUCTTYPEMODELSTATE = 'PRODUCTTYPEMODLESTATE';
export const PRODUCTTYPEACCOUNTDATA = 'PRODUCTTYPEACCOUNTDATA';
export const PRODUCTTYPEACCOUNTLOADING = 'PRODUCTTYPEACCOUNTLOADING';
export const PRODUCTTYPECONFIRMLOADING = 'PRODUCTTYPECONFIRMLOADING'
export const PRODUCTTYPEMODLENAME = 'PRODUCTTYPEMODLENAME';
export const PRODUCTTYPEMODELTITLE = 'PRODUCTTYPEMODELTITLE';
export const PRODUCTTYPEMODELDATA = 'PRODUCTTYPEMODELDATA';
export const PRODUCTTYPECHECKLISTCOL = 'PRODUCTTYPECHECKLISTCOL';
export const PRODUCTTYPEALLCHECKCOL = 'PRODUCTTYPEALLCHECKCOL';
export const PRODUCTTYPEPAGESIZE = 'PRODUCTTYPEPAGESIZE';  
export const PRODUCTTYPEPAGETOTAL = 'PRODUCTTYPEPAGETOTAL'//总页数
export const PRODUCTTYPEPAGENOW = 'PRODUCTTYPEPAGENOW';  //当前页数
export const PRODUCTTYPEPAGESORT = 'PRODUCTTYPEPAGESORT';  //排序
export const PRODUCTTYPEPAGESORTCOL = 'PRODUCTTYPEPAGESORTCOL'; // 排序字段
export const PRODUCTTYPESEARCHTYPE = 'PRODUCTTYPESEARCHTYPE'; //搜索类型
export const PRODUCTTYPESEARCHVALUE = 'PRODUCTTYPESEARCHVALUE'; //搜索内容

// 弹出框状态
export function productTypeModleState(data) {
  return {
    type: PRODUCTTYPEMODELSTATE,
    data
  }
}
// 弹出框名称
export function productTypeModleName(data) {
  return {
    type: PRODUCTTYPEMODLENAME,
    data
  }
}
export function productTypeModleTitle(data) {
  return {
    type: PRODUCTTYPEMODELTITLE,
    data
  }
}
// 列表loading
export function productTypeDataLoading(data) {
  return {
    type: PRODUCTTYPEACCOUNTLOADING,
    data
  }
}
// 提交loading
export function productTypeConfirmLoading(data) {
  return {
    type: PRODUCTTYPECONFIRMLOADING,
    data
  }
}
// 列表中的用户信息
export function productTypeData(data) {
  return {
    type: PRODUCTTYPEACCOUNTDATA,
    data
  }
}
// 列表中的用户信息
export function productTypeModelData(data) {
  return {
    type: PRODUCTTYPEMODELDATA,
    data
  }
}

// 所有列 数组
export function productTypeAllCheckCols(data){
  return {
    type: PRODUCTTYPEALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function productTypeCheckListCol(data){
  return {
    type: PRODUCTTYPECHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function productTypePageSize(data){
  return {
    type: PRODUCTTYPEPAGESIZE,
    data
  }
}
// 总页数
export function productTypePageTotal(data){
  return {
    type: PRODUCTTYPEPAGETOTAL,
    data
  }
}
// 当前页数
export function productTypePageNow(data){
  return {
    type: PRODUCTTYPEPAGENOW,
    data
  }
}
// 排序
export function productTypePageSort(data){
  return {
    type: PRODUCTTYPEPAGESORT,
    data
  }
}
// 排序字段
export function productTypePageSortCol(data){
  return {
    type: PRODUCTTYPEPAGESORTCOL,
    data
  }
}
// 搜索内容
export function productTypeSearchValue(data) {
  return {
    type: PRODUCTTYPESEARCHVALUE,
    data
  }
}
// 
export function productTypeSearchType(data) {
  return {
    type: PRODUCTTYPESEARCHTYPE,
    data
  }
}



