

// 获取用户购物车的信息
const getAllproductType = (func) => {
    const query = `query AllProductType{
        AllProductType{
            id
            typeName,
            createTime,
            updateTime
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

export { getAllproductType }