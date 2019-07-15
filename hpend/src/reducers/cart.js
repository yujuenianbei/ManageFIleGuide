import {
    CARTMODELSTATE,
    CARTACCOUNTDATA,
    CARTACCOUNTLOADING,
    CARTMODLENAME,
    CARTMODELTITLE,
    CARTMODELDATA,
    CARTCONFIRMLOADING,
    CARTCHECKLISTCOL,
    CARTALLCHECKCOL,
    CARTPAGESIZE,
    CARTPAGETOTAL,
    CARTPAGENOW,
    CARTPAGESORT,
    CARTPAGESORTCOL,
    CARTSEARCHVALUE,
    CARTSEARCHTYPE,
    CARTYPELIST
} from '../actions/index'

const initValue = {
    confirmLoading: false,
    modelName: '',
    modelTitle: '',
    modelState: false,
    modelData: '',
    cartLoading: false,
    cartData: [],
    pageTotal: 10,
    pageSize: 10,
    pageNow: 0,
    pageSort: 'ASC',
    pageSortCol: 'sex',
    searchValue: '',
    searchType: '',
    cartTypeList: [],
    checkListCol: ['产品名称', '封面', '现价'],
    allCheckcols: ['邮箱', '区号', '电话', '产品名称', '类别', '封面', '配置参数', '促销信息1', '促销信息2', '原价', '现价', '创建时间', '更新时间']
}
export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
        case CARTMODELSTATE: {
            return Object.assign({}, state, { modelState: data })
        }
        case CARTMODLENAME: {
            return Object.assign({}, state, { modelName: data })
        }
        case CARTMODELTITLE: {
            return Object.assign({}, state, { modelTitle: data })
        }
        case CARTMODELDATA: {
            return Object.assign({}, state, { modelData: data })
        }
        case CARTACCOUNTDATA: {
            return Object.assign({}, state, { cartData: data })
        }
        case CARTACCOUNTLOADING: {
            return Object.assign({}, state, { cartLoading: data })
        }
        case CARTCONFIRMLOADING: {
            return Object.assign({}, state, { confirmLoading: data })
        }
        case CARTCHECKLISTCOL: {
            return Object.assign({}, state, { checkListCol: data })
        }
        case CARTALLCHECKCOL: {
            return Object.assign({}, state, { allCheckcols: data })
        }
        case CARTPAGESIZE: {
            return Object.assign({}, state, { pageSize: data })
        }
        case CARTPAGENOW: {
            return Object.assign({}, state, { pageNow: data })
        }
        case CARTPAGETOTAL: {
            return Object.assign({}, state, { pageTotal: data })
        }
        case CARTPAGESORT: {
            return Object.assign({}, state, { pageSort: data })
        }
        case CARTPAGESORTCOL: {
            return Object.assign({}, state, { pageSortCol: data })
        }
        case CARTSEARCHVALUE: {
            return Object.assign({}, state, { searchValue: data })
        }
        case CARTSEARCHTYPE: {
            return Object.assign({}, state, { searchType: data })
        }
        case CARTYPELIST: {
            return Object.assign({}, state, { cartTypeList: data })
        }
        default: {
            return state;
        }
    }
}