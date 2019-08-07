import {
    ORDERMODELSTATE,
    ORDERACCOUNTDATA,
    ORDERACCOUNTLOADING,
    ORDERMODLENAME,
    ORDERMODELTITLE,
    ORDERMODELDATA,
    ORDERCONFIRMLOADING,
    ORDERCHECKLISTCOL,
    ORDERALLCHECKCOL,
    ORDERPAGESIZE,
    ORDERPAGETOTAL,
    ORDERPAGENOW,
    ORDERPAGESORT,
    ORDERPAGESORTCOL,
    ORDERSEARCHVALUE,
    ORDERSEARCHTYPE,
    ORDERYPELIST,
    ORDERADDRESS,
    ORDEREDIT,
    ORDEREXCHANGE,
    ORDERUSERALLADDRESS,
    ORDERADDRESSITEM
} from '../actions/index'
import { object } from 'prop-types';

const initValue = {
    confirmLoading: false,
    modelName: '',
    modelTitle: '',
    modelState: false,
    modelData: '',
    orderLoading: false,
    orderData: [],
    orderEdit: false,
    orderExchange: false,
    orderAddress: {},
    orderUserALLaddress: [],
    orderAddressItem: '',
    pageTotal: 10,
    pageSize: 10,
    pageNow: 0,
    pageSort: 'DESC',
    pageSortCol: 'sex',
    searchValue: '',
    searchType: '',
    orderTypeList: [],
    checkListCol: ['订单号', '支付方式', '快递名称', '快递单号', '收货地址', '总价', '订单状态', '产品名称', '封面', '数量'],
    allCheckcols: ['邮箱', '区号', '电话', '订单号', '支付方式', '支付时间', '支付状态', '快递名称', '期望时间', '快递单号', '收货地址', '总价', '订单状态', '创建时间', '更新时间', '产品名称', '类别', '封面', '原价', '现价', '数量']
}
export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
        case ORDERMODELSTATE: {
            return Object.assign({}, state, { modelState: data })
        }
        case ORDERMODLENAME: {
            return Object.assign({}, state, { modelName: data })
        }
        case ORDERMODELTITLE: {
            return Object.assign({}, state, { modelTitle: data })
        }
        case ORDERMODELDATA: {
            return Object.assign({}, state, { modelData: data })
        }
        case ORDERACCOUNTDATA: {
            return Object.assign({}, state, { orderData: data })
        }
        case ORDERACCOUNTLOADING: {
            return Object.assign({}, state, { orderLoading: data })
        }
        case ORDERCONFIRMLOADING: {
            return Object.assign({}, state, { confirmLoading: data })
        }
        case ORDERCHECKLISTCOL: {
            return Object.assign({}, state, { checkListCol: data })
        }
        case ORDERALLCHECKCOL: {
            return Object.assign({}, state, { allCheckcols: data })
        }
        case ORDERPAGESIZE: {
            return Object.assign({}, state, { pageSize: data })
        }
        case ORDERPAGENOW: {
            return Object.assign({}, state, { pageNow: data })
        }
        case ORDERPAGETOTAL: {
            return Object.assign({}, state, { pageTotal: data })
        }
        case ORDERPAGESORT: {
            return Object.assign({}, state, { pageSort: data })
        }
        case ORDERPAGESORTCOL: {
            return Object.assign({}, state, { pageSortCol: data })
        }
        case ORDERSEARCHVALUE: {
            return Object.assign({}, state, { searchValue: data })
        }
        case ORDERSEARCHTYPE: {
            return Object.assign({}, state, { searchType: data })
        }
        case ORDERYPELIST: {
            return Object.assign({}, state, { orderTypeList: data })
        }
        case ORDERADDRESS: {
            return Object.assign({}, state, { orderAddress: data })
        }
        case ORDEREDIT: {
            return Object.assign({}, state, { orderEdit: data })
        }
        case ORDEREXCHANGE: {
            return Object.assign({}, state, { orderExchange: data })
        }
        case ORDERUSERALLADDRESS: {
            return Object.assign({}, state, { orderUserALLaddress: data })
        }
        case ORDERADDRESSITEM: {
            return Object.assign({}, state, { orderAddressItem: data })
        }
        default: {
            return state;
        }
    }
}