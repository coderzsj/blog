---
title: explain
category: mysql
date: 2020-09-01
tag:
  - 优化
  - mysql
---

## explain 执行计划

合理设计并利用索引

使用EXPLAIN关键字，可以模拟Mysql优化器执行SQL语句，分析查询语句的性能。

在select语句之前加上explain关键字，mysql会在查询上设置一个标记，执行查询的时候并不是真正的执行sql语句，而是返回该语句的`执行计划`。

注意：如果from钟包含子查询，任然会执行该子查询，将结果放入临时表。

## explain中

1. `id`列的编号是select的序列号，有几个select就有几个id，并且id的大小是根据select出现的先后顺序增长的。id数值越大越先执行，id相同则从上往下执行，id为null的最后执行。
2. `select_type`
- ①simple：简单查询，不包含子查询和union的查询
- ②primary：复杂查询中最外层的select。
- ③subquery：包含在select中的子查询（不在from字句中）。
- ④derived：包含在from子句中的子查询。mysql会将结果放在一个临时表中，也叫派生表。
- ⑤union：在union中的第二个和随后的select。
3、table 这一列表示explain的一行正在访问哪个表。
- 当from子句中有子查询的时候，table列是的格式，表示当前查询依赖id=N的查询。
- 当有union的时候，table列的值为<union1,2>的格式，1和2表示参与union的select行id。

4. type <Badge text="查找数据行的大概范围" />

这一列表示关联类型或者访问类型，也可以理解成mysql是如何决定查找表中的行，查找数据行的大概范围。性能从优到差分别为：system > const > eq_ref > ref > range > index > ALL，一般来说需要保证查询达到range级别，最好达到ref。

①null：mysql能够在优化阶段分解查询语句，在执行阶段用不着再访问表或索引。例如：再索引列中取最小值可以单独查找索引来完成，不需要在执行时访问表。

②：const，system：mysql能对查询的某部分进行优化并将其转化成一个常量（可以看show warnings 的结果）。用于 primary key 或 unique key 的所有列与常数比较时，所以表最多有一个匹配行，读取1次，速度比较快。system是 const的特例，表里只有一条元组匹配时为system。

③eq_ref:primary key 或 unique key 索引的所有部分被连接使用 ，最多只会返回一条符合条件的记录。这可能是在 const 之外最好的联接类型了，简单的 select 查询不会出现这种 type。

④ref：相比 eq_ref，不使用唯一索引，而是使用普通索引或者唯一性索引的部分前缀，索引要和某个值相比较，可能会 找到多个符合条件的行。

简单 select 查询，name是普通索引（非唯一索引）

⑤range：范围扫描通常出现在 in(), between ,> ,<, >= 等操作中。使用一个索引来检索给定范围的行。

⑥index：扫描全索引就能拿到结果，一般是扫描某个二级索引，这种扫描不会从索引树根节点开始快速查找，而是直接 对二级索引的叶子节点遍历和扫描，速度还是比较慢的，这种查询一般为使用覆盖索引，二级索引一般比较小，所以这 种通常比ALL快一些。

⑦ALL:即全表扫描，扫描你的聚簇索引的所有叶子节点。通常情况下这需要增加索引来进行优化了。

5、possible_keys

这一列显示查询可能使用哪些索引来查找。 explain 时可能出现 possible_keys 有列，而 key 显示 NULL 的情况，这种情况是因为表中数据不多，mysql认为索引 对此查询帮助不大，选择了全表查询。 如果该列是NULL，则没有相关的索引。在这种情况下，可以通过检查 where 子句看是否可以创造一个适当的索引来提 高查询性能，然后用 explain 查看效果。

6、key

这一列显示mysql实际采用哪个索引来优化对该表的访问。 如果没有使用索引，则该列是 NULL。如果想强制mysql使用或忽视possible_keys列中的索引，在查询中使用 force index、ignore index。

7、key_len

这一列显示了mysql在索引里使用的字节数，通过这个值可以算出具体使用了索引中的哪些列。 举例来说，film_actor的联合索引 idx_film_actor_id 由 film_id 和 actor_id 两个int列组成，并且每个int是4字节。通 过结果中的key_len=4可推断出查询使用了第一个列：film_id列来执行索引查找。

key_len计算规则如下：

字符串

char(n) 和 varchar(n)，5.0.3 以后版本中，n均代表字符数，而不是字节数，如果是utf-8，一个数字或字母占1个字节，一个汉字占3个字节

char(n)：如果存汉字长度就是 3n 字节

varchar(n)：如果存汉字则长度是 3n + 2 字节，加的2字节用来存储字符串长度，因为 varchar是变长字符串

数值类型

tinyint：1字节
smallint：2字节
int：4字节
bigint：8字节

时间类型

date：3字节

timestamp：4字节

datetime：8字节

如果字段允许为 NULL，需要1字节记录是否为 NULL
索引最大长度是768字节，当字符串过长时，mysql会做一个类似左前缀索引的处理，将前半部分的字符提取出来做索 引。

8、ref

这一列显示了在key列记录的索引中，表查找值所用到的列或常量，常见的有：const（常量），字段名（例：film.id）

9、rows

这一列是mysql估计要读取并检测的行数，注意这个不是结果集里的行数。

### extra

Using filesort：

MySQL 需要额外的一次传递，以找出如何按排序顺序检索行。通过根据联接类型浏览所有行并为所有匹配WHERE子句的行保存排序关键字和行的指针完成排序。然后关键字被排序，并按排序顺序检索行

Using temporary：

使用了临时表保存中间结果，性能特别查，需要重点优化;

Using index： 使用覆盖索引，不需要通过辅助索引树找到主键，再通过主键去主键索引树里获取其它字段值。

Using index condition：MySQL5.6之后新增的ICP，using index condtion就是使用了ICP（索引下推），在存储引擎层进行数据过滤，而不是在服务层过滤，利用索引现有的数据减少回表的数据。

Select tables optimized away：

使用某些聚合函数（比如 max、min）来访问存在索引的某个字段

Using where：

使用 where 语句来处理结果，并且查询的列未被索引覆盖


5、确定问题并采用相应的措施

- 优化索引；
- 优化SQL语句：修改SQL、IN 查询分段、时间查询分段、基于上一次数据过滤；
- 改用其他实现方式：ES、数仓等；
- 数据碎片处理。
