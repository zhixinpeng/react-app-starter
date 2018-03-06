import * as types from './type'

let defaultState = {
  orderSum: '',
  name: '',
  phoneNo: '',
  imgpath: ''
}

export const formData = (state = defaultState, action) => {
  switch (action.type) {
    case types.SAVEFORMDATA:
      return { ...state, ...{ [action.datatype]: action.value } }
    case types.SAVEIMG:
      return { ...state, ...{ imgpath: action.path } }
    case types.CLEARDATA:
      return { ...state, ...defaultState }
    default:
      return state
  }
}
