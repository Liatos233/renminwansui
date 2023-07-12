如果开启了 VPN，需要设置一下 http.proxy

查看自己的 VPN 端口号，假如端口号是 7890，则在 git bash 命令行中输入以下命令即可：

```bash
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890

```

如果之前 git 中已经设置过上述配置，则使用如下命令取消再进行配置即可：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy

```

下面是几个常用的 git 配置查看命令：

```bash
git config --global http.proxy #查看git的http代理配置
git config --global https.proxy #查看git的https代理配置
git config --global -l #查看git的所有配置
```
