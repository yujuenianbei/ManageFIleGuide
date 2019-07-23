export const PRODUCTINFO = 'PRODUCTINFO';
export const PRODUCTNUM = 'PRODUCTNUM';
export const USERINFO = 'USERINFO';
export const CARTERROR = 'CARTERROR';
export const MESSAGEPRODUCT = 'MESSAGEPRODUCT';
export const MESSAGEEXPRESS = 'MESSAGEEXPRESS';
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

// 购物车中的用户信息
export function userinfoInCart(data) {
  return {
    type: USERINFO,
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
