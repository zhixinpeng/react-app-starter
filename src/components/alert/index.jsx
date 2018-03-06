import React from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import { CSSTransition } from 'react-transition-group'
import TouchableOpacity from '@/components/touchableOpacity/index'
import './index.less'

const duration = 300

export default class Alert extends React.Component {
  static propTypes = {
    closeAlert: PropTypes.func.isRequired,
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    )
  }

  confirm = () => {
    this.props.closeAlert()
  }

  handleOnEnter = e => {
    e.style.display = 'flex'
  }

  handleOnExited = e => {
    e.style.display = 'none'
  }

  render() {
    return (
      <CSSTransition
        in={this.props.alertStatus}
        classNames="alert"
        timeout={duration}
        onEnter={this.handleOnEnter}
        onExited={this.handleOnExited}
      >
        <div className="alert-con">
          <div className="alert-context">
            <div className="alert-content-detail">{this.props.alertTip}</div>
            <TouchableOpacity
              className="confirm-btn"
              clickCallBack={this.confirm}
            />
          </div>
        </div>
      </CSSTransition>
    )
  }
}
