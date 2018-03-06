import Server from './server'

class API extends Server {
  // 用途：获取商品数据
  async getProduction() {
    try {
      let result = await this.axios('get', '/shopro/data/products')
      if (result && result.data instanceof Object && result.http_code === 200) {
        return result.data.data || []
      } else {
        let error = {
          tip: '获取商品数据失败',
          response: result,
          url: 'http://cangdu.org/shopro/data/products'
        }
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  // 用途：获取记录数据
  async getRecord(params) {
    try {
      let result = await this.axios('get', `/shopro/data/record/${params.type}`)
      if (result && result.data instanceof Object && result.http_code === 200) {
        return result.data
      } else {
        let error = {
          tip: '获取记录数据失败',
          response: result,
          data: params,
          url: 'http://cangdu.org/shopro/data/record'
        }
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  // 用途：上传图片
  async uploadImg(params) {
    try {
      let result = await this.axios(
        'post',
        'http://cangdu.org:8001/v1/addimg/shop',
        params
      )
      if (result && result.status === 1) {
        return result
      } else {
        let error = {
          tip: '上传图片失败',
          response: result,
          data: params,
          url: 'http://cangdu.org:8001/v1/addimg/shop'
        }
        throw error
      }
    } catch (error) {
      throw error
    }
  }
}

export default new API()
