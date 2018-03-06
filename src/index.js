import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { AppContainer } from 'react-hot-loader'
import './styles/base.less'
import './utils/flexible'
import Route from './router/index'
import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Route />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
