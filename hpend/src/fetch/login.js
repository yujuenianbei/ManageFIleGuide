// http
import { http } from '../http';
// 获取用户购物车的信息
const loginAccount = (val, func) => {
    const query = `mutation login($userName: String, $password: String, $remember: Boolean){
        login(userName: $userName, password: $password, remember: $remember){
          userName
          uid
          state
          token
        } 
      }`;

    fetch(http.port, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                userName: val.userName,
                password: val.password,
                remember: val.remember
              }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

const getQrcode = (func) => {
    fetch(http.ip + '/aclogin/loginByPhone', {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then(r => r.json())
        .then((result) => { func(result) });
  }

export { loginAccount, getQrcode }
