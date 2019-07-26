// 获取用户购物车的信息
const getProductsNum = (func) => {
  const query = `query queryProductNum{
    queryProductNum{
      count
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
          variables: {}
      })
  })
      .then(r => r.json())
      .then((result) => { func(result) });
}

// 获取用户购物车的信息
const getProductsByPage = (start, size, func) => {
    const query = `query queryProducts($start: Int, $size: Int) {
        queryProducts(start: $start, size: $size){
          id
          productName
          img
          promotionMessage
          features
          promotionMessageSecond
          usedPrice
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
                "start": start,
                "size": size
              }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}


const getProductInfo = (id, func) => {
  const query = `query queryProduct($id: Int){
      queryProduct(id: $id){
        id
        img
        productName
        promotionMessage
        features
        promotionMessageSecond
        usedPrice
        nowPrice
      }
    }`;

    fetch('http://localhost:3004/graphql', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                "id": id,
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}






export { getProductsNum, getProductsByPage, getProductInfo }