import * as types from './type'
import Immutable from 'immutable'

let defaultState = {
  list: []
}

export const productionData = (state = defaultState, action) => {
  let imuList
  let imuItem
  switch (action.type) {
    case types.GETPRODUCTION:
      // redux返回新的state
      return { ...state, ...action }
    case types.TOGGLESELECT:
      // 避免修改数据，使用immutable进行数据转换
      imuList = Immutable.List(state.list)
      imuItem = Immutable.Map(state.list[action.index])
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'))
      imuList = imuList.set(action.index, imuItem)
      // redux返回新的state
      return { ...state, ...{ list: imuList.toJS() } }
    case types.EDITPRODUCTION:
      // 避免修改数据，使用immutable进行数据转换
      imuList = Immutable.List(state.list)
      imuItem = Immutable.Map(state.list[action.index])
      imuItem = imuItem.set('selectNum', action.selectNum)
      imuList = imuList.set(action.index, imuItem)
      // redux返回新的state
      return { ...state, ...{ list: imuList.toJS() } }
    case types.CLEARSELECTED:
      imuList = Immutable.List(state.list)
      for (let i = 0; i < state.list.length; i++) {
        imuList = imuList.update(i, item => {
          item = item.set('selectStatus', false)
          item = item.set('selectNum', 0)
          return item
        })
      }
      return { ...state, ...{ list: imuList.toJS() } }
    default:
      return state
  }
}
