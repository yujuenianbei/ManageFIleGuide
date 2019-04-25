import { ip } from '../../http'
export const CHAT_PART = 'CHAT_PART';

// 用户弹窗
export function chatpart(data) {
  return {
    type: CHAT_PART,
    data
  }
}

export function session() {
  return (dispatch) => {
      fetch(ip + '/api/session', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
              },
          })
          .then((res) => {
              return res.text()
          })
          .then((res) => {
              console.log(JSON.parse(res));
          })
  }
}