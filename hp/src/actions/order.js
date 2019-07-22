export const ORDERADDRESS = 'ORDERADDRESS';
export const ORDERADDRESSITEM = 'ORDERADDRESSITEM';
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