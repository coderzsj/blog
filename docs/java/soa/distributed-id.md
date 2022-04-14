---
title: fubushi id
icon: id
category: fubushi
tag:
    - 分布式id
---

## 分布式 id

::: info Snowflake**

Snowflake 是 Twitter 开源的分布式 ID 生成算法，目的是在分布式系统中生成全局唯一且趋势递增的 long(64bit) 的id数值。
其特性是各节点无需协调、按时间大致有序、且整个集群各节点单不重复。
该数值的默认组成如下(符号位之外的三部分允许个性化调整)：
1bit: 符号位，始终是 0(为了保证主键是正数)。
41bit: 毫秒数(可用 69 年)；
10bit: 节点ID(5bit数据中心 + 5bit节点ID，支持 32 * 32 = 1024 个节点)
12bit: 流水号(每个节点每毫秒内支持 4096 个 ID，相当于 409万的 QPS)
整个64位数值最大值为2的63次方-1，正好等于Long.MAX_VALUE（9223372036854775807）
:::

一、UUID

UUID是通过唯一识别码，可以生成一个长度32位的全局唯一识别码。
String uuid = UUID.randomUUID().toString()；
缺点：UUID虽然能保证全局唯一，但是占用32位有些太长，而且是无序的，入库时性能较差。(由于关系型数据库索引大多都是B+ tree结构，每个索引节点都存储着若干个id，如果无序的插入会导致一些中间节点分裂，造成很多节点不饱和，大大降低了数据库插入性能)

二、数据库自增主键

分布式系统中用DB proxy请求不同的分库，每个分库设置不同的初始值，步长和分库数量相等：

缺点：id的生成严重依赖数据库，不但影响性能，而且一旦数据库宕机，服务将变得不可用。

### SnowFlake算法

雪花算法支持毫秒级的百万id生成操作。

定义一个初始时间戳startTimestamp(14位)，比如 1483200000000L(2017-01-01)，接着获取相应的机房和机器id码(10位)，我目前做的项目就是12位的机器id码+10位的sequence序列号

1、同步锁保证线程安全，step1中，我们先比较当前时间戳与上次缓存毫秒时间，如果小于缓存时间(两种原因，一是毫秒级sequence达到了上限，二是时间回调)，则使用上次缓存毫秒时间戳进行缓存计数器计数操作

2、step2中，我们判断当前时间戳与上次缓存时间是否相等，若相等则进行缓存计数器sequence+1操作，当sequence达到最大值2的10次方1024时，重置为0，且当前时间戳+1；若不等，即当前时间戳大于缓存时间戳，那么sequence从0开始新的计数

3、step3中将当前时间戳的值缓存到lastTimestamp，进行二进制的位运算获得64位全局唯一的分布式id并转成十进制。

41位时间戳：(timestamp - startTimestamp) << TIMESTAMP_OFFSET，左移22位，相当于2的22次方，右边补0 10位机器码：machineId << MACHINE_OFFSET，左移12位，相当于2的12次方，右边补0 最后将41位时间戳二进制值、10位机器码二进制值与sequence二进制值进行或运算(相当于右边补0的位置进行相应的合并计算)

优点：ID呈趋势递增，后续插入索引树的时候性能较好。

   缺点：

   依赖于系统时钟的一致性。

   我这边写法仅仅解决了机器系统时钟短时间内的回拨，如果某台机器的系统时钟回拨+服务器重启，缓存时间丢失，那么就有可能造成ID冲突，或者ID乱序。

1. 生成ID时不依赖于DB，完全在内存生成，高性能高可用。