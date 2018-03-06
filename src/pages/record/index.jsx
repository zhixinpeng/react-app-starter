import React from 'react'
import PublicHeader from '@/components/header/index'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import RecordList from '../recordlist/index'
import { is, fromJS } from 'immutable'
import './index.less'

export default class Record extends React.Component {
  state = {
    flagBarPosition: '17%'
  }

  componentWillMount() {
    let type = this.props.location.pathname.split('/')[2]
    this.setFlagBarPosition(type)
  }

  componentWillReceiveProps(nextProps) {
    let currentType = this.props.location.pathname.split('/')[2]
    let type = nextProps.location.pathname.split('/')[2]
    if (currentType !== type) {
      this.setFlagBarPosition(type)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(this.nextProps)) ||
      !is(fromJS(this.state), fromJS(this.nextState))
    )
  }

  setFlagBarPosition = type => {
    let flagBarPosition
    switch (type) {
      case 'passed':
        flagBarPosition = '17%'
        break
      case 'audited':
        flagBarPosition = '50%'
        break
      case 'failed':
        flagBarPosition = '83%'
        break
      default:
        flagBarPosition = '17%'
    }
    this.setState({ flagBarPosition })
  }

  render() {
    return (
      <main className="common-con-top">
        <PublicHeader title="记录" />
        <section className="record-nav-con">
          <nav className="record-nav">
            <NavLink
              to={`${this.props.match.path}/passed`}
              replace
              className="nav-link"
            >
              已通过
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/audited`}
              replace
              className="nav-link"
            >
              待审核
            </NavLink>
            <NavLink
              to={`${this.props.match.path}/failed`}
              replace
              className="nav-link"
            >
              未通过
            </NavLink>
          </nav>
          <i
            className="nav-flag-bar"
            style={{ left: this.state.flagBarPosition }}
          />
        </section>
        <Switch>
          <Route
            path={`${this.props.match.path}/:type`}
            component={RecordList}
          />
          <Redirect
            from={`${this.props.match.path}`}
            to={`${this.props.match.path}/passed`}
            exact
          />
        </Switch>
      </main>
    )
  }
}
