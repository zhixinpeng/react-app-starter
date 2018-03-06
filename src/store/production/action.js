import * as types from './type'
import API from '@/api/index'

// 保存商品数据
const getProduction = list => {
  return {
    type: types.GETPRODUCTION,
    list
  }
}

// 选择商品
export const toggleSelectProduction = index => {
  return {
    type: types.TOGGLESELECT,
    index
  }
}

// 编辑商品
export const editProduction = (index, selectNum) => {
  return {
    type: types.EDITPRODUCTION,
    index,
    selectNum
  }
}

// 清空选中
export const clearSelected = () => {
  return {
    type: types.CLEARSELECTED
  }
}

// 初始化商品数据，保存至redux
export const getProductionData = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try {
      let result = await API.getProduction()
      result.map(item => {
        item.selectStatus = false
        item.selectNum = 0
        return item
      })
      dispatch(getProduction(result))
    } catch (error) {
      throw error
    }
  }
}
