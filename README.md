该项目是学习 React16 + React-Router4 + Redux 的入门教程，CSS 预处理器为`less`，接口请求全部为真实接口，代码结构清晰明了，十分适合入门。

> 增加了修饰器的使用：

由于 create-react-app 本身不支持修饰器语法,因此本本项目增加了对修饰器的支持

使用方式是：

1.  安装相关依赖

```
npm install babel-plugin-transform-decorators-legacy
```

2.  修改 package.json 中`babel`代码，增加对修饰器依赖的支持

```javascript
"babel": {
    "presets": ["react-app"],
    "plugins": ["babel-plugin-transform-decorators-legacy"]
  }
```

> 动画方案

本项目还有使用到 react 动画方案`react-transition-group`，使用的最新版本`2.2.1`，由于 2.x 版本与 1.x 版本的 API 发生了变化，本项目已适配最新方案。

本项目已完结
