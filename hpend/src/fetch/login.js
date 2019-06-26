// 获取用户购物车的信息
const loginAccount = (val, func) => {
    const query = `mutation login($userName: String, $password: String, $remember: Boolean){
        login(userName: $userName, password: $password, remember: $remember){
          uuid
          state
          token
        } 
      }`;

    fetch('http://localhost:3004/graphqlPort', {
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

export { loginAccount }
