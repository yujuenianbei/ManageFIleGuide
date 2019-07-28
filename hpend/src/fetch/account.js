// http
import { http } from '../http';
// 获取用户购物车的信息
const getUserInfo = (func) => {
    const query = `query queryAllUsers{
        queryAllUsers{
            id,
            userName, 
            sex, 
            email, 
            firstName, 
            lastName, 
            phoneCode,
            phone, 
            company,
            password,
        }
    }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {}
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 新增后台用户
const createAccount = (data, func) => {
    const query = `mutation regAccount($userName: String, $sex: Int, $email: String, $firstName: String, $lastName: String,
        $phoneCode: Int, $phone: String, $password: String, $company: String){
          regAccount(userName: $userName, sex: $sex, email: $email, 
            firstName: $firstName , lastName: $lastName, phoneCode: $phoneCode, 
            phone: $phone, password: $password, company: $company){
                id,
                userName, 
                sex, 
                email, 
                firstName, 
                lastName, 
                phoneCode,
                phone, 
                company,
                password,
                state
          }
      }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                userName: data.userName,
                sex: parseInt(data.sex),
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneCode: parseInt(data.phoneCode),
                phone: data.phone,
                password: data.password,
                company: data.company
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 修改后台用户
const updateAccount = (data, func) => {
    const query = `mutation updateAccount($id: Int, $userName: String, $sex: Int, $email: String, $firstName: String, $lastName: String,
        $phoneCode: Int, $phone: String, $password: String, $company: String){
          updateAccount(id: $id, userName: $userName, sex: $sex, email: $email, 
            firstName: $firstName , lastName: $lastName, phoneCode: $phoneCode, 
            phone: $phone, password: $password, company: $company){
                id,
                userName, 
                sex, 
                email, 
                firstName, 
                lastName, 
                phoneCode,
                phone, 
                company,
                password,
                state
          }
      }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                id: data.id,
                userName: data.userName,
                sex: parseInt(data.sex),
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneCode: parseInt(data.phoneCode),
                phone: data.phone,
                password: data.password,
                company: data.company
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 删除后台用户
const deleteAccount = (data, func) => {
    console.log(data.key)
    const query = `mutation deleteAccount($id: ID){
        deleteAccount(id: $id){
          state
        }
      }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                id: parseInt(data.key),
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 校验后台用户名是否重复
const validateAccount = (data, func) => {
    const query = `mutation validateAccount($userName: String){
        validateAccount(userName: $userName){
          state
        }
      }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                userName: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 根据指定条件进行查询用户
const searchAccount = (data, func) => {
    let intvalue, value;
    if (data.searchType === "sex" || data.searchType === "phoneCode") {
        console.log(data)
        if(!data.search && data.search !== 0){
            intvalue = 9;
            value = data.searchType;
        } else {
            intvalue = data.search;
            value = data.searchType;
        }
    } else {
        intvalue = 1;
        value = data.search;
    }

    if (data.start > 1) {
        data.start = (data.start - 1) * data.pageSize
    } else if (data.start = 1) {
        data.start = data.start -1
    }

    const query = `mutation searchAccount($type: String, $value: String, $intvalue: Int, $pageSize: Int, $start: Int, $sort: String){
        searchAccount(type: $type, value: $value, intvalue: $intvalue, pageSize: $pageSize, start: $start, sort: $sort){
            id,
            userName, 
            sex, 
            email, 
            firstName, 
            lastName, 
            phoneCode,
            phone, 
            company,
            password
        }
      }
      `;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                type: data.searchType,
                value,
                intvalue,
                pageSize: data.pageSize,
                start: data.start,
                sort: data.sort
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 根据指定条件进行查询用户总数
const searchAccountTotal = (data, func) => {
    let intvalue, value;
    if (data.searchType === "sex" || data.searchType === "phoneCode") {
        intvalue = data.search;
        value = data.searchType;
    } else {
        intvalue = 0;
        value = data.search;
    }
    const query = `mutation total($intvalue: Int, $type: String, $value: String){
        total(intvalue: $intvalue, type: $type, value: $value) {
          total
        }
      }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'login': localStorage.getItem('loginState'),
            // 'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                type: data.searchType,
                value,
                intvalue,
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}


export { getUserInfo, createAccount, updateAccount, deleteAccount, validateAccount, searchAccount, searchAccountTotal }