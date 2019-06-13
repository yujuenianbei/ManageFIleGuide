export const SORTFILTER = 'SORTFILTER';
export const SORTFILTERNAME = 'SORTFILTERNAME';
// 购物车的产品数量
export function productSortFilter(data) {
  return {
    type: SORTFILTER,
    data
  }
}
// 购物车的产品数量
export function productSortFilterName(data) {
  return {
    type: SORTFILTERNAME,
    data
  }
}