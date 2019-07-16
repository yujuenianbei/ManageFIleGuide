
// 修改购物车信息
const ProductNumberOfTypeInCart = (func) => {
    var query = `query queryProductNumberOfType{
        queryProductNumberOfType{
            item,
            count
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


export { ProductNumberOfTypeInCart }