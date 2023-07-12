# 1 环境配置

## 1.1 安装 jdk

- 下载

```shell
Java SE Development Kit 16 - Downloads (oracle.com)
```

- 解压

```shell
在/usr/tools/java 目录下:tar -zxvf jdk-...
```

- 编辑环境变量：

```shell
vim /etc/profile
  JAVA*HOME=/usr/java/jdk1.8.0*...
  CLASSPATH=$JAVA_HOME/lib/
  PATH=$PATH:$JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH
# 使配置文件生效
source /ect/profile
# 测试 jdk 是否成功
java -version
```

## 1.2 安装 tomcat

- 下载
  http://tomcat.apache.org/
- 解压

```shell
tar -zxvf apache-tomcat-...
```

- 启动 tomcat

```shell
cd apache-tomcat-.../bin/
./startup.sh
```

# 2 部署

## 2.1 拷贝 web

将 web 项目拷贝到 tomcat 中部署 web 应用的位置/usr/tools/tomcat/apache-tomcat-.../webapps 目录下

## 2.2 修改端口号：

```shell
vim /usr/tools/tomcat/apache-tomcat-8.5.45/conf/server.xml
```

## 2.3 启动

将 jar 包放置在/usr/tools/tomcat/apache-tomcat-8.5.45/webapps 里

```shell
java -jar \*\*\*.jar
```

## 2.4 查看

```shell
ps -ef|grep java 查看进程
kill -9 进程号 停止服务
```
