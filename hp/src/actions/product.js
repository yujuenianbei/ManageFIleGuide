export const PRODUCTIMG = 'PRODUCTIMG';
export const PRODUCTNAME = 'PRODUCTNAME';
export const PRODUCTFEATRUES = 'PRODUCTFEATRUES';
export const PRODUCTPROMOTIONMESSAGE = 'PRODUCTPROMOTIONMESSAGE';
export const PRODUCTPROMOTIONMESSAGESECOND = 'PRODUCTPROMOTIONMESSAGESECOND';
export const PRODUCTNOWPRICE = 'PRODUCTNOWPRICE';
export const PRODUCTUSEDPRICE = 'PRODUCTUSEDPRICE';
// 购物车的产品数量
export function productImg(data) {
    return {
      type: PRODUCTIMG,
      data
    }
  }
  // 购物车的产品数量
export function productName(data) {
    return {
      type: PRODUCTNAME,
      data
    }
  }
  // 购物车的产品数量
export function productFeatrues(data) {
    return {
      type: PRODUCTFEATRUES,
      data
    }
  }
  // 购物车的产品数量
export function productPromotionMessage(data) {
    return {
      type: PRODUCTPROMOTIONMESSAGE,
      data
    }
  }
  // 购物车的产品数量
export function productPromotionMessageSecond(data) {
    return {
      type: PRODUCTPROMOTIONMESSAGESECOND,
      data
    }
  }

    // 购物车的产品数量
export function productUsedPrice(data) {
    return {
      type: PRODUCTNOWPRICE,
      data
    }
  }
  // 购物车的产品数量
export function productNowPrice(data) {
    return {
      type: PRODUCTUSEDPRICE,
      data
    }
  }