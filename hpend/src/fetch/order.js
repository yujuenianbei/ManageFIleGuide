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
            orderStateNum,
            orderId,
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

// 根据id查询订单收货地址
const searchOrderAddress = (data, orderId, func) => {
    const query = `mutation searchAddress($goodsResInfoId: Int, $orderId: Int){
        searchAddress(goodsResInfoId: $goodsResInfoId, orderId: $orderId){
          id,
          userName,
          email,
          firstName,
          lastName,
          phoneCode,
          phone,
          province,
          address,
          postCode,
          addressState,
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
                goodsResInfoId: data,
                orderId: orderId
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 查询用户订单地址
const searchOrderUserAddress = (data, func) => {
    const query = `mutation searchUserAddress($userName: String){
        searchUserAddress(userName: $userName){
          id,
          userName,
          email,
          firstName,
          lastName,
          phoneCode,
          phone,
          province,
          address,
          postCode,
          addressState,
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
                userName: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 后台给订单中的用户注册新的收货地址
const regOrderUserAddress = (data, func) => {
    const query = `mutation regGoodsResInfo($email: String,$userName: String, $firstName: String, $lastName: String, $phonecode: Int, $phone: String, 
        $province: String, $address: String, $postCode: Int){
              regGoodsResInfo(email: $email,userName: $userName, firstName: $firstName, lastName: $lastName, phoneCode: $phonecode, 
                phone: $phone, province: $province, address: $address, postCode: $postCode){
                    id,
                    email,
                    userName,
                    firstName, 
                    lastName,
                    phoneCode, 
                    phone, 
                    province, 
                    address, 
                    postCode,
                    createTime,
                    updateTime,
                    state
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
                email: data.email,
                userName: data.userName,
                firstName: data.firstName,
                lastName: data.lastName,
                phonecode: parseInt(data.phoneCode),
                phone: data.phone,
                province: data.province,
                address: data.address,
                postCode: parseInt(data.postCode)
            }

        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 后台替换订单中的收货地址（地址已存在）
const changeOrderAddress = (data, func) => {
    const query = `mutation updateOrderAddress($id:Int,$goodsResAddress: Int){
        updateOrderAddress(id: $id, goodsResAddress: $goodsResAddress){
          state
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
                id: data.id,
                goodsResAddress: parseInt(data.goodsResAddress)
              }

        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}


export { searchOrder, searchOrderTotal, searchOrderAddress, searchOrderUserAddress, regOrderUserAddress, changeOrderAddress }
