// http
import { http } from '../http';
// 修改购物车信息
const searchCart = (data, func) => {

    console.log(data)
    let intvalue, value;
    intvalue = 1;
    value = data.search;

    if (data.start > 1) {
        data.start = (data.start - 1) * data.pageSize
    } else if (data.start = 1) {
        data.start = data.start - 1
    }

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
            features,
            img,
            promotionMessage,
            promotionMessageSecond,
            usedPrice,
            nowPrice,
            createTime,
            updateTime
          }
        }`;
    fetch(http.port, {
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
const searchCartTotal = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;
    const query = `mutation totalCartItem($intvalue: Int, $type: String, $value: String){
    totalCartItem(intvalue: $intvalue, type: $type, value: $value) {
        total
      }
    }`;

    fetch(http.port, {
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
                type: data.searchType,
                value,
                intvalue,
              }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}



export { searchCart, searchCartTotal }