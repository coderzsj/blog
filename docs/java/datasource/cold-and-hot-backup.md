---
title: 冷备份和热备份
category: 数据库
---

冷备份

发生在数据库已经正常关闭的情况下，当正常关闭时会提供给我们一个完整的数据库。冷备份时将关键性文件烤到硬盘上里头；

1. 速度快
2. 容易归档
3. 容易回复到某个时间点
4. 低度维护，高度安全

```sql
sqlplus /nolog
sql> connect / as sysdba
sql> shoutdown normal
```

用拷贝命令把全部的时间文件，重做日志、控制文件初始化参数备份

备份

sql> cp

重启数据库

sql> startup

热备：

库还在运行的时候，采用archivelog mode模式备份，恢复更多的信息，需要大量的档案空间。


