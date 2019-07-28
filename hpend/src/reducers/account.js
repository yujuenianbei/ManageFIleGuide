import {
  ACCOUNTMODELSTATE,
  ACCOUNTDATA,
  ACCOUNTLOADING,
  ACCOUNTMODLENAME,
  ACCOUNTMODELTITLE,
  ACCOUNTMODELDATA,
  ACCOUNTCONFIRMLOADING,
  ACCOUNTCHECKLISTCOL,
  ACCOUNTALLCHECKCOL,
  ACCOUNTPAGESIZE,
  ACCOUNTPAGETOTAL,
  ACCOUNTPAGENOW,
  ACCOUNTPAGESORT,
  ACCOUNTPAGESORTCOL,
  ACCOUNTSEARCHVALUE,
  ACCOUNTSEARCHTYPE
} from '../actions/index'

const initValue = {
  confirmLoading: false,
  modelName: '',
  modelTitle: '',
  modelState: false,
  modelData: '',
  accountLoading: false,
  accountData: [],
  pageTotal: 10,
  pageSize: 10,
  pageNow: 0,
  pageSort: 'ASC',
  pageSortCol: 'sex',
  searchValue: '',
  searchType: '',
  checkListCol: ['性别', '邮箱'],
  allCheckcols: ['性别', '邮箱', '名', '姓', '区号', '电话', '公司', '密码']
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case ACCOUNTMODELSTATE: {
      return Object.assign({}, state, { modelState: data })
    }
    case ACCOUNTMODLENAME: {
      return Object.assign({}, state, { modelName: data })
    }
    case ACCOUNTMODELTITLE: {
      return Object.assign({}, state, { modelTitle: data })
    }
    case ACCOUNTMODELDATA: {
      return Object.assign({}, state, { modelData: data })
    }
    case ACCOUNTDATA: {
      return Object.assign({}, state, { accountData: data })
    }
    case ACCOUNTLOADING: {
      return Object.assign({}, state, { accountLoading: data })
    }
    case ACCOUNTCONFIRMLOADING: {
      return Object.assign({}, state, { confirmLoading: data })
    }
    case ACCOUNTCHECKLISTCOL: {
      return Object.assign({}, state, { checkListCol: data })
    }
    case ACCOUNTALLCHECKCOL: {
      return Object.assign({}, state, { allCheckcols: data })
    }
    case ACCOUNTPAGESIZE: {
      return Object.assign({}, state, { pageSize: data })
    }
    case ACCOUNTPAGENOW: {
      return Object.assign({}, state, { pageNow: data })
    }
    case ACCOUNTPAGETOTAL: {
      return Object.assign({}, state, { pageTotal: data })
    }
    case ACCOUNTPAGESORT: {
      return Object.assign({}, state, { pageSort: data })
    }
    case ACCOUNTPAGESORTCOL: {
      return Object.assign({}, state, { pageSortCol: data })
    }
    case ACCOUNTSEARCHVALUE: {
      return Object.assign({}, state, { searchValue: data })
    } 
    case ACCOUNTSEARCHTYPE: {
      return Object.assign({}, state, { searchType: data }) 
    }
    default: {
      return state;
    }
  }
}