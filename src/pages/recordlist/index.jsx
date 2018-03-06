import React from 'react'
import API from '@/api/index'
import { is, fromJS } from 'immutable'
import './index.less'

export default class RecordList extends React.Component {
  state = {
    recordList: []
  }

  componentWillMount() {
    let type = this.props.location.pathname.split('/')[2]
    this.getRecordList(type)
  }

  componentWillReceiveProps(nextProps) {
    let currentType = this.props.location.pathname.split('/')[2]
    let type = nextProps.location.pathname.split('/')[2]
    if (currentType !== type) {
      console.log(1)
      this.getRecordList(type)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(this.nextProps)) ||
      !is(fromJS(this.state), fromJS(this.nextState))
    )
  }

  getRecordList = async type => {
    try {
      let result = await API.getRecord({ type })
      this.setState({ recordList: result.data || [] })
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    return (
      <ul className="record-list-con">
        {this.state.recordList.map((item, index) => {
          return (
            <li className="record-item" key={index}>
              <section className="record-item-header">
                <span>创建时间：{item.created_at}</span>
                <span>{item.type_name}</span>
              </section>
              <section className="record-item-content">
                <p>
                  <span>用户名：</span>
                  {item.customers_name}
                  &emsp;
                  {item.customers_phone}
                </p>
                <p>
                  <span>商&emsp;品：</span>
                  {item.product[0].product_name}
                </p>
                <p>
                  <span>金&emsp;额：</span>
                  {item.sales_money}
                  &emsp;
                  佣金：
                  {item.commission}
                </p>
              </section>
            </li>
          )
        })}
      </ul>
    )
  }
}
