// http
import { http } from '../http';
// 修改购物车信息
const searchOrder = (data, func) => {

    console.log(data)
    let intvalue, value;
    intvalue = 1;
    value = data.search;

    if (data.start > 1) {
        data.start = (data.start - 1) * data.pageSize
    } else if (data.start = 1) {
        data.start = data.start - 1
    }

    var query = `mutation searchOrder($type: String, $value: String, $intvalue: Int, $pageSize: Int, $start: Int, $sort: String){
        searchOrder(type: $type, value: $value, intvalue: $intvalue, pageSize: $pageSize, start: $start, sort: $sort){
            id,
            name,
            phoneCode,
            phone,
            email,
            productId,
            productName,
            productNum,
            productType,
            productImg,
            promotionMessage,
            promotionMessageSecond,
            features,
            usedPrice,
            nowPrice,
            orderOdd,
            payMethod,
            payTime,
            payState,
            deliveryMethod,
            deliveryHopeTime,
            expressOdd,
            goodsResAddress,
            fullPrice,
            orderState,
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
const searchOrderTotal = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;
    const query = `mutation totalOrderItem($intvalue: Int, $type: String, $value: String){
        totalOrderItem(intvalue: $intvalue, type: $type, value: $value) {
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



export { searchOrder, searchOrderTotal }