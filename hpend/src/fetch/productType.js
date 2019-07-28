// http
import { http } from '../http';
// 获取所有产品分类
const getAllproductType = (func) => {
    const query = `query AllProductType{
        AllProductType{
            id
            typeName,
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
            variables: {}
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 新增产品分类
const createProductType = (data, func) => {
    const query = `mutation addProductType($typeName: String){
        addProductType(typeName: $typeName){
          id
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
                typeName: data.typeName
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

// 修改后台用户
const updateProductType = (data, func) => {
    const query = `mutation updateProductType($id: Int,$typeName: String){
        updateProductType(id: $id, typeName: $typeName){
          id
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
                typeName: data.typeName
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}


// 删除后台用户
const deleteProductType = (data, func) => {
    console.log(data.key)
    const query = `mutation deleteProductType($id: ID){
        deleteProductType(id: $id){
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
                // id: parseInt(data.key),
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}


// 根据指定条件进行查询产品分类
const searchProductType = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;

    if (data.start > 1) {
        data.start = (data.start - 1) * data.pageSize
    } else if (data.start = 1) {
        data.start = data.start - 1
    }

    const query = `mutation searchProductType($type: String, $value: String, $intvalue: Int, $pageSize: Int, $start: Int, $sort: String){
        searchProductType(type: $type, value: $value, intvalue: $intvalue, pageSize: $pageSize, start: $start, sort: $sort){
          id,
          typeName, 
          createTime,
          updateTime
      }
    }
    `;

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


// 根据指定条件进行查询产品分类总数
const searchProductTypeTotal = (data, func) => {
    let intvalue, value;
    intvalue = 1;
    value = data.search;
    const query = `mutation totalProductType($intvalue: Int, $type: String, $value: String){
        totalProductType(intvalue: $intvalue, type: $type, value: $value) {
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

// 校验后台用户名是否重复
const validateTypeName = (data, func) => {
    const query = `mutation validateTypeName($typeName: String){
        validateTypeName(typeName: $typeName){
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
                typeName: data
            }
        })
    })
        .then(r => r.json())
        .then((result) => { func(result) });
}

export { getAllproductType, validateTypeName, createProductType, updateProductType, deleteProductType, searchProductType, searchProductTypeTotal }