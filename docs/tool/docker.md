---
title: docker
category: tool
icon: Docker
tag:
  - docker
---

:::info

Docker 是一个软件容器化平台，它以容器的形式将您的应用程序及其所有依赖项打包在一起，以确保你的应用程序在任何环境中无缝运行。

:::
 
Docker 容器包括应用程序及其所有依赖项，作为操作系统的独立进程运行。

Docker 镜像是 Docker 容器的源代码，Docker 镜像用于创建容器。使用 build 命令创建镜像。

Docker 容器有几种状态

四种状态：运行、已暂停、重新启动、已退出。

## Dockerfile

Dockerfile 中最常见的指令是什么

FROM：指定基础镜像

LABEL：功能是为镜像指定标签

RUN：运行指定的命令

CMD：容器启动时要运行的命令

Dockerfile 中的命令 COPY 和 ADD 命令有什么区别?

COPY 与 ADD 的区别 COPY 的 SRC 只能是本地文件，其他用法一致

## docker 常用命令

### docker run

创建容器,将数据,日志,配置文件映射到本机

- -d: 后台运行容器
- -p 将容器的端口映射到本机的端口
- -v 将主机目录挂载到容器的目录
- -e 设置参数

```bash
docker run 
-d 
-P 
--name nginx2 
-v /home/nginx:/usr/share/nginx/HTML 
nginx

```


### docker pull 

拉取或者更新指定镜像

### docker push 

将镜像推送至远程仓库

### docker rmi 

删除镜像

### docker rm 

删除容器

### docker images 

查看镜像库，列出所有镜像

### docker ps 

列出所有容器

## 容器与主机之间的数据拷贝

容器与主机之间的数据拷贝命令

docker cp 命令用于容器与主机之间的数据拷贝

主机到容器：

docker cp /www 96f7f14e99ab:/www/

容器到主机：

docker cp 96f7f14e99ab:/www /tmp/

## 启动 nginx 容器(随机端口映射)，并挂载本地文件目录到容器 HTML 的命令

启动 nginx 容器(随机端口映射)，并挂载本地文件目录到容器 HTML 的命令

## 生产中监控 Docker

Docker 提供 docker stats 和 docker 事件等工具来监控生产中的 Docker。我们可以使用这些命令获取重要统计数据的报告。

Docker 统计数据：当我们使用容器 ID 调用 docker stats 时，我们获得容器的 CPU，内存使用情况等。它类似于 Linux 中的 top 命令。

Docker 事件：Docker 事件是一个命令，用于查看 Docker 守护程序中正在进行的活动流。

一些常见的 Docker 事件是：

Attach，commit，die，detach，rename，destroy 等。我们还可以使用各种选项来限制或过滤我们感兴趣的事件

## dockerfile 的 ONBUILD 指令

当镜像用作另一个镜像构建的基础时，

ONBUILD 指令向镜像添加将在稍后执行的触发指令。

如果要构建将用作构建其他镜像的基础的镜像(例如，可以使用特定于用户的配置自定义的应用程序构建环境或守护程序)，这将非常有用。

```bash
docker exec -it <container id> <path_of_nginx> reload

docker exec -it nginx /home/userfile reload
```

##案例：创建mysql容器

1、在本地创建mysql的映射目录

```bash
mkdir -p /root/mysql/data /root/mysql/logs /root/mysql/conf
```

在/root/mysql/conf中创建 *.cnf 文件(叫什么都行)

```bash
touch my.cnf
```

2、拉取官方mysql5.7镜像 

```bash
docker pull mysql:5.7
```

3、创建容器,将数据,日志,配置文件映射到本机

```bash
docker run -d -p 3306:3306 --name mysql -v /root/mysql/conf:/etc/mysql/conf.d -v /root/mysql/logs:/logs -v /root/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7
```

4、启动mysql容器

```bash
docker start mysql
```

5、查看/root/mysql/data目录是否有数据文件

```bash
cd /root/mysql/data
```


6、使用navicat工具连接测试
  
