(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{639:function(t,v,e){"use strict";e.r(v);var _=e(1),a=Object(_.a)({},(function(){var t=this,v=t.$createElement,e=t._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"mysql特性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mysql特性"}},[t._v("#")]),t._v(" mysql特性")]),t._v(" "),e("p",[t._v("原子性：事务是一个不可分割的工作单位，事务中的操作要么都成功（commit），要么都失败（rollback）。")]),t._v(" "),e("p",[t._v("一致性：事务前后数据的完整性必须保持一致。 事务执行的结果必须使数据库从一个一致性状态变到另一个一致性的状态。在多个事务并行情况下；")]),t._v(" "),e("p",[t._v("持久性：指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。")]),t._v(" "),e("p",[t._v("隔离性： 事务的隔离性是多个事务并行，每个事务不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。")]),t._v(" "),e("h2",{attrs:{id:"mysql事务隔离级别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mysql事务隔离级别"}},[t._v("#")]),t._v(" mysql事务隔离级别")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("事务隔离级别")]),t._v(" "),e("th",[t._v("概念")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("read uncommited")]),t._v(" "),e("td",[t._v("未提交读，读到未提交数据；这些未提交的数据可能会回滚；读到的数据就是脏数据，数据库中不存在这些数据；")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("read committed")]),t._v(" "),e("td",[t._v("读已提交，也叫不可重复读，两次读取到的数据不一致；")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("repetable read")]),t._v(" "),e("td",[t._v("可重复读；")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("serializable")]),t._v(" "),e("td",[t._v("串行化，读写数据都会锁住整张表，数据操作不会出错，但并发性能极低，开发中很少用到。")])])])]),t._v(" "),e("p",[t._v("MySQL 默认使用 REPEATABLE-READ 的事务隔离级别。")]),t._v(" "),e("p",[t._v("不可重复读形成原因在于数据的修改：在同一事务中，同样的条件，第一次读的数据和第二次读的数据不一样。（因为中间有其他事务提交了修改）。")]),t._v(" "),e("p",[t._v("幻读形成原因主要在于数据的新增或删除：在同一事务中，同样的条件，第一次和第二次读出来的记录数不一样。（因为中间有其他事务提交了插入/删除）。")]),t._v(" "),e("h3",{attrs:{id:"redo-log"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redo-log"}},[t._v("#")]),t._v(" redo log")]),t._v(" "),e("p",[t._v("redo log是重做日志，提供前滚操作，")]),t._v(" "),e("p",[t._v("记录的是数据修改之后的值，不管事务是否提交都会记录下来。在mysql服务器宕机时，InnoDB存储引擎会使用redo log恢复到掉电前的时刻，以此来保证数据的完整性。")]),t._v(" "),e("h3",{attrs:{id:"undo-log"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#undo-log"}},[t._v("#")]),t._v(" undo log")]),t._v(" "),e("p",[t._v("undo log是回滚日志，提供回滚操作。")]),t._v(" "),e("p",[t._v("保存了事务发生之前的数据的一个版本，可以用于回滚，同时可以提供多版本并发控制下的读（MVCC），也即非锁定读")]),t._v(" "),e("h3",{attrs:{id:"binlog"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#binlog"}},[t._v("#")]),t._v(" binlog")]),t._v(" "),e("p",[t._v("binlog是追加日志,又称为归档日志，属于逻辑日志，")]),t._v(" "),e("p",[t._v("binlog是属于MySQL Server层面的，又称为归档日志，属于逻辑日志，是记录原始的sql语句，逻辑")]),t._v(" "),e("p",[t._v("不支持高并发，以读为主")]),t._v(" "),e("p",[t._v("共享锁，排它锁，意向锁")]),t._v(" "),e("h2",{attrs:{id:"mvvc机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mvvc机制"}},[t._v("#")]),t._v(" mvvc机制")]),t._v(" "),e("p",[t._v("MVCC (Multi-Version Concurrency Control) (注：与MVCC相对的，是基于锁的并发控制，Lock-Based Concurrency Control)是一种基于多版本的并发控制协议，只有在InnoDB引擎下存在。")]),t._v(" "),e("p",[t._v("MVCC是为了实现事务的隔离性，通过版本号，避免同一数据在不同事务间的竞争，你可以把它当成基于多版本号的一种乐观锁。")]),t._v(" "),e("p",[t._v("当然，这种乐观锁只在事务级别提交读和可重复读有效。MVCC最大的好处，相信也是耳熟能详：读不加锁，读写不冲突。在读多写少的OLTP应用中，读写不冲突是非常重要的，极大的增加了系统的并发性能。")]),t._v(" "),e("div",{staticClass:"custom-block info"},[e("p",{staticClass:"custom-block-title"},[t._v("OLTP")]),t._v(" "),e("p",[t._v("On-Line Transaction Processing联机事务处理过程(OLTP)，也称为面向交易的处理过程，其基本特征是前台接收的用户数据可以立即传送到计算中心进行处理，并在很短的时间内给出处理结果，是对用户操作快速响应的方式之一。")])])])}),[],!1,null,null,null);v.default=a.exports}}]);