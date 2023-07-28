1. ### 初始化
   `yarn create react-app {name} --template typescript`
2. ### 引入 antd 和 less 文件
   `yarn add antd less less-loader@6`
   - antd v4 采用了 Bidirectional Dependency Management 的方案 不再需要引入 antd.css
   - less-loader 6.x 及以下版本与 less 4.1.3 版本兼容 与 create-react-app 也兼容
   - yarn add @types/less --save-dev
3. ### 引入 react-app-rewired 和 customize-cra
   `yarn add react-app-rewired customize-cra`
   - 帮助重写 react 脚手架配置而避免 yarn eject
   - 需要在根目录下新建`config-overrides.js`文件
4. ### 配置 config-overrides.js
   - 将 react-scripts 命令全部替换成 react-app-rewired
   - 引入所需组件
   - `yarn add babel-plugin-import uglifyjs-webpack-plugin compression-webpack-plugin -D`
   - Note: 配置 less 时，需要引入 customize-cra-less-loader
   - const addLessLoader = require("customize-cra-less-loader");
   - `yarn add customize-cra-less-loader`
5. 引入 react-router-dom
   - `yarn add react-router-dom`
6. 引入 md 相关依赖
   - `yarn add react-markdown github-markdown-css`
   <!-- //////////////////////////////////////////////////////////////// -->
7. 引入 three.js
   - `yarn add three`
   - `yarn add -D @types/three`
   - `yarn add  @three-ts/orbit-controls`
   - `yarn add stats.js`
   - `yarn add @tweenjs/tween.js`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
