export const ORDERADDRESS = 'ORDERADDRESS';
export const ORDERADDRESSITEM = 'ORDERADDRESSITEM';
export const ORDERPAYMENTMETHOD = 'ORDERPAYMENTMETHOD';
export const ORDERPRODUCTLIST = 'ORDERPRODUCTLIST';
export const ORDERDELIVERY = 'ORDERDELIVERY';
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