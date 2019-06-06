// 修改购物车信息
const postCart = (id, value, func) => {
    var query = `mutation addToCart($userId: Int,$productId: Int, $productNum : Int){
        addToCart(userId: $userId,productId: $productId,productNum: $productNum){
            productId
            productNum
        } 
      }`;
    fetch('http://localhost:3004/graphql', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'login': localStorage.getItem('loginState'),
            'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                "userId": parseInt(localStorage.getItem('id')),
                "productId": id,
                "productNum": value
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result, id) });
}

// 删除购物车中产品的请求
const deleteCartProduct = (id, func) => {
    var query = `mutation deleteAProductInCart($userId: Int,$productId: Int){
        deleteAProductInCart(userId: $userId, productId: $productId){
            state
      }
    }`;
    fetch('http://localhost:3004/graphql', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'login': localStorage.getItem('loginState'),
            'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                "userId": parseInt(localStorage.getItem('id')),
                "productId": id,
            }
        })
    })
        .then(r => r.json())
        .then(result => { func(result, id) });
}



export { deleteCartProduct, postCart }