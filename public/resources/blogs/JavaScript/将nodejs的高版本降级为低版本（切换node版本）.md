方法 1：

1. 清除本地 `node`
2. 安装 `nvm` https://github.com/coreybutler/nvm-windows/releases 下载 nvm-setup.exe 并一路安装
3. 查看可安装的 node 版本 `nvm ls available`
4. 安装指定版本 `nvm install 12.17.0`
5. 使用指定版本 `nvm use 12.17.0`
6. 查看已经安装的 node 版本 `nvm ls`

方法 2：

1. 安装 node 版本管理模块 n
   `npm install n -g `
2. 版本降级/升级
   `sudo n 12.17.0`
