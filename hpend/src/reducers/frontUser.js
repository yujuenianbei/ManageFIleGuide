import {
  FRONTUSERMODELSTATE,
  FRONTUSERDATA,
  FRONTUSERLOADING,
  FRONTUSERMODLENAME,
  FRONTUSERMODELTITLE,
  FRONTUSERMODELDATA,
  FRONTUSERCONFIRMLOADING,
  FRONTUSERCHECKLISTCOL,
  FRONTUSERALLCHECKCOL,
  FRONTUSERPAGESIZE,
  FRONTUSERPAGETOTAL,
  FRONTUSERPAGENOW,
  FRONTUSERPAGESORT,
  FRONTUSERPAGESORTCOL,
  FRONTUSERSEARCHVALUE,
  FRONTUSERSEARCHTYPE
} from '../actions/index'

const initValue = {
  confirmLoading: false,
  modelName: '',
  modelTitle: '',
  modelState: false,
  modelData: '',
  frontUserLoading: false,
  frontUserData: [],
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
    case FRONTUSERMODELSTATE: {
      return Object.assign({}, state, { modelState: data })
    }
    case FRONTUSERMODLENAME: {
      return Object.assign({}, state, { modelName: data })
    }
    case FRONTUSERMODELTITLE: {
      return Object.assign({}, state, { modelTitle: data })
    }
    case FRONTUSERMODELDATA: {
      return Object.assign({}, state, { modelData: data })
    }
    case FRONTUSERDATA: {
      return Object.assign({}, state, { frontUserData: data })
    }
    case FRONTUSERLOADING: {
      return Object.assign({}, state, { frontUserLoading: data })
    }
    case FRONTUSERCONFIRMLOADING: {
      return Object.assign({}, state, { confirmLoading: data })
    }
    case FRONTUSERCHECKLISTCOL: {
      return Object.assign({}, state, { checkListCol: data })
    }
    case FRONTUSERALLCHECKCOL: {
      return Object.assign({}, state, { allCheckcols: data })
    }
    case FRONTUSERPAGESIZE: {
      return Object.assign({}, state, { pageSize: data })
    }
    case FRONTUSERPAGENOW: {
      return Object.assign({}, state, { pageNow: data })
    }
    case FRONTUSERPAGETOTAL: {
      return Object.assign({}, state, { pageTotal: data })
    }
    case FRONTUSERPAGESORT: {
      return Object.assign({}, state, { pageSort: data })
    }
    case FRONTUSERPAGESORTCOL: {
      return Object.assign({}, state, { pageSortCol: data })
    }
    case FRONTUSERSEARCHVALUE: {
      return Object.assign({}, state, { searchValue: data })
    }
    case FRONTUSERSEARCHTYPE: {
      return Object.assign({}, state, { searchType: data })
    }
    default: {
      return state;
    }
  }
}