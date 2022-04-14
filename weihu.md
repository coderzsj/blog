D:\git-code\myblog\blog

## docker 命令

1、启动Docker 守护进程

systemctl daemon-reload

2、Docker启动命令：

systemctl start docker

3、查看docker服务是否启动

ps -ef |grep docker

4、查看docker启动的服务：

docker ps

其他：

重启docker服务

systemctl restart docker

停止docker服务

systemctl stop docker

## 上传服务费指令

docker run --name nginx -d -p 80:80 -v /home:/home nginx

Mkdir /home/userfile

sudo apt install docker-ce

docker exec -ti nginx /bin/bash

service nginx reload (热重载)：

Nginx 服务不会终止，使用主进程检查配置，如果配置文件语法正确，则主进程会启动一个新的工作进程处理新来的请求。主进程发送消息给原来的工作进程，通知旧的进程不在接受请求，处理完现有的请求后退出(优雅退出)；如果语法不正确，则继续使用旧的进程继续处理请求。

Service nginx restart

(重启)：

该条命令的执行过程如下，nginx -s stop -> nginx 先将 Nginx 快速的停止(等同于 service nginx stop)，然后在执行启动命令(等同于 service nginx start)，启动的时候会造成短暂的服务中断；如果配置文件语法错误，那问题就大了，有可能会造成更长时间的中断，有可能会造成很大的宕机。

## 图标设置

### 阿里素材库

[阿里素材库](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3166858)

### 官方地址

<https://vuepress-theme-hope.github.io/zh/guide/interface/icon/>

## 服务器

82.156.223.94

阿里云 添加 二级域名

解析设置-》添加记录

<https://dns.console.aliyun.com/>

## VuePress 中文路径问题

## Dockfile

是一个用于编写docker镜像生成过程的文件，其有特定的语法。在一个文件夹中，如果有一个名字为Dockfile的文件，其内容满足语法要求，在这个文件夹路径下执行命令:docker build --tag name:tag .，就可以按照描述构建一个镜像了。name是镜像的名称，tag是镜像的版本或者是标签号，不写就是lastest。注意后面有一个空格和点。

## docker-compose

假如，你有一个java镜像，一个mysql镜像，一个nginx镜像。如果没有docker-compose，那么每次启动的时候，你需要敲各个容器的启动参数，环境变量，容器命名，指定不同容器的链接参数等等一系列的操作，相当繁琐。而用了docker-composer之后，你就可以把这些命令一次性写在docker-composer.yml文件中，以后每次启动这一整个环境（含3个容器）的时候，你只要敲一个docker-composer up命令就ok了。

构建yml(需进入包含docker-compose.yml的文件夹) docker-compose build

部署并后台启动(需进入包含docker-compose.yml的文件夹) docker-compose up -d

查看运行中的容器 `docker ps`

查看容器日志 `docker logs [ID或者名字]`

停止容器 `docker stop [ID或者名字]`

删除所有已关闭的容器 `docker container prune`

进入指定镜像的命令行 `docker exec -it [ID或者名字] bash`

注意如果报错，可尝试使用sh而不是bash

bj_ownpay_patn_mdtrt_d 的rchk_flag的 现在标志都是1，1是未初审状态，应该是图片圈起来的状态都有才是

bj_ownpay_patn_mdtrt_d 表的数据，医疗类别都只有 21，是没有其他医疗类别的数据吗；

还有bj_ownpay_patn_mdtrt_d , bj_ownpay_patn_fee_list_d 可以通过 FIXMEDINS_MDTRT_ID（医院就诊id ） 或 mdtrt_id（就诊id ）关联，现在这两个字段都关联不上
