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
const createProduct = (data, func) => {
    const query = `mutation addProduct($productName: String, $type: Int, $img: String, $promotionMessage: String, 
    $featrues: String, $promotionMessageSecond: String, $usedPrice: Int, $nowPrice: Int){
    addProduct(productName: $productName, type: $type, img: $img, promotionMessage: $promotionMessage,
      featrues: $featrues, promotionMessageSecond: $promotionMessageSecond, 
      usedPrice: $usedPrice, nowPrice: $nowPrice){
        productName, 
        type, 
        img, 
        promotionMessage, 
        featrues, 
        promotionMessageSecond, 
        usedPrice, 
        nowPrice,
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
                productName: data.productName,
                type: parseInt(data.type),
                img: data.img,
                promotionMessage: data.promotionMessage,
                featrues: data.featrues,
                promotionMessageSecond: data.promotionMessageSecond,
                usedPrice: parseInt(data.usedPrice),
                nowPrice: parseInt(data.nowPrice),
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 修改后台用户
const updateProduct = (data, func) => {
    const query = `mutation updateProduct($id: Int,$productName: String, $type: Int, $img: String, $promotionMessage: String, 
        $featrues: String, $promotionMessageSecond: String, $usedPrice: Int, $nowPrice: Int){
        updateProduct(id: $id, productName: $productName, type: $type, img: $img, promotionMessage: $promotionMessage,
          featrues: $featrues, promotionMessageSecond: $promotionMessageSecond, usedPrice: $usedPrice, nowPrice: $nowPrice){
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
            variables:{
                id: parseInt(data.id),
                productName: data.productName,
                type: parseInt(data.type),
                img: data.img,
                promotionMessage: data.promotionMessage,
                featrues: data.featrues,
                promotionMessageSecond: data.promotionMessageSecond,
                usedPrice: parseInt(data.usedPrice),
                nowPrice: parseInt(data.nowPrice),
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 删除后台用户
const deleteProduct = (data, func) => {
    console.log(data.key)
    const query = `mutation deleteProduct($id: ID){
      deleteProduct(id: $id){
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
const validateAccount = (data, func) => {
    const query = `mutation validateAccount($userName: String){
      validateAccount(userName: $userName){
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
                userName: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 根据指定条件进行查询产品
const searchProduct = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;

    if (data.start > 1) {
        data.start = (data.start - 1) * data.pageSize
    } else if (data.start = 1) {
        data.start = data.start - 1
    }

    const query = `mutation searchProduct($type: String, $value: String, $intvalue: Int, $pageSize: Int, $start: Int, $sort: String){
    searchProduct(type: $type, value: $value, intvalue: $intvalue, pageSize: $pageSize, start: $start, sort: $sort){
          id,
          productName, 
          type, 
          img, 
          promotionMessage, 
          featrues, 
          promotionMessageSecond, 
          usedPrice, 
          nowPrice,
          createTime,
          updateTime
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
const searchProductTotal = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;
    const query = `mutation totalProduct($intvalue: Int, $type: String, $value: String){
      totalProduct(intvalue: $intvalue, type: $type, value: $value) {
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


export { createProduct, deleteProduct, searchProduct, searchProductTotal, updateProduct }