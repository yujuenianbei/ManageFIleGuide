export const USER_ADD_MODLE = 'USER_ADD_MODLE';
export const ADD_USER_LIST = 'ADD_LIST';
export const USER_LOADING = 'USER_LOADING';
export const USER_OPERATION_MODLE_NAME = 'USER_OPERATION_MODLE_NAME';
export const USER_MODLE_DATA = 'USER_MODLE_DATA';
export const USER_SEARCH_NAME = 'USER_SEARCH_NAME';
export const USER_SEARCH_LIST = 'USER_SEARCH_LIST';


export const SESSION = 'SESSION';
// 用户弹窗
export function session(data) {
  return {
    type: SESSION,
    data
  }
}

// 用户弹窗
export function UserModle(data) {
  return {
    type: USER_ADD_MODLE,
    data
  }
}

// 新增用户弹窗
export function modleName(data) {
  return {
    type: USER_OPERATION_MODLE_NAME,
    data
  }
}

// 用户数据
export function modleUserData(data) {
  return {
    type: USER_MODLE_DATA,
    data
  }
}

// loading 
export function userLoading(data) {
  return {
    type: USER_LOADING,
    data
  }
}
// 用户列表内容
export function addUserList(data) {
  return {
    type: ADD_USER_LIST,
    data
  }
}

// 搜索用户
export function searchUserName(data) {
  return {
    type: USER_SEARCH_NAME,
    data
  }
}

// 搜索后的用户列表
export function searchUserList(data) {
  return {
    type: USER_SEARCH_LIST,
    data
  }
}

export function getSearchUserList(data) {
  return (dispatch, getState) => {
    const userData = getState().userList.list.filter(item => {
      if (data !== '') {
        return item.user_name.indexOf(data) > -1;
      }
      return item;
    })
    dispatch(searchUserList(userData));
  }
}

let csvurl = ''
// 导出数据
export function exportCsv(params) {
  return (dispatch) => {
    fetch('/api/exportList', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: params
      })
    })
      .then((res) => {
        csvurl = res.headers.get('Content-fileName')
        return res.text()
      })
      .then((res) => {
        // react 下载文件
        const aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = '/output/' + csvurl;
        aLink.download = csvurl;
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      })
  }
}

// 获取用户列表
export function getUserList() {
  return (dispatch, getState) => {
    dispatch(userLoading(true));
    fetch('/api/userList', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(addUserList(JSON.parse(res).reqData));
        dispatch(getSearchUserList(getState().userList.userSearch))
        dispatch(userLoading(false));
      })

    fetch('/api/session', {
      method: 'GET',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(session(res));
      })
  }
}

// 添加用户
export function addUser(params) {
  return (dispatch) => {
    dispatch(userLoading(true));
    fetch('/api/userList', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: params
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(userLoading(false));
        dispatch(UserModle(false));
        dispatch(getUserList());
      })
  }
}

// 更新用户信息
export function updateUser(params) {
  return (dispatch) => {
    dispatch(userLoading(true));
    fetch('/api/userList', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: params
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(userLoading(false));
        dispatch(UserModle(false));
        dispatch(getUserList());
      })
  }
}


// 删除用户信息
export function deletUser(params) {
  return (dispatch) => {
    dispatch(userLoading(true));
    console.log(params);
    fetch('/api/userListDel', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        id: params
      })
    })
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        dispatch(userLoading(false));
        dispatch(UserModle(false));
        dispatch(getUserList());
      })
  }
}
