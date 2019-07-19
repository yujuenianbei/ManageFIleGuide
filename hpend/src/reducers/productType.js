import {
    PRODUCTTYPEMODELSTATE,
    PRODUCTTYPEACCOUNTDATA,
    PRODUCTTYPEACCOUNTLOADING,
    PRODUCTTYPEMODLENAME,
    PRODUCTTYPEMODELTITLE,
    PRODUCTTYPEMODELDATA,
    PRODUCTTYPECONFIRMLOADING,
    PRODUCTTYPECHECKLISTCOL,
    PRODUCTTYPEALLCHECKCOL,
    PRODUCTTYPEPAGESIZE,
    PRODUCTTYPEPAGETOTAL,
    PRODUCTTYPEPAGENOW,
    PRODUCTTYPEPAGESORT,
    PRODUCTTYPEPAGESORTCOL,
    PRODUCTTYPESEARCHVALUE,
    PRODUCTTYPESEARCHTYPE,
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
    checkListCol: [],
    typeAllCheckcols: ['创建时间', '更新时间']
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case PRODUCTTYPEMODELSTATE: {
        return Object.assign({}, state, { modelState: data })
      }
      case PRODUCTTYPEMODLENAME: {
        return Object.assign({}, state, { modelName: data })
      }
      case PRODUCTTYPEMODELTITLE: {
        return Object.assign({}, state, { modelTitle: data })
      }
      case PRODUCTTYPEMODELDATA: {
        return Object.assign({}, state, { modelData: data })
      }
      case PRODUCTTYPEACCOUNTDATA: {
        return Object.assign({}, state, { productData: data })
      }
      case PRODUCTTYPEACCOUNTLOADING: {
        return Object.assign({}, state, { productLoading: data })
      }
      case PRODUCTTYPECONFIRMLOADING: {
        return Object.assign({}, state, { confirmLoading: data })
      }
      case PRODUCTTYPECHECKLISTCOL: {
        return Object.assign({}, state, { checkListCol: data })
      }
      case PRODUCTTYPEALLCHECKCOL: {
        return Object.assign({}, state, { typeAllCheckcols: data })
      }
      case PRODUCTTYPEPAGESIZE: {
        return Object.assign({}, state, { pageSize: data })
      }
      case PRODUCTTYPEPAGENOW: {
        return Object.assign({}, state, { pageNow: data })
      }
      case PRODUCTTYPEPAGETOTAL: {
        return Object.assign({}, state, { pageTotal: data })
      }
      case PRODUCTTYPEPAGESORT: {
        return Object.assign({}, state, { pageSort: data })
      }
      case PRODUCTTYPEPAGESORTCOL: {
        return Object.assign({}, state, { pageSortCol: data })
      }
      case PRODUCTTYPESEARCHVALUE: {
        return Object.assign({}, state, { searchValue: data })
      }
      case PRODUCTTYPESEARCHTYPE: {
        return Object.assign({}, state, { searchType: data })
      }
      default: {
        return state;
      }
    }
  }