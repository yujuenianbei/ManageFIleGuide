import {
    SETTINGMODEL,
    SETTINGHEADER,
    SETTINGCOLLAPSED,
    SETTINGLEFTFIX,
    SETTINGMENUTHEME,
    SETTINGTHEMECOLOR
} from '../actions/index'
const initValue = {
    modelState: false,
    fixHeader: false,
    leftCollapsed: false,
    leftFix: false,
    menuTheme: "dark",
    themeColor: 'rgb(24, 144, 255)'
}
export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
        case SETTINGMODEL: {
            return Object.assign({}, state, { modelState: data })
        }
        case SETTINGHEADER: {
            return Object.assign({}, state, { fixHeader: data })
        }
        case SETTINGCOLLAPSED: {
            return Object.assign({}, state, { leftCollapsed: data })
        }
        case SETTINGLEFTFIX: {
            return Object.assign({}, state, { leftFix: data })
        }
        case SETTINGMENUTHEME: {
            return Object.assign({}, state, { menuTheme: data })
        }
        case SETTINGTHEMECOLOR: {
            return Object.assign({}, state, { themeColor: data })
        }
        default: {
            return state;
        }
    }
}