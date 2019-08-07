export const SETTINGMODEL = 'SETTINGMODEL';
export const SETTINGHEADER = 'SETTINGHEADER';  //headerFix
export const SETTINGCOLLAPSED = 'SETTINGCOLLAPSED'; //leftCollapsed
export const SETTINGLEFTFIX = 'SETTINGLEFTFIX'; //leftFix
export const SETTINGMENUTHEME = 'SETTINGMENUTHEME'; //leftFix
export const SETTINGTHEMECOLOR = 'SETTINGTHEMECOLOR'; // themeColor
// 展开设置窗口
export function settingModel(data) {
  return {
    type: SETTINGMODEL,
    data
  }
}

// 固定头部
export function settingHeader(data) {
  return {
    type: SETTINGHEADER,
    data
  }
}

// 收起/展开菜单
export function settingCollapsed(data) {
  return {
    type: SETTINGCOLLAPSED,
    data
  }
}

// 固定侧边栏
export function settingLeftFix(data) {
  return {
    type: SETTINGLEFTFIX,
    data
  }
}

// 菜单主题
export function settingMenuTheme(data) {
  return {
    type: SETTINGMENUTHEME,
    data
  }
}

// 菜单主题
export function settingThemeColor(data) {
  return {
    type: SETTINGTHEMECOLOR,
    data
  }
}



