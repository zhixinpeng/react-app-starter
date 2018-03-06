import React from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import './index.less'

const duration = 300

export default class PublicHeader extends React.Component {
  state = {
    navState: false
  }

  toggleNav = () => {
    this.setState({ navState: !this.state.navState })
  }

  handleOnEnter = e => {
    e.style.display = 'flex'
  }

  handleOnExited = e => {
    e.style.display = 'none'
  }

  render() {
    return (
      <header className="header-container">
        <span
          className="header-slide-icon icon-catalog"
          onClick={this.toggleNav}
        />
        <span className="header-title">{this.props.title}</span>
        {this.props.record && (
          <NavLink to="/record" exact className="header-link icon-jilu" />
        )}
        {this.props.confirm && (
          <NavLink to="/" exact className="header-link header-link-confim">
            确定
          </NavLink>
        )}
        <CSSTransition
          child={this.FirstChid}
          in={this.state.navState}
          classNames="nav"
          timeout={duration}
          onEnter={this.handleOnEnter}
          onExited={this.handleOnExited}
        >
          <aside key="nav-slide" className="nav-slide-list">
            <NavLink
              to="/"
              replace
              exact
              className="nav-link icon-jiantou-copy-copy"
            >
              首页
            </NavLink>
            <NavLink
              to="/helpcenter"
              replace
              exact
              className="nav-link icon-jiantou-copy-copy"
            >
              帮助中心
            </NavLink>
          </aside>
        </CSSTransition>
      </header>
    )
  }
}
