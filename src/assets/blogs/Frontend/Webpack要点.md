## 概述

- 用于现代 Javascript 应用程序的静态模块打包工具

## 主要概念

- Entry：入口，Webpack 执行构建的第一步，默认为./src/index.js
- Output： 出口，Webpack 打包结果的输出位置和命名，默认为./dist
- Module：模块，Webpack 里一切皆模块，Webpack 会从 Entry 开始递归查找所有依赖的模块
- Chunk：代码块，由多个 Module 组合而成，用于代码的合并与分割
- Loader：模块转换器，用于处理非 JavaScript 文件，将它们转换为模块以便使用
- Plugin：插件，执行范围更广的任务，如代码压缩、打包优化、环境变量注入等

## 构建流程

1. 初始化编译参数：从配置文件和 shell 命令中读取`合并参数`，确定构建行为
2. 开始编译：初始化 `Complier 对象`，加载 `Plugin`，执行 `run 方法`触发编译
3. 确定入口：根据配置中指定的入口文件（`Entry`）开始构建过程
4. 编译模块：从 Entry 出发，递归编译依赖模块，使用 `Loader` 处理模块
5. 完成编译：形成依赖关系图
6. 输出资源：组装 `Chunk` 并加入到输出列表，根据配置输出到 `Output`

## 常见 Loader

- less-loader：将 less 文件编译成 css 文件
- css-loader：将 css 文件变成 commonjs 模块加载到 js 中，模块内容是样式字符串
- style-loader：创建 style 标签，将 js 中的样式资源插入标签内，并将标签添加到 head 中生效
- ts-loader：打包编译 Typescript 文件
- url-loader：将文件转换为 base64 URI
- source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调试
- babel-loader：将 ES6 转化为 ES5
- file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件

## 常见 Plugin

- html-webpack-plugin：处理 html 资源，默认会创建一个空的 HTML，自动引入打包输出的所有资源（js/css）
- mini-css-extract-plugin：把 css 单独抽出来
- clean-webpack-plugin：每次打包时候自动删除上一次打的包
- define-plugin： 在构建过程中注入全局变量
- uglifyjs-webpack-plugin：代码混淆
- compression-webpack-plugin：代码压缩
- common-chunk-plugin：提取第三方库和公共模块

## Webpack 要点

### sourceMap

- 做源代码和目标代码的映射，用于定位错误位置
- 但是比较耗费性能，会使得打包速度变慢

### 模块热更新（Hot Module Replacement，HMR）

- 代码修改后，不用刷新浏览器就可以更新
- 借助 HotModuleReplacementPlugin()，devServer 开启 hot
- 原理：，Webpack 在浏览器中注入一个 HMR Runtime 脚本，与 Webpack Dev Server 建立 WebSocket 长连接，代码修改后，生成 Patch 更新

### 模块懒加载

- 加载特定模块而非全部，用于减少加载事件，提高性能，常用于 SPA 的路由懒加载
- 使用 prefetch 和 preloading 等关键字

### 长缓存

- 通过合理配置构建过程，以便在代码发生变化后，能够尽量保持浏览器缓存的有效性
- 原理：文件名哈希`bundle.[contenthash].js`、设置 `Cache-Control 和 Expires` 进行持久化缓存、文件分离

### polyfill 和 runtime

- babel-polyfill 通过向全局对象和内置对象的 prototype 上添加浏览器缺失的新方法
- babel-runtime 则是将 es6+ 编译成 es5，或者引入所需模块

### Webpack 5 功能提升

- 模块联邦（Module Federation）（允许不同的 Webpack 构建之间共享代码，从而实现跨应用程序共享模块的能力）
- 改进的 Tree Shaking （sideEffect，对于无副作用的代码可直接剔除）
- 代码分割（更高效的 Chunk 格式： Record）
- 支持 WebAssembly（一个可移植、体积小、加载快并且兼容 Web 的全新格式，以在浏览器上运行 C、C++ 或 Rust 等代码为编译目标）

## vite

- 快速、轻量级的现代 Web 开发构建工具，利用浏览器`原生 ES 模块加载功能`和`缓存机制`，实现开发环境下的快速冷重载和构建速度
- 每次修改代码后不需要整个项目重新编译，避免了重复编译和打包步骤
- 支持预构建（基于 go 编写的 esbuild）和预渲染技术，加速页面首次加载
- 相对于 Webpack 的插件生态不够完善
