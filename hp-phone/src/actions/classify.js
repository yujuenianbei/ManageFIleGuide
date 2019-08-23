// http
import { http } from '../http';

export const TYPE = 'TYPE';
export const TYPEPRODUCT = 'TYPEPRODUCT';
export const TYPELOADING = 'TYPELOADING';

// type类型
export function typeLoading(data) {
    return {
        type: TYPELOADING,
        data
    }
}

// type类型
export function type(data) {
    return {
        type: TYPE,
        data
    }
}

// 分类产品
export function typeOfProduct(data) {
    return {
        type: TYPEPRODUCT,
        data
    }
}

export function changeType(data) {
    return (dispatch, getState) => {
        dispatch(typeLoading(true));
        const query = `mutation queryProductByType($type: Int){
            queryProductByType(type: $type){
              id,
              typeName,
              type,
              img,
              productName,
              promotionMessage,
              features,
              usedPrice,
              nowPrice
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
                    type: data
                }
            })
        })
            .then(r => r.json())
            .then((result) => { 
                dispatch(typeLoading(false));
                dispatch(typeOfProduct(result.data.queryProductByType));
             });
    }
}