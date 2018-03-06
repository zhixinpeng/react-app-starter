import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.less'
import PublicHeader from '@/components/header/index'
import { saveFormData, saveImg, clearData } from '@/store/home/action'
import { clearSelected } from '@/store/production/action'
import TouchableOpacity from '@/components/touchableOpacity'
import Alert from '@/components/alert'
import API from '@/api'
import * as config from '@/global'
import mixin, { padStr } from '@/utils/mixin'

@mixin({padStr})
class Home extends React.Component {
  static propTypes = {
    productionData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    saveImg: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelected: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.selectedList = []
  }

  state = {
    alertStatus: false,
    alertTip: ''
  }

  componentWillMount() {
    this.initData()
  }

  initData = () => {
    this.selectedList = []
    this.props.productionData.list.forEach(item => {
      if (item.selectStatus && item.selectNum) {
        this.selectedList.push(item)
      }
    })
  }

  handleInput = (type, event) => {
    let value = event.target.value
    switch (type) {
      case 'orderSum':
        value = value.replace(/\D/g, '')
        break
      case 'name':
        break
      case 'phoneNo':
        value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target)
        break
      default:
    }
    this.props.saveFormData(value, type)
  }

  submitForm = () => {
    const { orderSum, name, phoneNo } = this.props.formData
    let alertTip = ''
    if (!orderSum.toString().length) {
      alertTip = '请填写金额'
    } else if (!name.toString().length) {
      alertTip = '请填写姓名'
    } else if (!phoneNo.toString().length) {
      alertTip = '请填写正确的手机号'
    } else {
      alertTip = '添加数据成功'
      this.props.clearSelected()
      this.props.clearData()
    }

    this.setState({
      alertStatus: true,
      alertTip
    })
  }

  closeAlert = () => {
    this.setState({
      alertStatus: false,
      alertTip: ''
    })
  }

  uploadImg = async event => {
    try {
      let formdata = new FormData()
      formdata.append('file', event.target.files[0])
      let result = await API.uploadImg({ data: formdata })
      this.props.saveImg(config.imgURL + result.image_path)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <main className="home-container">
        <PublicHeader title="首页" record />

        <p className="common-title">请录入您的信息</p>

        <form className="home-form">
          <div className="home-form-item">
            <span>销售金额：</span>
            <input
              type="text"
              placeholder="请输入订单金额"
              value={this.props.formData.orderSum}
              onChange={this.handleInput.bind(this, 'orderSum')}
            />
          </div>
          <div className="home-form-item">
            <span>客户姓名：</span>
            <input
              type="text"
              placeholder="请输入客户姓名"
              value={this.props.formData.name}
              onChange={this.handleInput.bind(this, 'name')}
            />
          </div>
          <div className="home-form-item">
            <span>客户电话：</span>
            <input
              type="text"
              maxLength="13"
              placeholder="请输入客户电话"
              value={this.props.formData.phoneNo}
              onChange={this.handleInput.bind(this, 'phoneNo')}
            />
          </div>
        </form>

        <div>
          <p className="common-title">请选择销售的产品</p>
          <Link to="/production" className="common-select-btn">
            {this.selectedList.length ? (
              <ul className="selected-pro-list">
                {this.selectedList.map((item, index) => {
                  return (
                    <li key={index} className="selected-pro-item ellipsis">
                      {item.product_name}x{item.selectNum}
                    </li>
                  )
                })}
              </ul>
            ) : (
              '选择产品'
            )}
          </Link>
        </div>
        <div className="upload-img-con">
          <p className="common-title">请上传发票凭证</p>
          <div className="file-lable">
            <span className="common-select-btn">上传图片</span>
            <input type="file" onChange={this.uploadImg} />
          </div>
          <img
            src={this.props.formData.imgpath}
            className="select-img"
            alt=""
          />
        </div>
        <TouchableOpacity
          className="submit-btn"
          text="提交"
          clickCallBack={this.submitForm}
        />
        <Alert
          closeAlert={this.closeAlert}
          alertTip={this.state.alertTip}
          alertStatus={this.state.alertStatus}
        />
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    productionData: state.productionData,
    formData: state.formData
  }
}

const mapDispatchToProps = {
  saveFormData,
  saveImg,
  clearData,
  clearSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
