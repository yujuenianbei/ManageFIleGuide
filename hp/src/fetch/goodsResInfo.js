// http
import { http } from '../http';
// 查询用户的收货地址
const getGoodsResInfo = (data, func) => {
    const query = `mutation queryGoodsResInfoByUserName($userName: String){
        queryGoodsResInfoByUserName(userName:$userName){
            id, userName, email, firstName, lastName, phoneCode, phone, province, address, postCode
        }
      }`;

    fetch(http.port, {
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
                userName: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}
// 添加收货地址
const addGoodsResInfo = (data, func) => {
    const province = data.province + data.city + data.district
    const query = `mutation regGoodsResInfo($email: String, $userName: String, $firstName: String, $lastName: String, $phoneCode: Int, $phone: String, 
        $province: String, $address: String, $postCode: Int){
              regGoodsResInfo(email: $email, userName:$userName, firstName: $firstName, lastName: $lastName, phoneCode: $phoneCode, 
                phone: $phone, province: $province, address: $address, postCode: $postCode){
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
            'login': localStorage.getItem('loginState'),
            'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            query,
            variables: {
                userName: data.userName,
                email: data.email,
                firstName: data.firstname,
                lastName: data.lastname,
                phoneCode: parseInt(data.phoneCode),
                phone: data.phone,
                province: province,
                address: data.address,
                postCode: parseInt(data.postCode)
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

export { getGoodsResInfo, addGoodsResInfo }
