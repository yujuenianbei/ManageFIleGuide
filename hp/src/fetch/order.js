// 获取订单中的产品
const getProductsInOrder = (data, func) => {
    const query = `mutation queryProductInOrder($id: String){
        queryProductInOrder(id: $id){
                id,
                productName, 
                type, 
                img, 
                promotionMessage, 
                featrues, 
                promotionMessageSecond, 
                usedPrice, 
                nowPrice
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
                id: data,
              }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 创建订单
const addUserOrder = (data, func) => {
    const query = `mutation addUserOrder($payMethod: Int, $deliveryMethod: Int, $deliveryHopeTime: String, $goodsResAddress: Int, $productList: String, $email: String){
        addUserOrder(payMethod: $payMethod, deliveryMethod: $deliveryMethod, deliveryHopeTime: $deliveryHopeTime, goodsResAddress: $goodsResAddress, productList: $productList, email: $email){
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
                email: data.email,
                payMethod: data.payMethod,
                deliveryMethod: data.deliveryMethod,
                deliveryHopeTime: data.deliveryHopeTime,
                goodsResAddress: data.goodsResAddress,
                productList: data.productList
              }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

export { getProductsInOrder, addUserOrder }
