// 创建订单
const addUserOrder = (data, func) => {
    const query = `mutation addUserOrder($payMethod: Int, $deliveryMethod: Int, $deliveryHopeTime: String, $goodsResAddress: Int, $productList: String, $email: String){
        addUserOrder(payMethod: $payMethod, deliveryMethod: $deliveryMethod, deliveryHopeTime: $deliveryHopeTime, goodsResAddress: $goodsResAddress, productList: $productList, email: $email){
            email,
            orderOdd, 
            payMethod, 
            payState, 
            payTime, 
            deliveryMethod, 
            deliveryHopeTime, 
            expressOdd, 
            goodsResAddress, 
            productList, 
            fullPrice, 
            orderState,
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

export { addUserOrder }
