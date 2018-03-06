export default methods => {
  return target => {
    Object.assign(target.prototype, methods)
  }
}

export const padStr = (value, position, padstr, inputElement) => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value =
        value.substring(0, item + index) +
        padstr +
        value.substring(item + index)
    }
  })
  value = value.trim()
  // 解决安卓部分浏览器插入空格后光标错位问题
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(value.length, value.length)
  })
  return value
}
