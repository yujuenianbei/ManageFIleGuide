import {
  LEFT_LOADING,
    COLLAPSED,
    LINK,
    INDEX,
    LEFT_LIST
  } from './action'
  
  const initValue = {
    leftLoading: false,
    collapsed: false,
    index: 0,
    link: '/',
    leftList: []
  }
  export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
      case COLLAPSED: {
        return Object.assign({}, state, {collapsed: data})
      }
      case LINK: {
        return Object.assign({}, state, {link: data})
      }
      case INDEX: {
        return Object.assign({}, state, {index: data})
      }
      case LEFT_LIST: {
        return Object.assign({}, state, {leftList: data})
      }
      case LEFT_LOADING: {
        return Object.assign({}, state, {leftLoading: data})
      }
      default: {
        return state;
      }
    }
  }