该项目是学习React16 + React-Router4 + Redux的入门教程，CSS预处理器为`less`，接口请求全部为真实接口，代码结构清晰明了，十分适合入门。

另外，增加了修饰器的使用：

由于create-react-app本身不支持修饰器语法，本项目使用的是[关于Create React App不支持装饰器的终极无伤解决方案](https://juejin.im/post/59faf3975188254eaf27ea71)方案。

使用方式是：

1. 找到node_modules/babel-preset-react-app/index.js

2. 修改代码

```javascript
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const plugins = [
  // 增加装饰器的支持
  require.resolve('babel-plugin-transform-decorators-legacy'), <=== 注意这里！
  // class { handleClick = () => { } }
  require.resolve('babel-plugin-transform-class-properties')
  ....
```

3. 在package.json中安装`babel-plugin-transform-decorators-legacy`依赖

本项目还有使用到react动画方案`react-transition-group`，使用的最新版本`2.2.1`，由于2.x版本与1.x版本的API发生了变化，本项目已适配最新方案。

本项目已完结

