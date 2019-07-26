// 获取用户购物车的信息
const getFrontUserInfo = (func) => {
    const query = `query queryAllFrontUser{
        queryAllFrontUser{
            id,
            name, 
            sex, 
            email, 
            phoneCode,
            phone, 
            company,
            password,
        }
    }`;

    fetch('http://localhost:3004/graphqlPort', {
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

// 新增前台用户
const createFrontUser = (data, func) => {
    const query = `mutation regFrontUser($name: String, $sex: Int, $email: String,
        $phoneCode: Int, $phone: String, $password: String, $company: String){
            regFrontUser(name: $name, sex: $sex, email: $email, phoneCode: $phoneCode, 
            phone: $phone, password: $password, company: $company){
                id,
                name, 
                sex, 
                email, 
                phoneCode,
                phone, 
                company,
                password,
                state
          }
      }`;

    fetch('http://localhost:3004/graphqlPort', {
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
                name: data.name,
                sex: parseInt(data.sex),
                email: data.email,
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
const updateFrontUser = (data, func) => {
    const query = `mutation updateFrontUser($id: Int, $name: String, $sex: Int, $email: String, 
        $phoneCode: Int, $phone: String, $password: String, $company: String){
            updateFrontUser(id: $id, name: $name, sex: $sex, email: $email, phoneCode: $phoneCode, 
            phone: $phone, password: $password, company: $company){
                id,
                name, 
                sex, 
                email, 
                phoneCode,
                phone, 
                company,
                password,
                state
          }
      }`;

    fetch('http://localhost:3004/graphqlPort', {
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
                name: data.name,
                sex: parseInt(data.sex),
                email: data.email,
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
const deleteFrontUser = (data, func) => {
    console.log(data.key)
    const query = `mutation deleteFrontUser($id: ID){
        deleteFrontUser(id: $id){
          state
        }
      }`;

    fetch('http://localhost:3004/graphqlPort', {
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
const validateFrontUser = (data, func) => {
    const query = `mutation validateFrontUser($name: String){
        validateFrontUser(name: $name){
          state
        }
      }`;

    fetch('http://localhost:3004/graphqlPort', {
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
                name: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 根据指定条件进行查询用户
const searchFrontUser = (data, func) => {
    let intvalue, value;
    if (data.searchType === "sex") {
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

    const query = `mutation searchFrontUser($type: String, $value: String, $intvalue: Int, $pageSize: Int, $start: Int, $sort: String){
        searchFrontUser(type: $type, value: $value, intvalue: $intvalue, pageSize: $pageSize, start: $start, sort: $sort){
            id,
            name, 
            sex, 
            email, 
            phoneCode,
            phone, 
            company,
            password
        }
      }
      `;

    fetch('http://localhost:3004/graphqlPort', {
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
const searchFrontUserTotal = (data, func) => {
    let intvalue, value;
    if (data.searchType === "sex") {
        intvalue = data.search;
        value = data.searchType;
    } else {
        intvalue = 0;
        value = data.search;
    }
    const query = `mutation frontUserTotal($intvalue: Int, $type: String, $value: String){
        frontUserTotal(intvalue: $intvalue, type: $type, value: $value) {
          total
        }
      }`;

    fetch('http://localhost:3004/graphqlPort', {
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


export { getFrontUserInfo, createFrontUser, updateFrontUser, deleteFrontUser, validateFrontUser, searchFrontUser, searchFrontUserTotal }