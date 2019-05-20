export const PRODUCTINFO = 'PRODUCTINFO';
export const PRODUCTNUM = 'PRODUCTNUM';
export const USERINFO = 'USERINFO';
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
