---
title: mysql shiwu
icon: shiwu
category: mysql
password: 1
date: 2022-02-28
tag:
  - mysql
  - 事务
---

## mysql特性

原子性：事务是一个不可分割的工作单位，事务中的操作要么都成功（commit），要么都失败（rollback）。

一致性：事务前后数据的完整性必须保持一致。 事务执行的结果必须使数据库从一个一致性状态变到另一个一致性的状态。在多个事务并行情况下；

持久性：指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。

隔离性： 事务的隔离性是多个事务并行，每个事务不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。

## mysql事务隔离级别

|事务隔离级别|概念|
|:--: | --- |
|read uncommited(未提交读)|允许当前事务读取到其他事务未提交的数据,会出现脏读、幻读、不可重复读|
|read committed(读已提交)|对事务已经提交的数据进行读取，解决了藏独。会出现幻读和不可重复读|
|repetable read(可重复读)|在同一个事务中，对相同查询条件，读取数据都是一致的。该级别会出现幻读|
|serializable(串行化)|完全服从数据库的ACID，读写数据都会锁住在事务中涉及到的数据库表，并发性能极低|

MySQL 默认使用 REPEATABLE-READ 的事务隔离级别。

不可重复读形成原因在于数据的修改：在同一事务中，同样的条件，第一次读的数据和第二次读的数据不一样。（因为中间有其他事务提交了修改）。

幻读形成原因主要在于数据的新增或删除：在同一事务中，同样的条件，第一次和第二次读出来的记录数不一样。（因为中间有其他事务提交了插入/删除）。

### redo log

redo log是重做日志，提供前滚操作，

记录的是数据修改之后的值，不管事务是否提交都会记录下来。在mysql服务器宕机时，InnoDB存储引擎会使用redo log恢复到掉电前的时刻，以此来保证数据的完整性。

### undo log

undo log是回滚日志，提供回滚操作。

保存了事务发生之前的数据的一个版本，可以用于回滚，同时可以提供多版本并发控制下的读（MVCC），也即非锁定读

### binlog

binlog是追加日志,又称为归档日志，属于逻辑日志，

binlog是属于MySQL Server层面的，又称为归档日志，属于逻辑日志，是记录原始的sql语句，逻辑

不支持高并发，以读为主

共享锁，排它锁，意向锁

## mvvc机制

MVCC (Multi-Version Concurrency Control) (注：与MVCC相对的，是基于锁的并发控制，Lock-Based Concurrency Control)是一种基于多版本的并发控制协议，只有在InnoDB引擎下存在。

MVCC是为了实现事务的隔离性，通过版本号，避免同一数据在不同事务间的竞争，你可以把它当成基于多版本号的一种乐观锁。

当然，这种乐观锁只在事务级别提交读和可重复读有效。MVCC最大的好处，相信也是耳熟能详：读不加锁，读写不冲突。在读多写少的OLTP应用中，读写不冲突是非常重要的，极大的增加了系统的并发性能。

::: info OLTP

On-Line Transaction Processing联机事务处理过程(OLTP)，也称为面向交易的处理过程，其基本特征是前台接收的用户数据可以立即传送到计算中心进行处理，并在很短的时间内给出处理结果，是对用户操作快速响应的方式之一。

:::