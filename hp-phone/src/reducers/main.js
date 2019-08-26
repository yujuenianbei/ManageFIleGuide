import {
  LOADING,
  OFFLINE,
  OFFLINENOTE,
  LOADINGHEADER,
  SEARCHBARSTATE,
  DRAWERSTATE,
} from '../actions/index'

const initValue = {
  headerLoading: false,
  loading: false,
  offline: false,
  offlineNote: false,
  searchbar: false,
  drawer: false,
}
export default (state = initValue, action) => {
  const data = action.data
  switch (action.type) {
    case LOADING: {
      return Object.assign({}, state, { loading: data })
    }
    case LOADINGHEADER: {
      return Object.assign({}, state, { headerLoading: data })
    }
    case OFFLINE: {
      return Object.assign({}, state, { offline: data })
    }
    case OFFLINENOTE: {
      return Object.assign({}, state, { offlineNote: data })
    }
    case SEARCHBARSTATE: {
      return Object.assign({}, state, { searchbar: data })
    }
    case DRAWERSTATE: {
      return Object.assign({}, state, { drawer: data })
    }
    default: {
      return state;
    }
  }
}