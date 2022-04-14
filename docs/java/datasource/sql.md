---
title: 常见的sql语句
icon: sql
category: mysql
tag:
  - mysql
  - sql
---
  
# sql-keyword

[参考](https://mp.weixin.qq.com/s?__biz=MzAxMTMwNTMxMQ==&mid=2649248455&idx=1&sn=57539b783e2f4a0bdc54c7ca63e162a6&chksm=835fdaf7b42853e19fea0c1ecdf2e62dc70591c37129e3fd53193773ca372c7958b5b450f4b7&scene=21#wechat_redirect)

## SQL CASE 语句

作为 if-then-else 之类逻辑的关键字。

SELECT CASE("栏位名”)

WHEN “条件 1” THEN “结果 1”

WHEN “条件 2” THEN “结果 2”

...

[ELSE “结果 N”]

END

FROM “表格名”

例：

```sql
select store_name, (case store_name
when ’Los Angeles’ then sales*2
when ‘San Diego’ then sales*1.5
else sales end) as “new sales”, date
from store_information;

```

## CREATE INDEX 语句：在不读取整个表的情况下，更快地查找数据

简单索引，允许使用重复的值：

CREATE INDEX index_name ON table_name (colunm_name);

## group_concat

使用group_concat()和group by显示相同名字的人的id号：

将上面的id号从大到小排序，且用'_'作为分隔符：

**去重**

DISTINCT score

**设置分隔符**

score SEPARATOR ';'

**排序**

score ORDER BY score DESC
