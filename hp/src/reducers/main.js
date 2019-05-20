import {
    LOADING,
    OFFLINE,
    OFFLINENOTE
    } from '../actions/index'
    
    const initValue = {
        loading: false,
        offline: false,
        offlineNote: false
    }
    export default (state = initValue, action) => {
      const data = action.data
      switch (action.type) {
        case LOADING: {
          return Object.assign({}, state, {loading: data})
        }
        case OFFLINE: {
          return Object.assign({}, state, {offline: data})
        }
        case OFFLINENOTE: {
          return Object.assign({}, state, {offlineNote: data})
        }
        default: {
          return state;
        }
      }
    }