#### npm(Node Package Manager)

- Node.js 官方包管理工具
- npx 是 v5.2 开始增加的命令，可以执行依赖包里的二进制文件(node_modules/.bin)，常适用于使用一次就丢弃的情况，不会全局安装
- nvm 是 node 多版本管理工具

#### cnpm(淘宝 npm)

- 淘宝团队维护的 npm 镜像，解决国内 npm 安装速度慢的问题

#### pnpm

- 运行速度最快，利用硬链接和符号链接来避免复制所有本地缓存源文件，但存在一定的兼容性问题(Electron 里面不支持)

#### yarn

- 由 Facebook、Google、Exponent 和 Tilde 联合推出了较新的 JS 包管理工具
- 相对于早期的 npm 具有较大优势
  - 支持离线安装（npm@5 已支持）
  - 依赖扁平化结构（npm@3 已支持）
  - 依赖安装确定性 yarn.lock（npm@5 增加了 package-lock.json）
  - 安装速度快并行下载
  - 安装失败自动重试

| npm                          | yarn                     |
| ---------------------------- | ------------------------ |
| npm install                  | yarn                     |
| npm install react --save     | yarn add react           |
| npm uninstall react --save   | yarn remove react        |
| npm install react --save-dev | yarn add react --dev     |
| npm update --save            | yarn upgrade             |
| npm get registry             | yarn config get registry |
