报错代码：

Internal error. Please report to [http://jb.gg/ide/critical-startup-errors](http://jb.gg/ide/critical-startup-errors) java.net.BindException: Address already in use: bind

分析：

java.net.BindException：idea 启动时将尝试在 6942 和 6991 之间的第一个可用端口上进行绑定，如果绑定失败则会引发此异常。通过重启电脑或者重置网络可以解决问题。 这通常是由 Windows NAT 驱动程序（winnat）引起的，停止并重新启动该服务可以解决问题。

解决办法：

CMD 使用管理员启动： 输入： net stop winnat

然后启动 IDEA，启动成功后

CMD 里继续运行下面的命令。 输入：net start winnat

> **注：该方法也可以解决开发时 8080 端口被占用的问题**😀
