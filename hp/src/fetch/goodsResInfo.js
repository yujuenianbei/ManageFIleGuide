// 查询用户的收货地址
const getGoodsResInfo = (data, func) => {
    const query = `mutation queryGoodsResInfoByEmail($email: String){
        queryGoodsResInfoByEmail(email:$email){
        email, firstName, lastName, phoneCode, phone, province, address, postCode
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
                email: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}
// 添加收货地址
const addGoodsResInfo = (data, func) => {
    const province = data.province + data.city + data.district
    const query = `mutation regGoodsResInfo($email: String, $firstName: String, $lastName: String, $phoneCode: Int, $phone: String, 
        $province: String, $address: String, $postCode: Int){
              regGoodsResInfo(email: $email, firstName: $firstName, lastName: $lastName, phoneCode: $phoneCode, 
                phone: $phone, province: $province, address: $address, postCode: $postCode){
                id,
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
