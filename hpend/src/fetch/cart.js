
// 修改购物车信息
const searchCart = (id, func) => {
    var query = `mutation searchCart($type: String, $value: String, $intvalue: Int, $pageSize: Int, $start: Int, $sort: String){
        searchCart(type: $type, value: $value, intvalue: $intvalue, pageSize: $pageSize, start: $start, sort: $sort){
            id,
            cartId,
            email,
            name,
            phoneCode,
            phone,
            productName,
            productNum,
            typeName,
            featrues,
            img,
            promotionMessage,
            promotionMessageSecond,
            usedPrice,
            nowPrice,
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
            variables: {
                "intvalue": 1,
                "pageSize": 10,
                "sort": "ASC",
                "start": 0,
                "type": "ProductName",
                "value": ""
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 根据指定条件进行查询用户总数
const searchCartTotal = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;
    const query = `mutation totalCartItem($intvalue: Int, $type: String, $value: String){
    totalCartItem(intvalue: $intvalue, type: $type, value: $value) {
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
            variables:     {
                "intvalue": 1,
                "type": "",
                "value": ""
              }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}



export { searchCart, searchCartTotal }