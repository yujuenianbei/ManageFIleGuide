export const PRODUCTINFO = 'PRODUCTINFO';
export const PRODUCTNUM = 'PRODUCTNUM';
export const CARTTOORDER = 'CARTTOORDER';
export const CARTTOORDERITEM = 'CARTTOORDERITEM';
export const CARTERROR = 'CARTERROR';
export const MESSAGEPRODUCT = 'MESSAGEPRODUCT';
export const MESSAGEEXPRESS = 'MESSAGEEXPRESS';
export const CARTDELIVERYLIST = 'CARTDELIVERYLIST';
export const CARTCOUNTPRICE = 'CARTCOUNTPRICE';
// 购物车的产品数量
export function productNumInCart(data) {
    return {
      type: PRODUCTNUM,
      data
    }
  }
// 购物车的产品信息
export function productInCart(data) {
  return {
    type: PRODUCTINFO,
    data
  }
}

// 购物车中的订单产品
export function cartToOrder(data) {
  return {
    type: CARTTOORDER,
    data
  }
}
// 购物车中的订单产品index
export function cartToOrderItem(data) {
  return {
    type: CARTTOORDERITEM,
    data
  }
}


// 修改错误提示状态
export function cartError(data) {
  return {
    type: CARTERROR,
    data
  }
}

// 修改产品错误信息
export function messageInProduct(data) {
  return {
    type: MESSAGEPRODUCT,
    data
  }
}

// 修改配送错误提示
export function messageInExpress(data) {
  return {
    type: MESSAGEEXPRESS,
    data
  }
}

// 配送方式
export function cartDeliveryList(data) {
  return {
    type: CARTDELIVERYLIST,
    data
  }
}

// 配送方式
export function cartCountPrice(data) {
  return {
    type: CARTCOUNTPRICE,
    data
  }
}
