import axios from 'axios'
import * as config from '@/global/index'

export default class Server {
  axios(method, url, params) {
    return new Promise((resolve, reject) => {
      if (typeof params !== 'object') params = {}
      let _option = {
        method,
        url,
        baseURL: config.baseURL,
        timeout: 30000,
        params: null,
        data: null,
        headers: null,
        withCredentials: true,
        validateStatus: status => {
          return status >= 200 && status < 300
        },
        ...params
      }
      axios
        .request(_option)
        .then(response => {
          let data =
            typeof response.data === 'object'
              ? response.data
              : JSON.parse(response.data)
          resolve(data)
        })
        .catch(error => {
          if (error.response) {
            reject(error.response.data)
          } else {
            reject(error)
          }
        })
    })
  }
}
