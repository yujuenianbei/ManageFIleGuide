// 获取用户购物车的信息
const getUserInfo = (func) => {
    const query = `query queryAllUsers{
        queryAllUsers{
          email,
          name,
          phone,
          password,
          company
        }
    }`;

    fetch('http://localhost:3004/graphql', {
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

export { getUserInfo }