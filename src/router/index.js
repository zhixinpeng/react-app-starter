import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Home from '../pages/home/index'
import Production from '../pages/production/index'
import HelpCenter from '../pages/helpcenter/index'
import Record from '../pages/record/index'

class RouteConfig extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/production" component={Production} />
          <Route path="/helpcenter" component={HelpCenter} />
          <Route path="/record" component={Record} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}

export default hot(module)(RouteConfig)
