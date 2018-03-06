import React from 'react'
import PublicHeader from '@/components/header/index'
import './index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable'
import {
  getProductionData,
  toggleSelectProduction,
  editProduction
} from '@/store/production/action'

class Production extends React.Component {
  static propTypes = {
    productionData: PropTypes.object.isRequired,
    getProductionData: PropTypes.func.isRequired,
    toggleSelectProduction: PropTypes.func.isRequired,
    editProduction: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (!this.props.productionData.list.length) {
      this.props.getProductionData()
    }
  }

  // 判断数据变化，优化渲染效率
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(this.nextProps)) ||
      !is(fromJS(this.state), fromJS(this.nextState))
    )
  }

  toggleSelect = index => {
    this.props.toggleSelectProduction(index)
  }

  handleEdit = (index, num) => {
    let currentNum = this.props.productionData.list[index].selectNum + num
    if (currentNum < 0) return
    this.props.editProduction(index, currentNum)
  }

  render() {
    return (
      <main className="common-con-top">
        <PublicHeader title="首页" confirm />
        <section className="pro-list-con">
          <ul className="pro-list-ul">
            {this.props.productionData.list.map((item, index) => {
              return (
                <li className="pro-item" key={index}>
                  <div
                    className="pro-item-select"
                    onClick={this.toggleSelect.bind(this, index)}
                  >
                    <span
                      className={`icon-xuanze1 pro-select-status ${
                        item.selectStatus ? 'pro-selected' : ''
                      }`}
                    />
                    <span className="pro-name">{item.product_name}</span>
                  </div>
                  <div className="pro-item-edit">
                    <span
                      className={`icon-jian ${
                        item.selectNum > 0 ? 'edit-active' : ''
                      }`}
                      onClick={this.handleEdit.bind(this, index, -1)}
                    />
                    <span className="pro-num">{item.selectNum}</span>
                    <span
                      className="icon-jia"
                      onClick={this.handleEdit.bind(this, index, 1)}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    productionData: state.productionData
  }
}

const mapDispatchToProps = {
  getProductionData,
  toggleSelectProduction,
  editProduction
}

export default connect(mapStateToProps, mapDispatchToProps)(Production)
