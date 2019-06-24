import {
  MODELSTATE,
  ACCOUNTDATA,
  ACCOUNTLOADING,
  MODLENAME,
  MODELTITLE,
  MODELDATA,
  CONFIRMLOADING,
  CHECKLISTCOL,
  ALLCHECKCOL,
  PAGESIZE
} from '../actions/index'

const initValue = {
  confirmLoading: false,
  modelName: '',
  modelTitle: '',
  modelState: false,
  modelData: '',
  accountLoading: false,
  accountData: [],
  pageSize: 10,
  checkListCol: ['性别', '邮箱'],
  allCheckcols: ['性别', '邮箱', '名', '姓', '区号', '电话', '公司', '密码']
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case MODELSTATE: {
      return Object.assign({}, state, { modelState: data })
    }
    case MODLENAME: {
      return Object.assign({}, state, { modelName: data })
    }
    case MODELTITLE: {
      return Object.assign({}, state, { modelTitle: data })
    }
    case MODELDATA: {
      return Object.assign({}, state, { modelData: data })
    }
    case ACCOUNTDATA: {
      return Object.assign({}, state, { accountData: data })
    }
    case ACCOUNTLOADING: {
      return Object.assign({}, state, { accountLoading: data })
    }
    case CONFIRMLOADING: {
      return Object.assign({}, state, { confirmLoading: data })
    }
    case CHECKLISTCOL: {
      return Object.assign({}, state, { checkListCol: data })
    }
    case ALLCHECKCOL: {
      return Object.assign({}, state, { allCheckcols: data })
    }
    case PAGESIZE: {
      return Object.assign({}, state, { pageSize: data })
    }
    default: {
      return state;
    }
  }
}