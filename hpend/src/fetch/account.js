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

// 新增后台用户
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

export { getUserInfo, createAccount, updateAccount }