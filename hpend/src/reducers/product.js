import {
  PRODUCTMODELSTATE,
  PRODUCTACCOUNTDATA,
  PRODUCTACCOUNTLOADING,
  PRODUCTMODLENAME,
  PRODUCTMODELTITLE,
  PRODUCTMODELDATA,
  PRODUCTCONFIRMLOADING,
  PRODUCTCHECKLISTCOL,
  PRODUCTALLCHECKCOL,
  PRODUCTPAGESIZE,
  PRODUCTPAGETOTAL,
  PRODUCTPAGENOW,
  PRODUCTPAGESORT,
  PRODUCTPAGESORTCOL,
  PRODUCTSEARCHVALUE,
  PRODUCTSEARCHTYPE,
  PRODUCTYPELIST
} from '../actions/index'

const initValue = {
  confirmLoading: false,
  modelName: '',
  modelTitle: '',
  modelState: false,
  modelData: '',
  productLoading: false,
  productData: [],
  pageTotal: 10,
  pageSize: 10,
  pageNow: 0,
  pageSort: 'ASC',
  pageSortCol: 'sex',
  searchValue: '',
  searchType: '',
  productTypeList: [],
  checkListCol: ['类别', '封面', '现价'],
  allCheckcols: ['类别', '封面', '配置参数', '促销信息1', '促销信息2', '原价', '现价', '创建时间', '更新时间']
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case PRODUCTMODELSTATE: {
      return Object.assign({}, state, { modelState: data })
    }
    case PRODUCTMODLENAME: {
      return Object.assign({}, state, { modelName: data })
    }
    case PRODUCTMODELTITLE: {
      return Object.assign({}, state, { modelTitle: data })
    }
    case PRODUCTMODELDATA: {
      return Object.assign({}, state, { modelData: data })
    }
    case PRODUCTACCOUNTDATA: {
      return Object.assign({}, state, { productData: data })
    }
    case PRODUCTACCOUNTLOADING: {
      return Object.assign({}, state, { productLoading: data })
    }
    case PRODUCTCONFIRMLOADING: {
      return Object.assign({}, state, { confirmLoading: data })
    }
    case PRODUCTCHECKLISTCOL: {
      return Object.assign({}, state, { checkListCol: data })
    }
    case PRODUCTALLCHECKCOL: {
      return Object.assign({}, state, { allCheckcols: data })
    }
    case PRODUCTPAGESIZE: {
      return Object.assign({}, state, { pageSize: data })
    }
    case PRODUCTPAGENOW: {
      return Object.assign({}, state, { pageNow: data })
    }
    case PRODUCTPAGETOTAL: {
      return Object.assign({}, state, { pageTotal: data })
    }
    case PRODUCTPAGESORT: {
      return Object.assign({}, state, { pageSort: data })
    }
    case PRODUCTPAGESORTCOL: {
      return Object.assign({}, state, { pageSortCol: data })
    }
    case PRODUCTSEARCHVALUE: {
      return Object.assign({}, state, { searchValue: data })
    }
    case PRODUCTSEARCHTYPE: {
      return Object.assign({}, state, { searchType: data })
    }
    case PRODUCTYPELIST: {
      return Object.assign({}, state, { productTypeList: data })
    }
    default: {
      return state;
    }
  }
}