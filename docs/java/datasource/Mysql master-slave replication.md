---
title: mysql-master-slave-replication
category: mysql
tag:
- 主从复制
---

## mysql主从复制

MySQL主从复制是一个异步的复制过程，底层是基于数据库自带的二进制日志功能。就是一台或多台MySQL数据库（slave，即从库）从另一台MySQL数据库（

- master将改变纪录到二进制日志（binary log)
- slave将master的binary log拷贝到它的中继日志（relay log）
- slave重做中继日志中的事件，将改变应用到自己的数据库中。

搭建，实现主从同步。 (两阶段提交)

配置-前置条件

提前准备好两台服务器，分别安装MySQL并启动服务成功。

- 主库（master） 192.168.138.100
- 从库（slave） 192.168.138.101

