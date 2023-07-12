# 1 安装 wsl

wsl –install

# 2 ubuntu 安装 docker

## 2.1 更新

apt update

apt-get install ca-certificates curl gnupg lsb-release

## 2.2 安装证书

curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add –

## 2.3 写入软件源信息

sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

## 2.4 安装

sudo apt-get install docker-ce docker-ce-cli containerd.io

## 2.5 启动

service docker start

docker version

service docker stop（关闭）

# 3 编译 doris

Ref：[https://doris.apache.org/docs/install/source-install/compilation/](https://doris.apache.org/docs/install/source-install/compilation/)

## 3.1 下载 doris 的 docker 镜像

Note1：镜像版本与 doris 版本需要匹配 这里都是最新版本

docker pull apache/doris:build-env-ldb-toolchain-latest

docker images # 查看镜像列表

## 3.2 运行镜像

docker run -it apache/doris:build-env-ldb-toolchain-latest

exit （退出镜像） Ctrl+D

docker start [container id/name] （再次打开容器）

docker attach [container id/name] （重新进入容器）

docker stop [container id/name] （关闭容器）

docker rm [name] （关闭容器）

docker rmi [container id] （关闭容器）

## 3.3 查看运行中的容器

docker ps

## 3.4 将文件复制到容器中

docker cp /home/user/doris [container id]:/home

## 3.5 编译 doris

sh build.sh

chmod -R 777 \* （如果提示权限不足 则添加权限，如果是对文件和文件夹权限的修改是一样的，那么可以加-R）

## 3.6 成功

![](RackMultipart20230712-1-zahu8n_html_ef471185d20ad91e.png)

# 4 容器创建 fe

**ref\*\*** ：**[**https://developer.aliyun.com/article/920530**](https://developer.aliyun.com/article/920530)

## 4.1 拉取 doris 镜像

docker pull apache/incubator-doris:build-env-ldb-toolchain-latest

## 4.2 创建 Doris-Docker 的文件（包括元数据文件夹）

mkdir -p /opt/docker/doris

## 4.3 将编译好的 FE 和 BE 拷贝至 Docker 文件群内

cp -r 编译好的 Doris 根目录/fe/ /opt/docker/doris/

cp -r 编译好的 Doris 根目录/be/ /opt/docker/doris/be-01

cp -r 编译好的 Doris 根目录/be/ /opt/docker/doris/be-02

cp -r 编译好的 Doris 根目录/be/ /opt/docker/doris/be-03

## 4.4 启动 fe-docker

docker run -it -p 8030:8030 -p 9030:9030 -d --name=doris-fe -v /opt/docker/doris/fe:/opt/doris/fe -v /opt/docker/doris/doris-meta:/opt/doris/doris-meta apache/incubator-doris:build-env-ldb-toolchain-latest

## 4.5 进入 fe-docker

docker exec -ti doris-fe /bin/bash

## 4.6 配置 fe-docker

yum install net-tools

# 修改配置文件

vim /opt/doris/fe/conf/fe.conf

# 取消 priority_networks 的注解，并根据 Docker 的网段进行配置

priority_networks = 172.17.0.0/16 #这里要根据你 Docker 的 IP 确定

## 4.7 切换 Docker-JDK 版本

# 切换 Java 版本为 JDK1.8，该镜像默认为 JDK11

alternatives --set java java-1.8.0-openjdk.x86_64

alternatives --set javac java-1.8.0-openjdk.x86_64

export JAVA_HOME=/usr/lib/jvm/java-1.8.0

# 校验是否切换版本成功

java -version

## 4.8 配置 FE-Docker 的环境变量

vim /etc/profile.d/doris.sh

export DORIS_HOME=/opt/doris/fe/

export PATH=$PATH:$DORIS_HOME/bin

# 保存并 source

source /etc/profile.d/doris.sh

## 4.9 启动 Doris-FE

sh start_fe.sh --daemon

## 4.10 检查 fe 是否启动成功

JPS 命令下有没有 PaloFe 进程

http://fe_host:fe_http_port/api/bootstrap

http://fe_host:fe_http_port

# 5 容器创建 be

## 5.1 安装 mysql

# centos

wget -c http://mirrors.ustc.edu.cn/mysql-ftp/Downloads/MySQL-5.7/mysql-5.7.37-1.el7.x86\_64.rpm-bundle.tar

# ubuntu

wget -c [http://mirrors.ustc.edu.cn/mysql-ftp/Downloads/MySQL-5.7/mysql-5.7.37-el7-x86_64.tar](http://mirrors.ustc.edu.cn/mysql-ftp/Downloads/MySQL-5.7/mysql-5.7.37-el7-x86_64.tar)

# 解压

tar -xvf \*\*\*.tar

## 5.2 连接 FE 并修改密码

mysql -h [FE-Docer 的 IP] -P 9030 -uroot

select password('[密码]');

SET PASSWORD FOR 'root' = '[密码的密文]';

# 也可以创建新用户

CREATE USER 'test' IDENTIFIED BY 'test_passwd';

# 后续登录

mysql -h [FE\_HOST] -P9030 -u[username] -p[password]

## 5.3 启动 BE-Docker

docker run -it -p 9061:9060 -d --name=doris-be-01 -v /opt/docker/doris/be-01:/opt/doris/be apache/incubator-doris:build-env-ldb-toolchain-latest

docker run -it -p 9062:9060 -d --name=doris-be-02 -v /opt/docker/doris/be-02:/opt/doris/be apache/incubator-doris:build-env-ldb-toolchain-latest

docker run -it -p 9063:9060 -d --name=doris-be-03 -v /opt/docker/doris/be-03:/opt/doris/be apache/incubator-doris:build-env-ldb-toolchain-latest

## 5.4 进入 BE-Docker 以及安装组件

# 进入 fe-docker,以 01 为例

docker exec -ti doris-be-01 /bin/bash

# 安装 net-tools 用于查看 IP

yum install net-tools -y

# 修改配置文件

vim /opt/doris/be/conf/be.conf

# 取消 priority_networks 的注解，并根据 Docker 的网段进行配置

priority_networks = 172.17.0.0/16 #这里要根据你 Docker 的 IP 确定

# 配置环境变量

vim /etc/profile.d/doris.sh

export DORIS_HOME=/opt/doris/be/

export PATH=$PATH:$DORIS_HOME/bin

# 保存并 source

source /etc/profile.d/doris.sh

## 5.5 添加 BE 节点注册信息

# 其中 host 为 BE 所在节点 ip；port 为 be/conf/be.conf 中的 heartbeat_service_port，默认 9050

ALTER SYSTEM ADD BACKEND "host:port";

## 5.6 启动 doris-be

start_be.sh --daemon

## 5.7 测试 be 与 MySQL 的连通性

# 登录 FE-MySQL

mysql -h FE_HOST -P9030 -uusername -ppassword

# 执行命令查看 BE 运行情况。如一切正常，isAlive 列应为 true。

SHOW PROC '/backends';

## 5.8 循环配置其他的 be 节点

# 6 容器打包镜像及部署

## 6.1 将 docker 容器打包为镜像

docker commit [container id] [image name]:[version]

## 6.2 将镜像导出到指定位置

docker save -o [image name].tar [image name]

## 6.3 将导出的镜像，上到到需要重新部署的服务器上，进入上传镜像的地址，然后将镜像导入到新服务器上

docker load \< [image name].tar

## 6.4 运行容器

docker run -p 3000:9000 -p 3001:3001 -it --name [container name] [image name]

# 7 修改 route load 的时间间隔

\doris\fe\fe-core\src\main\java\org\apache\doris\analysis\CreateRoutineLoadStmt.java

// change \>= 5 to \>= 1 修改时间区间

public static final Predicate\<Long\> MAX_BATCH_INTERVAL_PRED = (v) -\> v \>= 1 && v \<= 60;
