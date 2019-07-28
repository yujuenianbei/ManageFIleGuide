export const ORDERADDRESS = 'ORDERADDRESS';
export const ORDERADDRESSITEM = 'ORDERADDRESSITEM';
export const ORDERPAYMENTMETHOD = 'ORDERPAYMENTMETHOD';
export const ORDERPRODUCTLIST = 'ORDERPRODUCTLIST';
export const ORDERDELIVERY = 'ORDERDELIVERY';
export const ORDERPRODUCT = 'ORDERPRODUCT';
export const ORDERTOTALCOST = 'ORDERTOTALCOST';
export const ORDERERROR = 'ORDERERROR';
export const MESSAGEADDRESS = 'MESSAGEADDRESS';
export const MESSAGEPAYMENT = 'MESSAGEPAYMENT';



// 用户所有的收货地址
export function orderProducts(data) {
  return {
    type: ORDERPRODUCT,
    data
  }
}
// 用户所有的收货地址
export function orderAddress(data) {
  return {
    type: ORDERADDRESS,
    data
  }
}

// 用户选择的收货地址
export function orderAddressItem(data) {
  return {
    type: ORDERADDRESSITEM,
    data
  }
}

// 用户选择的支付方式
export function orderPaymentMethod(data) {
  return {
    type: ORDERPAYMENTMETHOD,
    data
  }
}

// 用户选择的支付方式
export function orderProductList(data) {
  return {
    type: ORDERPRODUCTLIST,
    data
  }
}


// 用户选择的配送方式
export function orderDelivery(data) {
  return {
    type: ORDERDELIVERY,
    data
  }
}

// 总价
export function orderTotalCost(data) {
  return {
    type: ORDERTOTALCOST,
    data
  }
}

// 修改错误提示状态
export function orderError(data) {
  return {
    type: ORDERERROR,
    data
  }
}

// 详细地址错误信息
export function messageInAddress(data) {
  return {
    type: MESSAGEADDRESS,
    data
  }
}

// 支付方式错误提示
export function messageInPayment(data) {
  return {
    type: MESSAGEPAYMENT,
    data
  }
}