export const ORDERMODELSTATE = 'ORDERMODLESTATE';
export const ORDERACCOUNTDATA = 'ORDERACCOUNTDATA';
export const ORDERACCOUNTLOADING = 'ORDERACCOUNTLOADING';
export const ORDERCONFIRMLOADING = 'ORDERCONFIRMLOADING'
export const ORDERMODLENAME = 'ORDERMODLENAME';
export const ORDERMODELTITLE = 'ORDERMODELTITLE';
export const ORDERMODELDATA = 'ORDERMODELDATA';
export const ORDERCHECKLISTCOL = 'ORDERCHECKLISTCOL';
export const ORDERALLCHECKCOL = 'ORDERALLCHECKCOL';
export const ORDERPAGESIZE = 'ORDERPAGESIZE';  
export const ORDERPAGETOTAL = 'ORDERPAGETOTAL'//总页数
export const ORDERPAGENOW = 'ORDERPAGENOW';  //当前页数
export const ORDERPAGESORT = 'ORDERPAGESORT';  //排序
export const ORDERPAGESORTCOL = 'ORDERPAGESORTCOL'; // 排序字段
export const ORDERSEARCHTYPE = 'ORDERSEARCHTYPE'; //搜索类型
export const ORDERSEARCHVALUE = 'ORDERSEARCHVALUE'; //搜索内容
export const ORDERYPELIST = 'ORDERTYPELIST' //产品类别
export const ORDERADDRESS = 'ORDERADDRESS' //收货地址
export const ORDEREDIT = 'ORDEREDIT' // 编辑状态（所有）
export const ORDEREXCHANGE = 'ORDEREXCHANGE' // 切换状态（所有）
export const ORDERUSERALLADDRESS = 'ORDERUSERALLADDRESS' // 用户所有的收货地址
export const ORDERADDRESSITEM = 'ORDERADDRESSITEM' //选择的第几个地址在订单中
// 弹出框状态
export function orderModleState(data) {
  return {
    type: ORDERMODELSTATE,
    data
  }
}
// 弹出框名称
export function orderModleName(data) {
  return {
    type: ORDERMODLENAME,
    data
  }
}
export function orderModleTitle(data) {
  return {
    type: ORDERMODELTITLE,
    data
  }
}
// 列表loading
export function orderDataLoading(data) {
  return {
    type: ORDERACCOUNTLOADING,
    data
  }
}
// 提交loading
export function orderConfirmLoading(data) {
  return {
    type: ORDERCONFIRMLOADING,
    data
  }
}
// 列表中的用户信息
export function orderData(data) {
  return {
    type: ORDERACCOUNTDATA,
    data
  }
}
// 列表中的用户信息
export function orderModelData(data) {
  return {
    type: ORDERMODELDATA,
    data
  }
}

// 所有列 数组
export function orderAllCheckCols(data){
  return {
    type: ORDERALLCHECKCOL,
    data
  }
}
// 选择列 数组
export function orderCheckListCol(data){
  return {
    type: ORDERCHECKLISTCOL,
    data
  }
}
// 每页显示条数
export function orderPageSize(data){
  return {
    type: ORDERPAGESIZE,
    data
  }
}
// 总页数
export function orderPageTotal(data){
  return {
    type: ORDERPAGETOTAL,
    data
  }
}
// 当前页数
export function orderPageNow(data){
  return {
    type: ORDERPAGENOW,
    data
  }
}
// 排序
export function orderPageSort(data){
  return {
    type: ORDERPAGESORT,
    data
  }
}
// 排序字段
export function orderPageSortCol(data){
  return {
    type: ORDERPAGESORTCOL,
    data
  }
}
// 搜索内容
export function orderSearchValue(data) {
  return {
    type: ORDERSEARCHVALUE,
    data
  }
}
// 
export function orderSearchType(data) {
  return {
    type: ORDERSEARCHTYPE,
    data
  }
}
// 
export function orderTypeList(data) {
  return {
    type: ORDERYPELIST,
    data
  }
}
// 用户收货地址
export function orderAddress(data) {
  return {
    type: ORDERADDRESS,
    data
  }
}

// 编辑状态
export function orderEdit(data) {
  return {
    type: ORDEREDIT,
    data
  }
}

// 切换状态
export function orderExchange(data) {
  return {
    type: ORDEREXCHANGE,
    data
  }
}

//查询用户的所有收货地址
export function orderUserAllAddress(data) {
  return {
    type: ORDERUSERALLADDRESS,
    data
  }
} 
//查询用户的所有收货地址
export function orderAddressItem(data) {
  return {
    type: ORDERADDRESSITEM,
    data
  }
} 






