# 人民万岁

## Introduction

![主页](https://imgur.com/Zp7zJOO.jpg)

- [Pages](https://liatos233.github.io/)
- 响应式界面
- 阅读 支持 `pdf` `markdown`
- 博客
- 好玩的东西

## Run

```shell
yarn install
yarn run start
yarn run build
```

## Start from zero

### 1 初始化

```shell
yarn create react-app {name} --template typescript
```

### 2 引入 antd 和 less 文件

```shell
yarn add antd less less-loader@6
```

- antd v4 采用了 Bidirectional Dependency Management 的方案 不再需要引入 antd.css
- less-loader 6.x 及以下版本与 less 4.1.3 版本兼容 与 create-react-app 也兼容
- yarn add @types/less --save-dev

### 3 引入 react-app-rewired 和 customize-cra

```shell
yarn add react-app-rewired customize-cra
```

- 帮助重写 react 脚手架配置而避免 yarn eject
- 需要在根目录下新建`config-overrides.js`文件

### 4 配置 config-overrides.js

- 将 react-scripts 命令全部替换成 react-app-rewired
- 引入所需组件

```shell
yarn add babel-plugin-import uglifyjs-webpack-plugin compression-webpack-plugin -D`
```

- Note: 配置 less 时，需要引入 customize-cra-less-loader

```js
const addLessLoader = require("customize-cra-less-loader");
```

```shell
yarn add customize-cra-less-loader
```

### 5 引入 react-router-dom

```shell
yarn add react-router-dom
```

### 6 引入 md 相关依赖

```shell
yarn add react-markdown github-markdown-css
```

### 7 引入 three.js

```shell
yarn add three
yarn add -D @types/three
yarn add  @three-ts/orbit-controls
yarn add stats.js
yarn add @tweenjs/tween.js
```
