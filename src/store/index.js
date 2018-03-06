import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as production from './production/reducer'
import * as home from './home/reducer'

// 启用redux浏览器调试工具
// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 增加了redux浏览器调试工具之后，因为createStore对参数的顺序有严格要求，所以要注意写法的改变
let store = createStore(
  combineReducers({ ...production, ...home }),
  composeEnhancers(applyMiddleware(thunk))
)

export default store
